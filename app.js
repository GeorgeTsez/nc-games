const express = require("express");
const {
  getCategories,
  getReviews,
  getReviewId,
  getComments,
  CreateComment,
  patchReview,
  getUsers
} = require("./controllers/controller");
const { handle500, handlePsql, handleHTTP } = require("./controllers/controllers.error");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewId);
app.get("/api/reviews/:review_id/comments",getComments)

app.post("/api/reviews/:review_id/comments",CreateComment)

app.patch("/api/reviews/:review_id",patchReview)

app.get("/api/users",getUsers)

app.use(handlePsql);
app.use(handleHTTP)



app.use(handle500);
module.exports = app;
