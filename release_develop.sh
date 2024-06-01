#!/bin/bash
git switch develop
git pull
docker build -t meal-organizer-frontend:develop .
docker tag meal-organizer-frontend:develop
git switch master
docker-compose  -f /opt/meal-organizer-develop/docker-compose.yaml down
docker-compose  -f /opt/meal-organizer-develop/docker-compose.yaml up -d
