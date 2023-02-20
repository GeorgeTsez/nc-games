const express = require("express");
const categories = require("../db/data/test-data/categories");
const { fetchCategories } = require("../models/models")
const getCategories = (request, response, next) => {
  fetchCategories().then((categories) => {
    console.log("response", categories);
    response.status(200);
    response.send({categories: categories});
  })
  .catch((err)=>{
    next(err)
  })
};


module.exports = { getCategories }