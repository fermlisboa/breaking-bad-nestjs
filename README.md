# **Table of Contents**

- [Getting Started](#getting-started)
  - [Start the application](#start-the-application)
  - [Available Scripts](#available-scripts)
- [Documentation with Swagger](#documentation-with-swagger)
- [Environment variables](#environment-variables)

# Getting Started

This project was build with devcontainer to make easy to run in any computer. You will need Remote - Containers by Microsoft vscode's extension.

## Start the application

In vscode click in the bottom left icon to open a remote window and select reopen in container.
After that you need to run `yarn install` and to start the application use `yarn start:dev`

## Available Scripts

In the project directory, you can run:

### `yarn install`

This command install all the dependencies of the project that you need to run the application.

### `yarn start:dev`

Runs the app in the development mode.\
Open [http://localhost:3333](http://localhost:3333) to see the port running.

The application will reload if you save edits.

### `yarn eslint:check`

This command runs the eslint throught all the project and show all errors and warnings.

### `yarn test`

This command runs the unit tests.

### `yarn test:e2e`

This command runs the end to end tests.

### `yarn test:cov`

This command runs tests coverage.

# Documentation with Swagger

To access the Swagger project documentation, with the application running you can use the [http://localhost:3333/docs](http://localhost:3333/docs)

# Environment variables

| Variables             |
| :-------------------: |
| API_PORT              |
| ENVIROEMNT            |
| BREAKING_BAD_API      |
| POSTGRES_HOST         |
| POSTGRES_PORT         |
| POSTGRES_USER         |
| POSTGRES_PASSWORD     |
| POSTGRES_DATABASE     |
| POSTGRES_SYNCHRONIZE  |
| POSTGRES_LOGGING      |
| RUN_MIGRATIONS        |
