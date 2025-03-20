import mongoose from "mongoose";
import validator from "validator";
import ApiError from "../utils/ApiError.js";
import plugins from "./plugins/index.js";
import middlewares from "../middlewares/index.js";
import httpStatus from "http-status";
import reusableSchemas from "./reusableSchemas/index.js";

const logoSchema = new mongoose.Schema({
    publicId: { type: String, required: [true, "publicId is required"] },
    url: { type: String, required: [true, "URL is required"] },
});



const organisationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        dba: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            index: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new ApiError(
                        httpStatus.BAD_REQUEST,
                        "Invalid Email"
                    );
                }
            },
        },
        phone: {
            type: reusableSchemas.contactNumberSchema,
            required: true,
        },
        fax: { type: String },
        billingInformation: {
            name: { type: String },
            email: { type: String },
            phone: { type: String },
        },
        address: {
            physical: {
                street: { type: String },
                addressLine2: { type: String },
                city: { type: String },
                state: { type: String },
                zip: { type: String },
            },
            mailing: {
                street: { type: String },
                addressLine2: { type: String },
                city: { type: String },
                state: { type: String },
                zip: { type: String },
            },
        },
        logo: {
            type: logoSchema,
            required: false,
        },
        timezone: { type: String },
        locale: { type: String },
        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        updatedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

organisationSchema.plugin(plugins.paginate);
organisationSchema.plugin(plugins.privatePlugin);
organisationSchema.plugin(plugins.softDelete);

/**
 * Check if email is taken
 * @param {string} email - The org's email
 * @param {ObjectId} [excludeOrgId] - The id of the org to be excluded
 * @returns {Promise<boolean>}
 */
organisationSchema.statics.isEmailTaken = async function (email, excludeOrgId) {
    const org = await this.findOne({
        email,
        _id: {
            $ne: excludeOrgId,
        },
    });
    return !!org;
};

organisationSchema.pre("save", middlewares.dbLogger("Organisation"));

const Organisation = mongoose.model("Organisation", organisationSchema);

export default Organisation;
