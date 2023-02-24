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
  test("200 status code: GET response with an array of categories", () => {
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
  test("200 status code: GET response with an array of reviews sorted by date in descending order", () => {
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
  test("200 status code: GET response with a review object", () => {
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
  test("400 status code : Get api/reviews/any Bad Request", () => {
    return request(app)
      .get("/api/reviews/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request!");
      });
  });
  test("404 status code : Get api/reviews/100000 This directory doesn't exist", () => {
    return request(app)
      .get("/api/reviews/10000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Doesn't Exist");
      });
  });
});
describe("GET /api/reviews/:review_id/comments", () => {
  test("200 status code GET GET /api/reviews/:review_id/comments, an array of comments of which each comment should have the following properties:", () => {
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
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              review_id: expect.any(Number),
            })
          );
        });
      });
  });
});
test("200 if the id has no comments and i receive an empty array ", () => {
  return request(app)
    .get("/api/reviews/14/comments")
    .expect(200)
    .then(({ body }) => {
      expect(body.comments).toBeInstanceOf(Array);
      expect(body.comments).toHaveLength(0);
    });
});
describe("400 - 404 handle", () => {
  test("400 - if we request the comments for a bad path /api/reviews/bannana/comments", () => {
    return request(app)
      .get("/api/reviews/banana/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request!");
      });
  });
  test("404- if we request the comments for a valid id not in the database /api/reviews/1000/comments", () => {
    return request(app)
      .get("/api/reviews/10000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Doesn't Exist");
      });
    })
});
describe("POST /api/reviews/:review_id/comments", () => {
  test("201 status code: Created something", () => {
    const input = {username:'mallionaire', body: "hello"}
    return request(app)
      .post("/api/reviews/1/comments")
      .send(input)
      .expect(201)
      .then(({ body }) => {

        expect(body.addedComments).toBeInstanceOf(Object);
        expect(body.addedComments).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            author:'mallionaire',
            body: "hello",
            votes: 0,
            review_id: 1,
            created_at: expect.any(String)
          })
        );
      });
  });
})
  test("Error-handling-400 ,/api/reviews/banana/comments , invalid id",()=>{
    return request(app)
    .post("/api/reviews/banana/comments")
    .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request!");
      });
  })
  test("Error-Handling-404- if we create the comments for an id that doesn't exist /api/reviews/1000/comments", () => {
    return request(app)
      .post("/api/reviews/10000/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Doesn't Exist");
      });
    })
    test("Error-Handling-400-if username doesn't exist-Foreign key violation ", () => {
      const input = {username:'banana', body: "hello"}
      return request(app)
        .post("/api/reviews/1/comments")
        .send(input)
        .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Foreign key violation");
      });
    })
    describe("PATCH /api/reviews/:review_id - ",()=>{
      test("PATCH /api/reviews/:review_id if we increase the reviews votes by the right amount",()=>{
        const input = {inc_votes: 5 }
        return request(app)
        .patch("/api/reviews/1")
        .send(input)
        .expect(200)
        .then(({body})=>{
          expect(body.review).toEqual(
            {
              review_id: 1,
              title: 'Agricola',
              designer: 'Uwe Rosenberg',
              owner: 'mallionaire',
              review_img_url:
                'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
              review_body: 'Farmyard fun!',
              category: 'euro game',
              created_at: expect.any(String),
              votes: 6
            }
          )
        })
      })
    })
      test("PATCH /api/reviews/:review_id if we decrease the reviews votes by any",()=>{
        const input = {inc_votes: -10 }
        return request(app)
        .patch("/api/reviews/1")
        .send(input)
        .expect(200)
        .then(({body})=>{
          expect(body.review).toEqual(
            {
              review_id: 1,
              title: 'Agricola',
              designer: 'Uwe Rosenberg',
              owner: 'mallionaire',
              review_img_url:
                'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
              review_body: 'Farmyard fun!',
              category: 'euro game',
              created_at: expect.any(String),
              votes: -9
            }
          )
        })
      })
      test("Error-handling-400 ,/api/reviews/:review_id , invalid id",()=>{
        return request(app)
        .patch("/api/reviews/banana")
        .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad Request!");
          });
      })
      test("Error-Handling-404- if we update votes for an id that doesn't exist /api/reviews/:review_id", () => {
        const input = {inc_votes: 5 }
        return request(app)
          .patch("/api/reviews/10000")
          .send(input)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Doesn't Exist");
          });
        })
        test("Error-Handling-400-if input is incorrect ", () => {
          const input = {inc_votes: "banana" }
          return request(app)
            .patch("/api/reviews/:review_id")
            .send(input)
            .expect(400)
          .then(({ body }) => {
            expect(body.msg).toEqual("Bad Request!");
          });
    })
