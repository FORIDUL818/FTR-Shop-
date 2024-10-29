const express = require("express");
const { registration, login } = require("../Controller/UserController");

class ApiRouter {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    // Initialize routes
    initializeRoutes() {
        this.router.post("/registration", registration);
        this.router.post("/login", login);
    }

    // Get the router instance
    getRouter() {
        return this.router;
    }
}

// Export an instance of the router
const router = new ApiRouter();
module.exports = router.getRouter();
