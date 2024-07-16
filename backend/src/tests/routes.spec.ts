// import creditsRoutes from "../routes/credits.routes";
import Server from "../server";
import request from "supertest";

let serverInstance: Server;

beforeAll(() => {
  serverInstance = new Server();
  serverInstance.start();
});

afterAll(() => {
  serverInstance.stop();
});

describe("GET api/credits", () => {
  test("Should respond with a 200 status code", async () => {
    const response = await request(serverInstance.app)
      .get("/api/credits")
      .send();
    expect(response.status).toBe(200);
  });

  test("Should respond with an array", async () => {
    const response = await request(serverInstance.app)
      .get("/api/credits")
      .send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /api/credits", () => {
  describe("Given a title and description", () => {
    const newCredit = {
      name: "Prueba Thunder",
      amount: 18000,
      term: 32,
      interest_rate: 5,
      monthly_income: 300,
      user_id: 2,
    };
    test("Should respond with a 200 status code", async () => {
      const response = await request(serverInstance.app)
        .post("/api/credits")
        .send(newCredit);
      expect(response.status).toBe(200);
    });

    test("Should have a content-type: Application/json in header", async () => {
      const response = await request(serverInstance.app)
        .post("/api/credits")
        .send(newCredit);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("Should respond with a Task ID", async () => {
      const response = await request(serverInstance.app)
        .post("/api/credits")
        .send(newCredit);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("When name and description is amount", () => {
    test("Should respond with a 400 status code", async () => {
      const fields = [{}, { name: "" }, { amount: "" }];
      for (const body of fields) {
        const response = await request(serverInstance.app)
          .post("/api/credits")
          .send(body);
        expect(response.status).toBe(400);
      }
    });
  });
});
