import constants from "../constants/index.js";
import models from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const loginWithEmailAndPassword = async (credentials) => {
    if (!credentials.userName && !credentials.email) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "User name or Email is not provided!!!"
        );
    }

    const user = await models.User.findOne({
        $or: [{ email: credentials.email }, { userName: credentials.userName }],
        deleted: { $ne: true },
    });

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found!!!");
    }

    if (user.status === constants.UserStatus.Inactive) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "User is inactive!!!");
    }

    if (!user.isPasswordCorrect(credentials.password)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect!!!");
    }

    const token = user.generateAccessToken();

    return token;
};

const authService = { loginWithEmailAndPassword };

export default authService;
