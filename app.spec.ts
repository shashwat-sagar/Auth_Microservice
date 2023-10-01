import app from "./src/app";
import { calculateDiscount } from "./src/utils";
import request from "supertest";

describe("App", () => {
    it("should calculate the discount", () => {
        const result = calculateDiscount(100, 15);
        expect(result).toBe(85);
    });

    it("should return 200 status code", async () => {
        const response = await request(app).get("/").send();
        expect(response.statusCode).toBe(200);
    });
    it("should test", () => {});
});
