const express = require("express");
const app = express();
const mainRouter = require("./routers/main-router");
const connectDb = require("./utils/db-connect");
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);

app.use("/api", mainRouter);

app.get("/", (req, res) => {
  res.status(201).send("I am from index.js file");
});

const PORT = process.env.PORT;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`I am listening from PORT: ${PORT}`);
  });
});
