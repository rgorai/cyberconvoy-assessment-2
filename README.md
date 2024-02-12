# Employee Management App

Welcome to Ron Gorai's submission for CyberConvoy's technical assessment II.


## Prerequisites

- Once you have cloned this repository, open a terminal at the root of this project
- Have the latest stable version of [Node](https://nodejs.org/en/download/current) (>=21.6.1) installed. You can check this using the command: `node -v`
- Have the latest stable version of [Yarn Classic](https://classic.yarnpkg.com/lang/en/docs/install/) (>=1.22.19) installed. You can check this using the command: `yarn -v`
- Do not have anything running on port 3001 of your machine. On MacOS, you can check this by ensuring the output of this command is empty: `lsof -i :3001`


## Steps to Run

### 1. `yarn install`
Install the dependencies for both server and client applications.

### 2. Insert the supplied `.env` file at the root of the project
Fill out your MySQL server username and password. You can also supply your own `MYSQL_HOST` and `MYSQL_DATABASE_NAME` if you would like to replace the defaults of `127.0.0.1` and `cyberconvoy_assessment_2_ron_gorai`, respectively.

### 3. `yarn seed`
Seed the database with dummy data. Feel free to do this after the next step as well if you would like to see how the application behaves without any data.

### 4. `yarn start`
Build and run the production build of the application. Open http://localhost:3001 in a web browser to access it.


## Notes

- This is my first time implementing a MySQL database, Google OAuth and TailwindCSS, so I'm not very familiar with the best coding and security practices with these technologies, so I've attempted them as best I can based on research and my experience with similar technologies

- The app uses server-side session management so it briefly flashes UI for unauthenticated users on window refresh even when you are authenticated. Since this does not impede the functionality of the site but does personally irk me, I would implement client-side cookies into the auth system to remedy this given more time

- Some aspects of the application may seem somewhat over-engineered for the scale of this app - these are snippets from some of my other personal projects. I included these partially to expedite my development time for those aspects, but mainly to help convey my thought processes

- I left in the console statements for API calls so you can observe the state management system conserving them

- I am using React Context API to manage state in this app since it works, and does not require additional dependencies (my implementation could even be further optimized using useReducer), but at scale something like Redux would be better suited