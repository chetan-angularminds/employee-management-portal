
import services from "../services/index.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import httpStatus from "http-status";

const register = asyncHandler(async (req, res) => {
    const user = await services.userService.createUser(req.body);
    user.save();
    const response = new ApiResponse(
        httpStatus.CREATED,
        { user, token: user.registrationToken },
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
// Change password callback function
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Old password is incorrect");
    }

    user.password = newPassword;
    await user.save();

    const response = new ApiResponse(
        200,
        null,
        "Password changed successfully"
    );
    res.status(200).json(response);
});
const verifyUser = asyncHandler(async (req, res) => {
    const response = new ApiResponse(200, null, "user is verified");
    res.status(200).json(response);
});

const isAdmin = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(401, "user is not admin");
    }

    const response = new ApiResponse(200, null, "user is admin");
    res.status(200).json(response);
});
const authController = { register, login, changePassword, isAdmin, verifyUser };

export default authController;
