const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../index");
const db = require("../models");
const Task = db.Task;

chai.use(chaiHttp);
chai.should();

describe("Tasks API", () => {
    /**
     * Test the POST /api/v1/tasks route
     * */
    describe("POST /api/v1/tasks", () => {
        it("It should create a new task", (done) => {
            const task = {
                title: "Task 1",
                description: "Task 1 description",
            };
            chai.request(app)
                .post("/api/v1/tasks")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(true);
                    response.body.should.have
                        .property("msg")
                        .eq("Task created successfully");
                    done();
                });
        });
    });

    /**
     * Test the GET /api/v1/tasks route
     * */
    describe("GET /api/v1/tasks", () => {
        it("It should get all tasks", (done) => {
            chai.request(app)
                .get("/api/v1/tasks")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(true);
                    response.body.should.have.property("tasks");
                    response.body.tasks.should.be.a("array");
                    response.body.should.have
                        .property("msg")
                        .eq("Tasks fetched successfully");
                    done();
                });
        });
    });

    /**
     * Test the GET /api/v1/tasks/:id route
     * */

    describe("GET /api/v1/tasks/:id", () => {
        it("It should get a single task", (done) => {
            chai.request(app)
                .get("/api/v1/tasks/")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .end((err, response) => {
                    const taskId = response.body.tasks[0].id;
                    chai.request(app)
                        .get("/api/v1/tasks/" + taskId)
                        .set(
                            "Authorization",
                            "Bearer " + process.env.TEST_TOKEN
                        )
                        .end((err, response) => {
                            response.should.have.status(200);
                            response.body.should.be.a("object");
                            response.body.should.have
                                .property("success")
                                .eq(true);
                            response.body.should.have.property("task");
                            response.body.task.should.be.a("object");
                            response.body.should.have
                                .property("msg")
                                .eq("Task fetched successfully");
                            done();
                        });
                });
        });
    });

    /**
     * Test the PUT /api/v1/tasks/:id route
     * */

    describe("PUT /api/v1/tasks/:id", () => {
        it("It should update a task", (done) => {
            chai.request(app)
                .get("/api/v1/tasks/")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .end((err, response) => {
                    const taskId = response.body.tasks[0].id;
                    const task = {
                        title: "Task 1 updated",
                        description: "Task 1 description updated",
                    };
                    chai.request(app)
                        .patch("/api/v1/tasks/" + taskId)
                        .set(
                            "Authorization",
                            "Bearer " + process.env.TEST_TOKEN
                        )
                        .send(task)
                        .end((err, response) => {
                            response.should.have.status(200);
                            response.body.should.be.a("object");
                            response.body.should.have
                                .property("success")
                                .eq(true);
                            response.body.should.have.property("task");
                            response.body.task.should.be.a("object");
                            response.body.should.have
                                .property("msg")
                                .eq("Task updated successfully");
                            done();
                        });
                });
        });
    });

    /**
     * Test the DELETE /api/v1/tasks/:id route
     * */

    describe("DELETE /api/v1/tasks/:id", () => {
        it("It should delete a task", (done) => {
            chai.request(app)
                .get("/api/v1/tasks/")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .end((err, response) => {
                    const taskId = response.body.tasks[0].id;
                    chai.request(app)
                        .delete("/api/v1/tasks/" + taskId)
                        .set(
                            "Authorization",
                            "Bearer " + process.env.TEST_TOKEN
                        )
                        .end((err, response) => {
                            response.should.have.status(200);
                            response.body.should.be.a("object");
                            response.body.should.have
                                .property("success")
                                .eq(true);
                            response.body.should.have
                                .property("msg")
                                .eq("Task deleted successfully");
                            done();
                        });
                });
        });
    });

    // after all tests have run, clear database
    after(async () => {
        await Task.destroy({ where: {} });
    });
});
