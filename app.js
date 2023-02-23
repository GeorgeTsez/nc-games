const express = require("express");
const {
  getCategories,
  getReviews,
  getReviewId,
  getComments,
  CreateComment,
} = require("./controllers/controller");
const { handle500, handlePsql, handleHTTP } = require("./controllers/controllers.error");
const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewId);
app.get("/api/reviews/:review_id/comments",getComments)

app.post("/api/reviews/:review_id/comments",CreateComment)


app.use(handlePsql);
app.use(handleHTTP)


//default handler always last!
app.use(handle500);
module.exports = app;
