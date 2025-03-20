import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import middlewares from "./middlewares/index.js";
import ApiResponse from "./utils/ApiResponse.js";
import ApiError from "./utils/ApiError.js";
import logger from "./config/logger.config.js";
import mainRouter from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const corsConfig = cors({
    origin: "*",
    credentials: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(
//     import.meta.url,
//     "\nfilename: ",
//     __filename,
//     "\ndirname: ",
//     __dirname,
//     "\njoined path: ",
//     path.join(__dirname, "../public")
// );

app.set("trust proxy", true);

// Use morgan to log requests with colors
app.use(logger.requestLogger);
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(middlewares.requestLoggerMiddleware);
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    if (req.body.demoError) {
        throw new ApiError(409, "error response demo");
    }
    const response = new ApiResponse(
        200,
        null,
        "this is the home route of employees-crud"
    );
    res.status(200).send(response);
});

app.use("/api", mainRouter);

app.use(middlewares.errorHandler);

export default app;
