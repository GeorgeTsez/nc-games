const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return connection.end();
});

// describe("GET /api/categories", () => {
//   it.only('responds with json object containing a "message" key', () => {
//     return request(app)
//       .get("/api/categories")
//       .expect(200)
//       .then((response) => {
//         expect(response.body.message).toBe("All good here");
//       });
//   });
// });
//focus here so you can make the logic later , check documentation 
describe("/api/categories", () => {
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
