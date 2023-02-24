const express = require("express");
const categories = require("../db/data/test-data/categories");
const reviews = require("../db/data/development-data/reviews");
const {
  fetchCategories,
  fetchReviews,
  fetchReviewId,
  fetchComment,
  addComment,
  patchUpdate,
  fetchUsers,
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
const getComments = (request, response, next) => {
  const id = request.params.review_id;
  fetchComment(id)
    .then((comments) => {
      response.status(200);
      response.send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

const CreateComment = (request, response, next) => {
  const id = request.params.review_id;
  const comment = request.body;
  addComment(id, comment)
    .then((addedComment) => {
      response.status(201);
      response.send({ addedComments: addedComment });
    })
    .catch((err) => {
      next(err);
    });
};

const patchReview = (request, response, next) => {
  const review_id = request.params;
  const votes = request.body
  patchUpdate(review_id, votes)
    .then((review) => {
      response.status(200);
      response.send({ review: review });
    })
    .catch((err) => {
      next(err);
    });
};

const getUsers = (request, response, next) => {
  fetchUsers()
  .then((users) => {
      response.status(200);
      response.send({ users:users });
    })
    .catch((err) => {
      next(err);
    });
  }

module.exports = {
  getCategories,
  getReviews,
  getReviewId,
  getComments,
  CreateComment,
  patchReview,
  getUsers
};
