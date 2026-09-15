import express from "express";
import cors from "cors";
// import helmet from "helmet";

import routes from "./routes/index.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

// app.use(helmet());

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Product Authentication Backend is running",
  });
});

app.use("/v1", routes);

app.use(errorMiddleware);

export default app;
