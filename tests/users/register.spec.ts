import app from "../../src/app";
import request from "supertest";
import { User } from "../../src/entity/User";
import { DataSource } from "typeorm";
import { AppDataSource } from "../../src/config/data-source";
import { Roles } from "../../src/contants";

describe("POST /auth/register", () => {
    let connection: DataSource;
    beforeAll(async () => {
        connection = await AppDataSource.initialize();
    });

    beforeEach(async () => {
        // database truncate
        await connection.dropDatabase();
        await connection.synchronize();
    });
    afterAll(async () => {
        await connection.destroy();
    });
    describe("Given all fields", () => {
        it("should return the 201 status code", async () => {
            // AAA
            // Arrange
            const userData = {
                firstName: "Shashwat",
                lastName: "Sagar",
                email: "shashwatsagar19@gmail.com",
                password: "secret",
            };
            // Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);
            // Assert (Expected output)
            expect(response.statusCode).toBe(201);
        });

        it("should return valid json response", async () => {
            // AAA
            // Arrange
            const userData = {
                firstName: "Shashwat",
                lastName: "Sagar",
                email: "shashwatsagar19@gmail.com",
                password: "secret",
            };
            // Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            // Assert
            // Assert application/json utf-8
            expect(
                (response.headers as Record<string, string>)["content-type"],
            ).toEqual(expect.stringContaining("json"));
        });

        it("should persist the user in the database", async () => {
            // Arrange
            const userData = {
                firstName: "Shashwat",
                lastName: "Sagar",
                email: "shashwatsagar19@gmail.com",
                password: "secret",
            };
            // Act
            await request(app).post("/auth/register").send(userData);

            // Assert
            // Assert
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users).toHaveLength(1);
            expect(users[0].firstName).toBe(userData.firstName);
            expect(users[0].lastName).toBe(userData.lastName);
            expect(users[0].email).toBe(userData.email);
        });

        it("shoud return th id of created user", async () => {
            // Arrange
            const userData = {
                firstName: "Shashwat",
                lastName: "Sagar",
                email: "shashwatsagar19@gmail.com",
                password: "secret",
            };
            // Act
            await request(app).post("/auth/register").send(userData);
            // Assert
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(users[0].id).toEqual(expect.any(Number));
        });

        it("should assign a customer role", async () => {
            // AAA
            // Arrange
            const userData = {
                firstName: "Shashwat",
                lastName: "Sagar",
                email: "shashwatsagar19@gmail.com",
                password: "secret",
            };
            // Act
            await request(app).post("/auth/register").send(userData);
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            // Assert
            expect(users[0]).toHaveProperty("role");
            expect(users[0].role).toBe(Roles.CUSTOMER);
        });
    });
    describe("Fields are missing", () => {});
});
