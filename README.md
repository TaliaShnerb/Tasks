# Tasks

## Overview

This project is a web application for manage tasks, built with React for the frontend and Node.js for the backend. It includes unit tests using Jest and end-to-end (E2E) tests written in Selenium.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm)
- Docker 

### Running the Application

#### Run with Docker

``` bash
git clone https://github.com/TaliaShnerb/Tasks.git
docker-compose up --build
```
Note: when the docker compose is running, the results of unit tests is appear in the CMD
The frontend application should now be running at [http://localhost:3000](http://localhost:3000) and the backend server at [http://localhost:5000](http://localhost:5000).

#### Run without Docker

##### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/TaliaShnerb/Tasks.git
   cd your-repository
   ```

2. **Install dependencies for both frontend and backend:**

   - **Frontend (React):**

     ```bash
     cd client
     npm install
     ```

   - **Backend (Node.js):**

     ```bash
     cd ../server
     npm install
     ```

1. **Start the backend server:**

   ```bash
   cd server
   node server.js
   ```

2. **Start the frontend development server:**

   ```bash
   cd ../client
   npm start
   ```
  The frontend application should now be running at [http://localhost:3000](http://localhost:3000) and the backend server at [http://localhost:5000](http://localhost:5000).


3. **Unit Tests (Jest):**

   - **Frontend:**

     ```bash
     cd client
     npm test
     ```
   

4. **End-to-End Tests (Selenium):**

   Ensure you have a WebDriver installed (e.g., ChromeDriver for Chrome).

   To run the E2E tests:

   ```bash
   cd src
   cd Tests
   node e2eTest.js
   ```


### Folder Structure

- `client/` - React frontend codebase.
- `server/` - Node.js backend codebase.
- `client/src/Tests/` - Selenium end-to-end tests.




