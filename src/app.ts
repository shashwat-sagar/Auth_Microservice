import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to Auth Services");
});

export default app;
