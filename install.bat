@echo off

REM
cd %USERPROFILE%

REM
git clone https://github.com/Bing-Chill-Inc/Algoforge.git Algoforge-app

REM
cd Algoforge-app

REM
docker-compose up -d