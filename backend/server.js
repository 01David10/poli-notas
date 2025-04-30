import express from "express";
// import routes from "./backend/routes.js";

const app = express();

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

// middlewares
app.use(express.json());
// app.use("/", routes);