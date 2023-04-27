require('express-async-errors');
const express = require('express');
const routes = require('./routes');
const database = require('./database/sqlite');
const errorHandling = require('./utils/error-handling');

const PORT = 5555;
const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandling);

database();

app.listen(
    PORT,
    () => console.log(`Server is running on PORT ${PORT}`)
);