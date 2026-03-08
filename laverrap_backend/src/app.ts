import express from "express";
import { corsMiddleware } from "./middlewares/cors.middleware.js";
import { config } from "./config.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { authRoutes } from "./routes/auth.routes.js";
import { employeeRoutes } from "./routes/employee.routes.js";
import { serviceRoutes } from "./routes/service.routes.js";
import { clientRoutes } from "./routes/client.routes.js";

const app = express();
app.use(express.json());
app.disable("x-powered-by");
app.use(corsMiddleware());
app.use(`${config.API_BASE_URL}/auth`, authRoutes);
app.use(authMiddleware);
app.use(`${config.API_BASE_URL}/employees`, employeeRoutes);
app.use(`${config.API_BASE_URL}/services`, serviceRoutes);
app.use(`${config.API_BASE_URL}/clients`, clientRoutes);
app.get("/", (req, res) => {
  console.log("User request", req.user);
  res.send("Hello World");
});
app.use(errorMiddleware);
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});