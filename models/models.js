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
const fetchReviewId = (id) => {
  return db
    .query(
      `
    SELECT * FROM reviews WHERE review_id = $1
        `,
      [id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Doesn't Exist" });
      }

      return result.rows[0];
    });
};
const fetchComment = (id) => {
  return db
  .query(
    `
    SELECT * FROM comments WHERE  review_id=$1 ;
    `,[id]
  )
  .then((result)=>{
    return result.rows
  })
}

const addComment = (id, comment) => {
  const { username, body } = comment;
  return db
    .query(
      `INSERT INTO comments (
      author,
      body,
      review_id
    ) VALUES(
      $1, $2, $3
    )RETURNING *;`,
      [username, body, id]
    )
    .then((addedComment) => {
      return addedComment.rows[0];
    });
}





module.exports = { fetchCategories, fetchReviews, fetchReviewId,fetchComment, addComment };
