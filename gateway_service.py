from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CAR_SERVICE_URL = "http://localhost:8001"
USER_SERVICE_URL = "http://localhost:8002"
RENTAL_SERVICE_URL = "http://localhost:8003"

@app.get("/cars/")
def get_cars():
    response = requests.get(f"{CAR_SERVICE_URL}/cars/")
    return response.json()

@app.post("/cars/")
async def create_car(request: Request):
    body = await request.json()
    response = requests.post(f"{CAR_SERVICE_URL}/cars/", json=body)
    return response.json()

@app.get("/users/{user_id}")
def get_user(user_id: int):
    response = requests.get(f"{USER_SERVICE_URL}/users/{user_id}")
    return response.json()


@app.post("/users/")
async def create_user(request: Request):
    body = await request.json()
    response = requests.post(f"{USER_SERVICE_URL}/users/", json=body)
    return response.json()


@app.get("/users/")
def list_users():
    response = requests.get(f"{USER_SERVICE_URL}/users/")
    return response.json()

@app.get("/rentals/")
def get_rentals():
    response = requests.get(f"{RENTAL_SERVICE_URL}/rentals/")
    return response.json()


@app.post("/rent/")
def rent_car(user_id: int, car_id: int):
    response = requests.post(f"{RENTAL_SERVICE_URL}/rent/", params={"user_id": user_id, "car_id": car_id})
    return response.json()
