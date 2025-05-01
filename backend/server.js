import express from "express";
import DatabaseConnection from "./db.js";
import userRoutes from "../backend/routes/user.js";

const app = express();

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

DatabaseConnection()

// middlewares
app.use(express.json());

// routes
app.use('/users', userRoutes);
