from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, select
from sqlalchemy.future import select
from kafka import KafkaProducer
import json
import httpx

app = FastAPI()

DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/rental_service"
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

KAFKA_BOOTSTRAP_SERVERS = 'localhost:9092'
producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

class Rental(Base):
    __tablename__ = "rentals"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    car_id = Column(Integer, nullable=False)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@app.post("/rent/")
async def rent_car(user_id: int, car_id: int, db: AsyncSession = Depends(get_db)):
    # Check if the rental already exists
    existing_rental = await db.execute(select(Rental).filter(Rental.user_id == user_id, Rental.car_id == car_id))
    if existing_rental.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="User has already rented this car")

    # Check if the car is available (not rented)
    async with httpx.AsyncClient() as client:
        car_response = await client.get(f"http://localhost:8001/cars/{car_id}")
        if car_response.status_code != 200 or car_response.json().get("rented"):
            raise HTTPException(status_code=400, detail="Car is unavailable")

        user_response = await client.get(f"http://localhost:8002/users/{user_id}")
        if user_response.status_code != 200:
            raise HTTPException(status_code=404, detail="User not found")

    # Proceed with the rental if checks pass
    rental = Rental(user_id=user_id, car_id=car_id)
    db.add(rental)
    await db.commit()

    # Send event to Kafka
    producer.send('rental_events', {"event": "car_rented", "user_id": user_id, "car_id": car_id})

    return {"message": "Car rented successfully"}

@app.get("/rentals/")
async def list_rentals(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Rental))
    rentals = result.scalars().all()

    readable_rentals = []
    async with httpx.AsyncClient() as client:
        for rental in rentals:
            # Fetch user
            user_response = await client.get(f"http://localhost:8002/users/{rental.user_id}")
            if user_response.status_code == 200:
                user_data = user_response.json()
                user_name = f"{user_data['name']} {user_data['surname']}"
            else:
                user_name = f"User#{rental.user_id}"

            # Fetch car
            car_response = await client.get(f"http://localhost:8001/cars/{rental.car_id}")
            if car_response.status_code == 200:
                car_data = car_response.json()
                car_name = f"{car_data['make']} {car_data['model']}"
            else:
                car_name = f"Car#{rental.car_id}"

            readable_rentals.append({
                "rental_id": rental.id,
                "user": user_name,
                "car": car_name
            })

    return readable_rentals

