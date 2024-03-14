@echo off

REM Change directory to the user's home directory
cd %USERPROFILE%

REM Clone the GitHub repository
git clone https://github.com/Bing-Chill-Inc/Algoforge.git Algoforge-app

REM Change directory to the cloned repository
cd Algoforge-app

REM Start the docker-compose.yml file
docker-compose up -d