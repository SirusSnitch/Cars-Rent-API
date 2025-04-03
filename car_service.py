from fastapi import FastAPI
from kafka import KafkaProducer
import json

app = FastAPI()

# Kafka Config
KAFKA_BOOTSTRAP_SERVERS = 'localhost:9092'
producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS, 
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Fake Database
cars_db = {}

@app.get("/cars/")
def get_cars():
    return list(cars_db.values())

@app.post("/cars/")
def create_car(car_id: int, make: str, model: str, price: float, location: str):
    car = {"id": car_id, "make": make, "model": model, "price": price, "rented": False, "location": location}
    cars_db[car_id] = car
    producer.send('car_events', {"event": "car_added", "car": car})
    return {"message": "Car added successfully", "car": car}
