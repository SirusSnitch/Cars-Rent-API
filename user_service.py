from fastapi import FastAPI

app = FastAPI()

# Fake User Database
users_db = {1: {"id": 1, "name": "Alice"}, 2: {"id": 2, "name": "Bob"}}

@app.get("/users/{user_id}")
def get_user(user_id: int):
    return users_db.get(user_id, {"error": "User not found"})

@app.post("/users/")
def create_user(user_id: int, name: str):
    if user_id in users_db:
        return {"error": "User already exists"}
    users_db[user_id] = {"id": user_id, "name": name}
    return {"message": "User created", "user": users_db[user_id]}
