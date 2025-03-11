import constants from "../constants/index.js";
import models from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import services from "./index.js";

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
const registerUser = async (userDetails) => {
    const user = await services.userService.createUser(userDetails);
    user.save();
    return user
};

const registerOrganisation = async (orgDetails, user) => {
    const organisation = await services.organisationService.createOrgnisation(
        orgDetails,
        user
    );
    user.organisation = organisation._id;
    await user.save();
    return organisation;
};

const changeUserPassword = async (oldPassword, newPassword,userId)=>{
    const user = await models.User.findById(userId);
    
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
        if (!isPasswordCorrect) {
            throw new ApiError(401, "Old password is incorrect");
        }
    
        user.password = newPassword;
        await user.save();
}

const authService = {
    loginWithEmailAndPassword,
    registerOrganisation,
    registerUser,
    changeUserPassword
};

export default authService;
