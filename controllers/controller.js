const express = require("express");
const categories = require("../db/data/test-data/categories");
const reviews = require("../db/data/development-data/reviews");
const {
  fetchCategories,
  fetchReviews,
  fetchReviewId,
} = require("../models/models");

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
const getReviews = (request, response, next) => {
  fetchReviews()
    .then((reviews) => {
      response.status(200);
      response.send({ reviews: reviews });
    })
    .catch((err) => {
      next(err);
    });
};
const getReviewId = (request, response, next) => {
  const id = request.params.review_id;
  fetchReviewId(id)
    .then((idObj) => {
      response.status(200);
      response.send({ review: idObj });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getCategories, getReviews, getReviewId };
