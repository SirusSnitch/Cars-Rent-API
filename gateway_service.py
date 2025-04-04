from fastapi import FastAPI
import requests

app = FastAPI()

CAR_SERVICE_URL = "http://localhost:8001"
USER_SERVICE_URL = "http://localhost:8002"
RENTAL_SERVICE_URL = "http://localhost:8003"

@app.get("/cars/")
def get_cars():
    response = requests.get(f"{CAR_SERVICE_URL}/cars/")
    return response.json()

@app.get("/users/{user_id}")
def get_user(user_id: int):
    response = requests.get(f"{USER_SERVICE_URL}/users/{user_id}")
    return response.json()

@app.post("/rent/")
def rent_car(user_id: int, car_id: int):
    response = requests.post(f"{RENTAL_SERVICE_URL}/rent/", params={"user_id": user_id, "car_id": car_id})
    return response.json()
