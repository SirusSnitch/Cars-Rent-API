from fastapi import FastAPI
import httpx

app = FastAPI()

CAR_SERVICE_URL = "http://localhost:8001"
USER_SERVICE_URL = "http://localhost:8002"
RENT_SERVICE_URL = "http://localhost:8003"

@app.get("/api/cars/")
async def get_cars():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{CAR_SERVICE_URL}/cars/")
        return response.json()

@app.get("/api/users/{user_id}")
async def get_user(user_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{USER_SERVICE_URL}/users/{user_id}")
        return response.json()

@app.post("/api/rent/")
async def rent_car(user_id: int, car_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{RENT_SERVICE_URL}/rent/", json={"user_id": user_id, "car_id": car_id})
        return response.json()
