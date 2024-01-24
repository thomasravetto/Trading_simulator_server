# Express_Server_Template
An Express Server to use as a reusable template when creating a new application.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Overview

This project is a template of an Express Server. The purpose of it is to have a ready-to-use server when creating a new application. The server has the basic configuration and can/should be improved and built upon to add new features, packages and security.

In the main repository, the `app` directory should contain the components of the server, for example each route of the API.
Each component should be divided in three more files:
- *api*: The api file contains the middleware for the component api, and handles HTTP/HTTPS requests for each function of the component.
- *controller*: The controller file defines the functions called inside the `api.js` file. This file has the purpose of destructuring the HTTP requests and calling the helper functions (in the `helpers` foler) to make a certain action.
- *data-access*: The data-access file defines the functions that will talk to the database. The connection should be opened in a dedicated file inside the `helpers` folder.

The `helpers` folder should contain the helper function of each component of the app. Inside this folder we should open the connection with the database.

The `certs` folder should contain the SSL certificates, if someone uses HTTPS instead of HTTP.

The `public` folder should contain the static files of the app, for example the React build.

Then there are the two main files that build the server:
- `app.js`: Contains the instance of the express application and the configuration of the middleware.
- `server.js`: Defines the HTTP/HTTPS server and starts it.

## Project Structure

- **app**
  - **component**
    - `component.api.js`: Handles routing for the specific component.
    - `component.controller.js`: Calls functions associated with routes, handles request/response logic.
    - `component.data-access.js`: Defines functions for database operations.
  - `api.js`: Middleware for the API, aggregates all component APIs.

- **certs**: (for SSL certificates, assuming you might use HTTPS)

- **helpers**
  - **component**
    - `component.helper.js`: Contains the logic for component functions.
  - `db-connection.js`: Manages the database connection.

- **public**: (static files for the frontend)

- `app.js`: Express application instance with middleware setup.
- `server.js`: Creates an HTTP/HTTPS server and starts it.

## Getting Started

The following command forks the repository in your own machine, downloads all the dependencies and starts the server.

```
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install
npm start
```

## Usage

This server should be used as a template to build larger application, it contains basic security and logging functions. Additional packages and functions should be added based on the user preference.