const express = require("express");
const categories = require("../db/data/test-data/categories");
const reviews = require("../db/data/development-data/reviews")
const { fetchCategories, fetchReviews } = require("../models/models");

// there are my methods
const getCategories = (request, response, next) => {
  fetchCategories()
    .then((categories) => {
      response.status(200);
      response.send({ categories: categories });
    })
    .catch((err) => {
      next(err);
    });
};



module.exports = { getCategories };
