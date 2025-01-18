# Hacker News Scrapper Service

## Table of Contents

- [Hacker News Scrapper Service](#hacker-news-scrapper-service)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Initializing the Service](#initializing-the-service)
    - [Step 1: Clone the repository](#step-1-clone-the-repository)
    - [Step 2: Install dependencies](#step-2-install-dependencies)
    - [Step 3: : Create a new file named .env in the root directory](#step-3--create-a-new-file-named-env-in-the-root-directory)
    - [Step 4: Update the db.js file with your MySQL connection details](#step-4-update-the-dbjs-file-with-your-mysql-connection-details)
      - [Connecting to the Database](#connecting-to-the-database)
      - [Step 1: Create a new MySQL database](#step-1-create-a-new-mysql-database)
      - [Step 2: Create a new user](#step-2-create-a-new-user)
      - [Grant privileges](#grant-privileges)
      - [Initializing a New Database](#initializing-a-new-database)
      - [Running the Service](#running-the-service)
          - [Step 1: Start the service](#step-1-start-the-service)
        - [Step 2: Open a WebSocket client](#step-2-open-a-websocket-client)
          - [Step 3: Send a message to the service](#step-3-send-a-message-to-the-service)
    - [Troubleshooting](#troubleshooting)

## Introduction

This is a Hacker News scrapper service that periodically scrapes stories from Hacker News and stores them in a MySQL database. The service also provides a WebSocket API for real-time updates.

## Prerequisites

* Node.js (version 14 or higher)
* MySQL (version 8 or higher)
* ws library (version 7 or higher)
* axios library (version 0.21 or higher)
* cheerio library (version 0.22 or higher)

## Initializing the Service

### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/hackernews-scrapper.git 
 ```

### Step 2: Install dependencies

```bash
npm install
 ```

### Step 3: : Create a new file named .env in the root directory

Add the following environment variables:

* DB_HOST: the hostname or IP address of your MySQL server
* DB_USER: the username to use for the MySQL connection
* DB_PASSWORD: the password to use for the MySQL connection
* DB_NAME: the name of the database to use

###  Step 4: Update the db.js file with your MySQL connection details

#### Connecting to the Database

#### Step 1: Create a new MySQL database

Create a new MySQL database with the name specified in the DB_NAME environment variable.

#### Step 2: Create a new user
Create a new user with the username and password specified in the DB_USER and DB_PASSWORD environment variables.

#### Grant privileges

Grant the user all privileges on the database:

```bash
  GRANT ALL PRIVILEGES ON your_database_name.* TO 'your_username'@'%'

```

#### Initializing a New Database

Run the following command to create the database tables:

```bash
node db/init.js
```

#### Running the Service

###### Step 1: Start the service

```bash
node index.js
```
##### Step 2: Open a WebSocket client

Open a WebSocket client (such as wscat) and connect to ws://localhost:8080.

###### Step 3: Send a message to the service

Send a message to the service to retrieve the latest stories:

```bash
{"type": "getStories"}
```

### Troubleshooting

* Troubleshooting
* Verify that the MySQL connection details are correct
* Verify that the database tables have been created correctly