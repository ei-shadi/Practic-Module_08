import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import CookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());
app.use(
  cors({
    origin: "http://localhost:5000",
  }),
);
// Global Error Handler
app.use(globalErrorHandler);

app.use(logger);
// CORS Configuration
// const allowedOrigins = {
//   origin: "http://localhost:5000"
// }

// app.use(cors(allowedOrigins));

// Server Activation MSG
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server",
    author: "Next Level",
  });
});


// User Routes
app.use("/api/users", userRoute);
// Profile Routes
app.use("/api/profile", profileRoute);
// Auth Routes
app.use("/api/auth", authRoute);


export default app;
