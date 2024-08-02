# Carly Backnd with Nest.js

![Webstorm](https://img.shields.io/badge/WebStorm-000000?style=for-the-badge&logo=WebStorm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Nest.js](	https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Sqlite](https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)


![Carly Thumbnail](./readme/Thumbnail.png)

## Introduction
Carly is a project that I've designed for my mentees to gain more professional and real-world experience in frontend development. This project is the backend of Carly that can be cloned and run easily on a local system, so the mentees can test all the features of their frontend project. 

## Installation

### Option 1 - NPM
If you're new to backend development and not familiar with Docker, this is the best option. So clone the project and just run the installation command as follows:

```bash
npm install

# Run in Development Mode
npm run start:dev

# Run in Production Mode
npm run start:prod
```

### Option 2 - Docker
If you're familiar with Docker and have some experience already, this is the best option. Docker makes projects more organized and easier to maintain. So after installing Docker on your system, clone the project and enter following commands:

```bash
# Run in Development Mode
docker-compose -f docker-compose.dev.yml up --build

# Run in Development Mode
docker-compose up --build
```