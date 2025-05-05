from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import Column, Integer, String, Boolean, select
from sqlalchemy.future import select
from pydantic import BaseModel

app = FastAPI()

DATABASE_URL = "postgresql+asyncpg://postgres:postgres@db_car:5432/car_service"
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
Base = declarative_base()

class Car(Base):
    __tablename__ = "cars"
    id = Column(Integer, primary_key=True, index=True)
    make = Column(String, nullable=False)
    model = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    rented = Column(Boolean, default=False)
    location = Column(String, nullable=False)

# Pydantic schema for input
class CarCreate(BaseModel):
    make: str
    model: str
    price: int
    location: str

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

@app.get("/cars/")
async def get_cars(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Car))
    return result.scalars().all()

@app.get("/cars/{car_id}")
async def get_car(car_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Car).filter(Car.id == car_id))
    car = result.scalar_one_or_none()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return car

@app.post("/cars/")
async def create_car(car: CarCreate, db: AsyncSession = Depends(get_db)):
    new_car = Car(**car.dict())
    db.add(new_car)
    await db.commit()
    await db.refresh(new_car)
    return new_car
