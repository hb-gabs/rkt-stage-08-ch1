require('dotenv/config');
require('express-async-errors');
const express = require('express');
const routes = require('./routes');
const database = require('./database/sqlite');
const errorHandling = require('./utils/error-handling');
const uploadConfigs = require("./configs/upload");
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(errorHandling);
app.use("/files", express.static(uploadConfigs.UPLOADS_FOLDER))

database();

app.listen(
    process.env.PORT || 5000,
    () => console.log(`Server is running on PORT ${process.env.PORT}`)
);