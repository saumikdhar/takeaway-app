# Exotic Shaad Takeaway App Backend

This repository contains code for the backend part of the application. The backend is written in
JavaScript using Nodejs.

## Building the Project

### Prerequisites

First, you'll need to install the dependency management tool:

- [`npm`](https://docs.npmjs.com/)

### Building and Running

In the project directory, run `npm install` to install the necessary packages and then `npm run start:dev`
to run the application. Running this command on your computer will run the application on port 8080
which is the port the frontend application will be listening for.

> Note: Running `npm run build` is not necessary.

### Testing

> Note: You will need to have the .env file in the application source.

For the Node.js backend tests, make sure you have already run `npm install` and then `npm run test` in
the project directory.

To view test coverage use the command `npm run test-with-coverage`