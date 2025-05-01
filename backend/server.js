import express from "express";
import DatabaseConnection from "./db.js";
import userRoutes from "../backend/routes/user.js";

// start server
const app = express();

// set port
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

// connect to database
DatabaseConnection()

// middlewares
app.use(express.json());

// routes
app.use('/users', userRoutes);
