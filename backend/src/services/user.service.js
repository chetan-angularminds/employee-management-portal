import models from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
/**
 * Create a new user.
 *
 * @param {Object} userBody - The user data.
 * @param {string} userBody.email - The email of the user.
 * @param {string} userBody.userName - The username of the user.
 * @returns {Promise<Object>} The created user.
 * @throws {ApiError} If the email or username is already taken.
 */
const createUser = async (userBody) => {
    if (await models.User.isEmailTaken(userBody.email)) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `email ${userBody.email} is already taken!!`
        );
    }

    if (await models.User.isUserNameTaken(userBody.userName)) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `user name ${userBody.userName} is already taken!!`
        );
    }

    return models.User.create(userBody);
};

const userService = { createUser };
export default userService;
