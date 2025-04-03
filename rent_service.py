from fastapi import FastAPI, Query
from kafka import KafkaProducer
import json

app = FastAPI()

# Kafka Config
KAFKA_BOOTSTRAP_SERVERS = 'localhost:9092'
producer = KafkaProducer(
    bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS, 
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Fake Rentals Database
rentals_db = {}

@app.post("/rent/")
def rent_car(
    user_id: int = Query(..., description="User ID"), 
    car_id: int = Query(..., description="Car ID")
):
    if car_id in rentals_db:
        return {"error": "Car already rented"}
    
    rentals_db[car_id] = user_id
    producer.send('rental_events', {"event": "car_rented", "user_id": user_id, "car_id": car_id})
    return {"message": "Car rented successfully"}

@app.get("/rentals/")
def get_rentals():
    return rentals_db
