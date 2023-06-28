const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../index");
const db = require("../models");
const Task = db.Task;

chai.use(chaiHttp);
chai.should();

describe("+++++++++ Tasks API Unit Testing +++++++++++", () => {
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
                    done(err);
                });
        });

        it("It should NOT create a new task without title", (done) => {
            const task = {
                description: "Task 1 description",
            };
            chai.request(app)
                .post("/api/v1/tasks")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(false);
                    response.body.should.have
                        .property("msg")
                        .eq("Title is a required field");
                    done();
                });
        });

        it("It should NOT create a new task without description", (done) => {
            const task = {
                title: "Task 1",
            };
            chai.request(app)
                .post("/api/v1/tasks")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(false);
                    response.body.should.have
                        .property("msg")
                        .eq("Description is a required field");
                    done();
                });
        });

        it("It should NOT create a new task with empty title", (done) => {
            const task = {
                title: "",
                description: "Task 1 description",
            };
            chai.request(app)
                .post("/api/v1/tasks")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(false);
                    response.body.should.have
                        .property("msg")
                        .eq("Title cannot be an empty field");
                    done();
                });
        });

        it("It should NOT create a new task with empty description", (done) => {
            const task = {
                title: "Task 1",
                description: "",
            };
            chai.request(app)
                .post("/api/v1/tasks")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(422);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(false);
                    response.body.should.have
                        .property("msg")
                        .eq("Description cannot be an empty field");
                    done();
                });
        });

        it("It should not create a new task without authorization", (done) => {
            const task = {
                title: "Task 1",
                description: "Task 1 description",
            };
            chai.request(app)
                .post("/api/v1/tasks")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(false);
                    response.body.should.have
                        .property("msg")
                        .eq("Authentication invalid");
                    done();
                });
        });

        it("It should not create a new task with invalid authorization", (done) => {
            const task = {
                title: "Task 1",
                description: "Task 1 description",
            };
            chai.request(app)
                .post("/api/v1/tasks")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN + "1")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(false);
                    response.body.should.have
                        .property("msg")
                        .eq("Authentication invalid");
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

        it("It should NOT get all tasks without authorization", (done) => {
            chai.request(app)
                .get("/api/v1/tasks")
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(false);
                    response.body.should.have
                        .property("msg")
                        .eq("Authentication invalid");
                    done();
                });
        });

        it("It should NOT get all tasks with invalid authorization", (done) => {
            chai.request(app)
                .get("/api/v1/tasks")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN + "1")
                .end((err, response) => {
                    response.should.have.status(401);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(false);
                    response.body.should.have
                        .property("msg")
                        .eq("Authentication invalid");
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

        it("It should NOT get a single task without authorization", (done) => {
            chai.request(app)
                .get("/api/v1/tasks/")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .end((err, response) => {
                    const taskId = response.body.tasks[0].id;
                    chai.request(app)
                        .get("/api/v1/tasks/" + taskId)
                        .end((err, response) => {
                            response.should.have.status(401);
                            response.body.should.be.a("object");
                            response.body.should.have
                                .property("success")
                                .eq(false);
                            response.body.should.have
                                .property("msg")
                                .eq("Authentication invalid");
                            done();
                        });
                });
        });

        it("It should NOT get a single task with invalid authorization", (done) => {
            chai.request(app)
                .get("/api/v1/tasks/")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .end((err, response) => {
                    const taskId = response.body.tasks[0].id;
                    chai.request(app)
                        .get("/api/v1/tasks/" + taskId)
                        .set(
                            "Authorization",
                            "Bearer " + process.env.TEST_TOKEN + "1"
                        )
                        .end((err, response) => {
                            response.should.have.status(401);
                            response.body.should.be.a("object");
                            response.body.should.have
                                .property("success")
                                .eq(false);
                            response.body.should.have
                                .property("msg")
                                .eq("Authentication invalid");
                            done();
                        });
                });
        });

        it("It should NOT get a single task with invalid id", (done) => {
            chai.request(app)
                .get("/api/v1/tasks/1")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(false);
                    response.body.should.have
                        .property("msg")
                        .eq("Task not found");
                    done();
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

        it("It should NOT update a task without authorization", (done) => {
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
                        .send(task)
                        .end((err, response) => {
                            response.should.have.status(401);
                            response.body.should.be.a("object");
                            response.body.should.have
                                .property("success")
                                .eq(false);
                            response.body.should.have
                                .property("msg")
                                .eq("Authentication invalid");
                            done();
                        });
                });
        });

        it("It should NOT update a task with invalid authorization", (done) => {
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
                            "Bearer " + process.env.TEST_TOKEN + "1"
                        )
                        .send(task)
                        .end((err, response) => {
                            response.should.have.status(401);
                            response.body.should.be.a("object");
                            response.body.should.have
                                .property("success")
                                .eq(false);
                            response.body.should.have
                                .property("msg")
                                .eq("Authentication invalid");
                            done();
                        });
                });
        });

        it("It should NOT update a task with wrong task id", (done) => {
            const task = {
                title: "Task 1 updated",
                description: "Task 1 description updated",
                status: "completed",
            };
            chai.request(app)
                .patch("/api/v1/tasks/" + 123)
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .send(task)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(false);
                    response.body.should.have
                        .property("msg")
                        .eq("Task not found");
                    done();
                });
        });
    });

    /**
     * Test the DELETE /api/v1/tasks/:id route
     * */

    describe("DELETE /api/v1/tasks/:id", () => {

        it("It should NOT delete a task without authorization", (done) => {
            chai.request(app)
                .get("/api/v1/tasks/")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .end((err, response) => {
                    const taskId = response.body.tasks[0].id;
                    chai.request(app)
                        .delete("/api/v1/tasks/" + taskId)
                        .end((err, response) => {
                            response.should.have.status(401);
                            response.body.should.be.a("object");
                            response.body.should.have
                                .property("success")
                                .eq(false);
                            response.body.should.have
                                .property("msg")
                                .eq("Authentication invalid");
                            done();
                        });
                });
        });

        it("It should NOT delete a task with invalid authorization", (done) => {
            chai.request(app)
                .get("/api/v1/tasks/")
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .end((err, response) => {
                    const taskId = response.body.tasks[0].id;
                    chai.request(app)
                        .delete("/api/v1/tasks/" + taskId)
                        .set(
                            "Authorization",
                            "Bearer " + process.env.TEST_TOKEN + "1"
                        )
                        .end((err, response) => {
                            response.should.have.status(401);
                            response.body.should.be.a("object");
                            response.body.should.have
                                .property("success")
                                .eq(false);
                            response.body.should.have
                                .property("msg")
                                .eq("Authentication invalid");
                            done();
                        });
                });
        });

        it("It should NOT delete a task with wrong task id", (done) => {
            chai.request(app)
                .delete("/api/v1/tasks/" + 123)
                .set("Authorization", "Bearer " + process.env.TEST_TOKEN)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.should.be.a("object");
                    response.body.should.have.property("success").eq(false);
                    response.body.should.have
                        .property("msg")
                        .eq("Task not found");
                    done();
                });
        });

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
