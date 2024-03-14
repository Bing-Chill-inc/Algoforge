#!/bin/bash

# Go to the home directory
cd ~

# Clone the repository
git clone https://github.com/example/repo.git Algoforge-app

# Go into the repository directory
cd Algoforge-app

# Start the docker-compose.yml file
docker-compose up -d