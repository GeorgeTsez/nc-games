const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const { string } = require("pg-format");
const { createTestScheduler } = require("jest");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});
describe("GET./api/categories", () => {
  test.skip("200 status code: GET response with an array of categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories).toBeInstanceOf(Array);
        body.categories.forEach((category) => {
          expect(category).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});
describe("GET./api/reviews", () => {
  test.skip("200 status code: GET response with an array of reviews sorted by date in descending order", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toBeInstanceOf(Array);
        expect(body.reviews.length).toBeGreaterThan(0);
        body.reviews.forEach((review) => {
          expect(review).toEqual(
            expect.objectContaining({
              review_id: expect.any(Number),
              title: expect.any(String),
              designer: expect.any(String),
              owner: expect.any(String),
              review_img_url: expect.any(String),
              category: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
});
describe("GET./api/reviews/:review_id", () => {
  test.skip("200 status code: GET response with a review object", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toBeInstanceOf(Object);
        expect(body.review).toEqual({
          review_id: 3,
          title: "Ultimate Werewolf",
          category: "social deduction",
          designer: "Akihisa Okui",
          owner: "bainesface",
          review_body: "We couldn't find the werewolf!",
          review_img_url:
            "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?w=700&h=700",
          created_at: "2021-01-18T10:01:41.251Z",
          votes: 5,
        });
      });
  });
  test.skip("400 status code : Get api/reviews/any Bad Request", () => {
    return request(app)
      .get("/api/reviews/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request!");
      });
  });
  test.skip("404 status code : Get api/reviews/100000 This directory doesn't exist", () => {
    return request(app)
      .get("/api/reviews/10000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Doesn't Exist");
      });
  });
});
describe("GET /api/reviews/:review_id/comments",()=>{
  test.skip("200 status code GET GET /api/reviews/:review_id/comments, an array of comments of which each comment should have the following properties:",()=>{
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);
        expect(body.comments.length).toBeGreaterThan(0);
        body.comments.forEach((comment) => {
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at:expect.any(String),
              author:expect.any(String),
              body:expect.any(String),
              review_id:expect.any(Number),
            })
          );
        });
      });
  })
})
  test("200 if the id has no comments and i receive an empty array ",()=>{
    return request(app)
    .get("/api/reviews/14/comments")
    .expect(200)
    .then(({ body }) => {
      expect(body.comments).toBeInstanceOf(Array);
      expect(body.comments).toHaveLength(0);
    })
})