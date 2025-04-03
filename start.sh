#!/bin/bash

gnome-terminal -- uvicorn car_service:app --port 8001 --reload   &

gnome-terminal -- uvicorn user_service:app --port 8002 --reload &

gnome-terminal -- uvicorn rent_service:app --port 8003 --reload &

gnome-terminal -- uvicorn gateway_service:app --port 8000 --reload &