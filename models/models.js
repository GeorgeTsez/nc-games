const db = require("../db/connection");
const reviews = require("../db/data/development-data/reviews");

const fetchCategories = () => {
  return db
    .query(
      `
      SELECT * FROM categories;
      `
    )
    .then((result) => {
      return result.rows;
    });
};

const fetchReviews = () => {
  return db
    .query(
      `
      SELECT reviews.review_id,
      reviews.title,
      reviews.designer,
      reviews.owner,
      reviews.review_img_url,
      reviews.category,
      reviews.created_at,
      reviews.votes,
     CAST(COUNT (comments.comment_id)AS INT) AS comment_count FROM reviews
      LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id
      `
    )
    .then((result) => {
      return result.rows;
    });
};
const fetchReviewId = () => {
  return db.query(
    `
    SELECT reviews.review_id,
    reviews.comment_id,
    reviews.author,
    reviews.body,
    reviews.created_at,
    reviews.votes FROM reviews
        `
  )
  .then((result) => {
    console.log(result.rows)
    return result.rows;
  });
};

module.exports = { fetchCategories, fetchReviews, fetchReviewId };
