import express from "express";
import controllers from "../controllers/index.js";
import validations from "../validations/index.js";
import validate from "../middlewares/validate.js";

const router = express.Router();

router.post(
    "/register",
    validate(validations.authValidations.register),
    controllers.authController.register
);

router.post(
    "/login",
    validate(validations.authValidations.login),
    controllers.authController.login
);
const authRouter = router;
export default authRouter;
