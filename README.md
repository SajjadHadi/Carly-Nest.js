# Carly Backnd with Nest.js


<img src="https://img.shields.io/badge/WebStorm-000000?style=for-the-badge&logo=WebStorm&logoColor=white" alt="Webstorm Badge">
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge" >
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge">
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM Badge">
<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" alt="NPM Badge">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
<img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="Nest.js Badge">
<img src="https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="Sqlite Badge">
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Sqlite Badge">

![Carly Thumbnail](./readme/Thumbnail.png)

## Introduction
Carly is a project I designed for my mentees to gain more professional, real-world experience in front-end development. This project is Carly's backend, easily cloned and run on a local system, allowing mentees to test all their frontend project features. It uses SQLite, as it's beginner-friendly and easy to set up. Why Docker? Simple: I love it! PostgreSQL would be an option, but I wanted beginners to focus on the frontend without database setup complexities. Docker is just mentioned here, not fully utilized. In future projects, I'll use PostgreSQL instead of SQLite. (SQLite's lack of enum support still surprises me! 😆)
## Installation

### Option 1 - NPM
If you're new to backend development and not familiar with Docker, this is an excellent option. Clone the project and run the following installation command:

```bash
npm install

# Run in Development Mode
npm run start:dev

# Run in Production Mode
npm run start:prod
npm start
```

### Option 2 - Yarn
Personally, I've encountered some issues using NPM over the past couple of years, so I prefer Yarn. The commands are as follows:

```bash
yarn install

# Run in Development Mode
yarn run start:dev

# Run in Production Mode
yarn run start:prod
yarn start
```
### Option 3 - Docker
If you're familiar with Docker and have some experience, this is the best option. Docker enhances project organization and maintainability. After installing Docker on your system, clone the project and run the following commands:
```bash
# Run in Development Mode
docker-compose -f docker-compose.dev.yml up --build

# Run in Development Mode
docker-compose up --build
```