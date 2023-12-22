# MongoDB Express React NodeJS (MERN) Reference Implementation

This is an example implementation of a blog post app review application using the Express, Node.JS, React and MongoDB (MERN) stack.

The following technologies are used:

- MongoDB Atlas for the database
- Express and Node.JS for the backend API
- React for the client
- Typescript for static typing to JavaScript
- JsonWebToken for authentication

## Prerequisites

The following are required:

- A dataset has been created in the mongodb atlas account
- Node.JS (tested with v18.18.2)

The backend and frontend are setup with npm and npx

### Backend

Create with `npm`

```
$ mkdir backend
$ cd backend
$ npm init -y
```

The following modules can then be installed

```
$ npm install express cors mongodb dotenv
$ npm install -g nodemon
```

Configure the `.env` file with the MongoDB Atlas connection URL. This should point to the example `crowdlinkerDB` database that is available to install when a cluster is setup.

The URL can be obtained within the MongoDB Atlas UI. Select the cluster > Connect > Connect your application.

```
MONGODB_URL=mongodb+srv://davidguleryuz:dvdglryz@cluster0.uz0rehg.mongodb.net/crowdlinkerDB?retryWrites=true&w=majority
PORT=3001

```

### Frontend

Create with `npx` and install the necessary frameworks.

```
$ npx create-react-app frontend
$ npm install typescript
$ npm install react-router-dom
$ npm install axios
$ npm install @reduxjs/toolkit react-redux
$ npm install @tailwindcss/forms
$ npm install react-toastify
```

## Running this Implementation

### Start the NodeJS and Express Backend

Run

```
$ npm start
```

Nodemon will listen for file changes and automatically update the application without needing to restart. The server starts on port 3000.

### Start the React Frontend

Run

```
$ npm start
```

File changes will be picked automatically without the need to restart. The application starts on port 3000.

Visit <a>http://localhost:3000</a>.
