FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# This image will be reused for all 4 services
# The entry point (CMD) will be overridden in docker-compose
