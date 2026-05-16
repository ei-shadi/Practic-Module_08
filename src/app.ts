import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";

const app: Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

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
