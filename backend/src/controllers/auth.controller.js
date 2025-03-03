import services from "../services/index.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import httpStatus from "http-status";

const register = asyncHandler(async (req, res) => {
    const user = await services.userService.createUser(req.body);
    const authTokens = user.generateAccessToken();
    const response = new ApiResponse(
        httpStatus.CREATED,
        { user, authTokens },
        "user created successfully"
    );
    res.status(httpStatus.CREATED).json(response);
});

const login = asyncHandler(async (req, res) => {
    const token = await services.authService.loginWithEmailAndPassword(
        req.body
    );

    const response = new ApiResponse(
        httpStatus.OK,
        token,
        "Login Successfull!!!"
    );

    res.status(httpStatus.OK).json(response);
});

const authController = { register , login};

export default authController;
