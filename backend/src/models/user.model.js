import mongoose from "mongoose";
import validator from "validator";
import plugins from "./plugins/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import constants from "../constants/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/env.config.js";
import middlewares from "../middlewares/index.js";
import moment from "moment";

const fullNameSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        index: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        index: true,
        trim: true,
    },
});

const avatarSchema = new mongoose.Schema({
    publicId: { type: String, required: [true, "publicId is required"] },
    url: { type: String, required: [true, "URL is required"] },
});

const contactNumberSchema = new mongoose.Schema({
    countryCode: { type: String },
    number: {
        type: String,
        required: true,
        index: true,
        validate(value) {
            if (!validator.isNumeric(value)) {
                throw new ApiError(
                    httpStatus.BAD_REQUEST,
                    "Invalid Contact Number"
                );
            }
        },
    },
});

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: fullNameSchema,
            required: [true, "fullName is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required field"],
            index: true,
            trim: true,
            validate(value) {
                if (
                    !validator.isEmail(value, { allow_utf8_local_part: false })
                ) {
                    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Email");
                }
            },
        },
        userName: {
            type: String,
            required: false,
            index: true,
            trim: true,
            match: [
                /^[a-zA-Z0-9_-]+$/,
                "Only alphabets, numbers, -, _ are allowed in user name",
            ],
        },
        contactNumber: {
            type: contactNumberSchema,
            required: true,
        },
        organisation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation",
            index: true,
            trim: true,
            required: false,
        },
        password: {
            type: String,
            required: false,
            trim: true,
            minlength: 8,
            private: true,
        },
        role: {
            type: String,
            enum: Object.values(constants.UserRoles),
            default: constants.UserRoles.USER,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: avatarSchema,
            required: false,
        },
        status: {
            type: String,
            enum: Object.values(constants.UserStatus),
            default: constants.UserStatus.Active,
        },
        mfaEnabled: {
            type: Boolean,
            default: false,
        },
        registrationToken: { type: String },
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(plugins.softDelete);
userSchema.plugin(plugins.paginate);
userSchema.plugin(plugins.privatePlugin);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({
        email,
        _id: { $ne: excludeUserId },
        deleted: { $ne: true },
    });

    return !!user;
};

/**
 * Check if userName is taken
 * @param {string} userName - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isUserNameTaken = async function (userName, excludeUserId) {
    console.log(userName);

    const user = await this.findOne({
        userName,
        _id: { $ne: excludeUserId },
        deleted: { $ne: true },
    });
    console.log(user);

    return !!user;
};

/**
 * Check if Password is correct
 * @param {string} password - The user's email
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

/**
 * Generate Access token
 * @returns {string} - the generated access token
 */
userSchema.methods.generateAccessToken = function () {
    const expiryTime = moment().add(config.jwt.expiry, "seconds").toISOString();
    const token = jwt.sign(
        {
            id: this._id,
            userName: this.userName,
            email: this.email,
            fullName: this.fullName,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expiry }
    );
    return { token, expiryTime };
};

// userSchema.methods.generateRegistrationToken =

userSchema.pre("save", function (next) {
    if (!this.isNew) {
        next();
    }
    const token = jwt.sign(
        {
            id: this._id,
            userName: this.userName,
            email: this.email,
            fullName: this.fullName,
        },
        config.jwt.secret
    );
    this.registrationToken = token;
    next();
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.pre("save", middlewares.dbLogger("User"));
const User = mongoose.model("User", userSchema);
export default User;
