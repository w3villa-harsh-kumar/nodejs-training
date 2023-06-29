const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../index");
const db = require("../models");
const User = db.User;

chai.use(chaiHttp);
chai.should();

describe("+++++++++++ Users API Unit Testing ++++++++++++", () => {
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

        it("It should NOT register a new user without the email property", (done) => {
            const user = {
                name: "test",
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
                        .eq("Email is a required field");
                    done();
                });
        });

        it("It should NOT register a new user without the password property", (done) => {
            const user = {
                name: "test",
                email: "test@gmail.com",
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
                        .eq("Password is a required field");
                    done();
                });
        });

        it("It should NOT register a new user without the phoneNumber property", (done) => {
            const user = {
                name: "test",
                email: "test@gmail.com",
                password: "test1234",
            };
            chai.request(app)
                .post("/api/v1/users/register")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a("object");
                    response.body.should.have
                        .property("msg")
                        .eq("Phone Number is a required field");
                    done();
                });
        });

        it("It should NOT register a new user with an invalid email", (done) => {
            const user = {
                name: "test",
                email: "testgmail.com",
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
                        .eq("Email format is invalid");
                    done();
                });
        });

        it("It should NOT register a new user with an invalid phone number", (done) => {
            const user = {
                name: "test",
                email: "test@gmail.com",
                password: "test1234",
                phoneNumber: "123456789",
            };
            chai.request(app)
                .post("/api/v1/users/register")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a("object");
                    response.body.should.have
                        .property("msg")
                        .eq("Phone Number should have a minimum length of 10");
                    done();
                });
        });

        it("It should check if the user already exists", (done) => {
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
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have
                        .property("msg")
                        .eq("User already exists");
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

        it("It should NOT login a user without the email property", (done) => {
            const user = {
                password: "test1234",
            };
            chai.request(app)
                .post("/api/v1/users/login")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a("object");
                    response.body.should.have
                        .property("msg")
                        .eq("Email is a required field");
                    done();
                });
        });

        it("It should NOT login a user without the password property", (done) => {
            const user = {
                email: "test@gmail.com",
            };
            chai.request(app)
                .post("/api/v1/users/login")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a("object");
                    response.body.should.have
                        .property("msg")
                        .eq("Password is a required field");
                    done();
                });
        });

        it("It should NOT login a user with an invalid email", (done) => {
            const user = {
                email: "testgmail.com",
                password: "test1234",
            };
            chai.request(app)
                .post("/api/v1/users/login")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a("object");
                    response.body.should.have
                        .property("msg")
                        .eq("Email format is invalid");
                    done();
                });
        });

        it("It should NOT login a user with an invalid password", (done) => {
            const user = {
                email: "test@gmail.com",
                password: "testuser",
            };
            chai.request(app)
                .post("/api/v1/users/login")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have
                        .property("msg")
                        .eq("Invalid credentials");
                    done();
                });
        });

        it("It should NOT login a user that does not exist", (done) => {
            const user = {
                email: "my@gmail.com",
                password: "test1234",
            };
            chai.request(app)
                .post("/api/v1/users/login")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.be.a("object");
                    response.body.should.have
                        .property("msg")
                        .eq("Invalid credentials");
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
