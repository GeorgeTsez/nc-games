const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
const { string } = require("pg-format");

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
        expect(body.categories).
        toBeInstanceOf(Array);
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
describe("GET./api/reviews",()=>{
  test("200 status code: GET response with an array of reviews sorted by date in descending order",()=>{
    return request(app)
    .get("/api/reviews")
    .expect(200)
    .then(({ body }) => {
      expect(body.reviews).toBeInstanceOf(Array);
      expect(body.reviews.length).toBeGreaterThan(0)
      body.reviews.forEach((review) => {
        expect(review).toEqual(
          expect.objectContaining({
            review_id:expect.any(Number),
            title:expect.any(String),
            designer:expect.any(String),
            owner:expect.any(String),
            review_img_url:expect.any(String),
            category:expect.any(String),
            created_at:expect.any(String),
            votes:expect.any(Number),
            comment_count:expect.any(Number)
            
          })
        );
      });
    });


  })
})
