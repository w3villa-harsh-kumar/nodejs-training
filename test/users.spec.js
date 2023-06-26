const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../index");
const db = require("../models");
const User = db.User;

chai.use(chaiHttp);
chai.should();

describe("Users API", () => {
    /**
     * Test the POST /api/v1/users/register route
     */
    describe("POST /api/v1/users/register", () => {
        it("It should register a new user", (done) => {
            const user = {
                name: "test",
                email: "test@gmail.com",
                password: "test1234",
                phoneNumber: "1234567890",
            };
            chai.request(app)
                .post("/api/v1/users/register")
                .send(user)
                .end((err, response) => {
                    // console.log("response=",response);
                    response.should.have.status(201);
                    response.body.should.be.a("object");
                    response.body.should.have
                        .property("msg")
                        .eq("User created successfully");
                    response.body.should.have.property("token");
                    done();
                });
        });

        it("It should NOT register a new user without the name property", (done) => {
            const user = {
                email: "test@gmail.com",
                password: "test1234",
                phoneNumber: "1234567890",
            };
            chai.request(app)
                .post("/api/v1/users/register")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a("object");
                    response.body.should.have
                        .property("msg")
                        .eq("Name is a required field");
                    done();
                });
        });
    });

    /**
     * Test the POST /api/v1/users/login route
     */

    describe("POST /api/v1/users/login", () => {
        it("It should login a user", (done) => {
            const user = {
                email: "test@gmail.com",
                password: "test1234",
            };
            chai.request(app)
                .post("/api/v1/users/login")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have
                        .property("msg")
                        .eq("User logged in successfully");
                    response.body.should.have.property("token");
                    done();
                });
        });
    });

    // delete all users after testing
    after(async () => {
        await User.destroy({
            where: {},
        });
    });
});
