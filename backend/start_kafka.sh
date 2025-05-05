#!/bin/bash

#start zookeeper server
gnome-terminal -- bash -c "cd ~/kafka_2.13-3.9.0/ && ./bin/zookeeper-server-start.sh config/zookeeper.properties" &

sleep 3

#start kafka server
gnome-terminal -- bash -c "cd ~/kafka_2.13-3.9.0/ && ./bin/kafka-server-start.sh config/server.properties" &


sleep 5

#topics
gnome-terminal -- bash -c "cd ~/kafka_2.13-3.9.0/ && ./bin/kafka-topics.sh --create --topic car_events --bootstrap-server localhost:9092" &

gnome-terminal -- bash -c "cd ~/kafka_2.13-3.9.0/ && ./bin/kafka-topics.sh --create --topic rental_events --bootstrap-server localhost:9092" &


