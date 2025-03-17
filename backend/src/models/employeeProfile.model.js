import mongoose from "mongoose";
import plugins from "./plugins/index.js";

const fullNameSchema = {
    firstName: {
        type: String,
        required: [true, "First name is required"],
        index: true,
        trim: true,
    },
    middleName: {
        type: String,
        required: false,
        index: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        index: true,
        trim: true,
    },
};

const avatarSchema = {
    publicId: { type: String, required: [true, "publicId is required"] },
    url: { type: String, required: [true, "URL is required"] },
};

const contactNumberSchema = {
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
};

const addressSchema = {
    street: {
        type: String,
        required: [true, "Street address is required"],
        trim: true,
    },
    addressLine2: {
        type: String,
        required: false,
        trim: true,
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
    },
    state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
    },
    postalCode: {
        type: String,
        required: [true, "Postal code is required"],
        trim: true,
    },
    country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
    },
};

const documentSchema = {
    documentName: {
        type: String,
        required: [true, "Document name is required"],
        trim: true,
    },
    file: {
        publicId: {
            type: String,
            required: [true, "Public ID is required"],
        },
        url: {
            type: String,
            required: [true, "File URL is required"],
        },
    },
};

const employeeProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    fullName: {
        type: fullNameSchema,
        required: true,
    },
    contactNumber: {
        type: contactNumberSchema,
        required: false,
    },
    avatar: {
        type: avatarSchema,
        required: false,
    },
    currentAddress: {
        type: addressSchema,
        required: false,
    },
    permanentAddress: {
        type: addressSchema,
        required: false,
    },
    documents: [documentSchema],
    reportingManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    position: {
        type: String,
        required: [true, "Position is required"],
    },
    department: {
        type: String,
        required: [true, "Department is required"],
    },
    dateOfJoining: {
        type: Date,
        required: [true, "Date of joining is required"],
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    dateOfExit: {
        type: Date,
        required: false,
    },
    employeeId: {
        type: String,
        required: [true, "Employee ID is required"],
    },
});

employeeProfileSchema.plugin(plugins.paginate);
employeeProfileSchema.plugin(plugins.privatePlugin);
employeeProfileSchema.plugin(plugins.softDelete);

const EmployeeProfile = mongoose.model(
    "EmployeeProfile",
    employeeProfileSchema
);

export default EmployeeProfile;
