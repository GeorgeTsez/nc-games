const express = require("express");
const { getCategories } = require("./controllers/controller");
const { handle500 } = require("./controllers/controllers.error");
const app = express();

app.get("/api/categories", getCategories);

app.use(handle500);



module.exports = app;