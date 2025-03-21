import mongoose from "mongoose";
import plugins from "./plugins/index.js";
import reusableSchemas from "./reusableSchemas/index.js";
import constants from "../constants/index.js";
import getOrgConfig from "../utils/getOrgConfig.js";
import logger from "../config/logger.config.js";

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

const aboutMeSchema = {
    about: {
        type: String,
        required: false,
    },
    aboutJob: {
        type: String,
        required: false,
    },
    interestsAndHobbies: {
        type: String,
        required: false,
    },
};
const degreeSchema = {
    degree: {
        type: String,
        required: [true, "Degree is required"],
    },
    specialization: {
        type: String,
        required: [
            function () {
                return !this.branch;
            },
            "Specialization is required",
        ],
    },
    branch: {
        type: String,
        required: [
            function () {
                return !this.specialization;
            },
            "Branch is required ",
        ],
    },
    university: {
        type: String,
        required: [
            function () {
                return !this.college;
            },
            "University is required",
        ],
    },
    college: {
        type: String,
        required: [
            function () {
                return !this.university;
            },
            "College is required",
        ],
    },
    yearOfCompletion: {
        type: Number,
        required: [true, "Year of completion is required"],
    },
    yearOfJoining: {
        type: Number,
        required: [true, "Year of joining is required"],
    },
    grade: {
        type: String,
        required: [
            function () {
                return !this.percentage && !this.cgpa;
            },
            "Grade is required",
        ],
    },
    percentage: {
        type: Number,
        required: [
            function () {
                return !this.cgpa && !this.grade;
            },
            "Percentage is required",
        ],
    },
    cgpa: {
        type: Number,
        required: [
            function () {
                return !this.percentage && !this.grade;
            },
            "CGPA is required",
        ],
    },
    description: {
        type: String,
        required: false,
    },
};
const certificationSchema = {
    title: {
        type: String,
        required: [true, "Certification title is required"],
    },
    issuer: {
        type: String,
        required: [
            function () {
                return !this.platform;
            },
            "Issuer name is required if platform is not provided",
        ],
    },
    platform: {
        type: String,
        required: [
            function () {
                return !this.issuer;
            },
            "Platform is required if issuer is not provided",
        ],
    },
    yearOfCompletion: {
        type: Number,
        required: [true, "Year of completion is required"],
    },
    duration: {
        type: String,
        required: [true, "Duration is required"],
    },
    certificateId: {
        type: String,
        required: [
            function () {
                return !this.link;
            },
            "Certificate ID is required if link is not provided",
        ],
    },
    link: {
        type: String,
        required: [
            function () {
                return !this.certificateId;
            },
            "Link is required if certificate ID is not provided",
        ],
    },
    grade: {
        type: String,
        required: [
            function () {
                return !this.percentage && !this.score;
            },
            "Grade is required if percentage or score is not provided",
        ],
    },
    percentage: {
        type: Number,
        required: [
            function () {
                return !this.grade && !this.score;
            },
            "Percentage is required if grade or score is not provided",
        ],
    },
    score: {
        type: Number,
        required: [
            function () {
                return !this.percentage && !this.grade;
            },
            "Score is required if percentage or grade is not provided",
        ],
    },
    description: {
        type: String,
        required: false,
    },
};
const secondaryEducationSchema = {
    board: {
        type: String,
        required: [
            true,
            "Please provide the board name for secondary education.",
        ],
    },
    school: {
        type: String,
        required: [
            true,
            "Please specify the school name for secondary education.",
        ],
    },
    yearOfCompletion: {
        type: Number,
        required: [
            true,
            "Please enter the year of completion for secondary education.",
        ],
    },
    medium: {
        type: String,
        required: [
            true,
            "Please indicate the medium of instruction for secondary education.",
        ],
    },
    grade: {
        type: String,
        required: [
            function () {
                return !this.percentage && !this.cgpa;
            },
            "Please provide the grade if percentage or CGPA is not specified.",
        ],
    },
    percentage: {
        type: Number,
        required: [
            function () {
                return !this.grade && !this.cgpa;
            },
            "Please provide the percentage if grade or CGPA is not specified.",
        ],
    },
    cgpa: {
        type: Number,
        required: [
            function () {
                return !this.percentage && !this.grade;
            },
            "Please provide the CGPA if percentage or grade is not specified.",
        ],
    },
    rollNumber: {
        type: String,
        required: [
            function () {
                return !this.certificateLink;
            },
            "Please provide the roll number if a certificate link is not provided.",
        ],
    },
    certificateLink: {
        type: String,
        required: [
            function () {
                return !this.rollNumber;
            },
            "Please provide the certificate link if a roll number is not provided.",
        ],
    },
    description: {
        type: String,
        required: false,
    },
};
const higherSecondaryEducationSchema = {
    board: {
        type: String,
        required: [
            true,
            "Please provide the board name for higher secondary education.",
        ],
    },
    school: {
        type: String,
        required: [
            true,
            "Please specify the school name for higher secondary education.",
        ],
    },
    stream: {
        type: String,
        required: [
            true,
            "Please specify the stream for higher secondary education.",
        ],
    },
    yearOfCompletion: {
        type: Number,
        required: [
            true,
            "Please enter the year of completion for higher secondary education.",
        ],
    },
    medium: {
        type: String,
        required: [
            true,
            "Please indicate the medium of instruction for higher secondary education.",
        ],
    },
    grade: {
        type: String,
        required: [
            function () {
                return !this.percentage && !this.cgpa;
            },
            "Please provide the grade if percentage or CGPA is not specified.",
        ],
    },
    percentage: {
        type: Number,
        required: [
            function () {
                return !this.grade && !this.cgpa;
            },
            "Please provide the percentage if grade or CGPA is not specified.",
        ],
    },
    cgpa: {
        type: Number,
        required: [
            function () {
                return !this.percentage && !this.grade;
            },
            "Please provide the CGPA if percentage or grade is not specified.",
        ],
    },
    rollNumber: {
        type: String,
        required: [
            function () {
                return !this.certificateLink;
            },
            "Please provide the roll number if a certificate link is not provided.",
        ],
    },
    certificateLink: {
        type: String,
        required: [
            function () {
                return !this.rollNumber;
            },
            "Please provide the certificate link if a roll number is not provided.",
        ],
    },
    description: {
        type: String,
        required: false,
    },
};
const educationSchema = {
    degreesAndCertificates: {
        type: [degreeSchema],
        required: false,
    },
    certifications: {
        type: [certificationSchema],
        required: false,
    },
    secondaryEducation: {
        type: secondaryEducationSchema,
        required: false,
    },
    higherSecondaryEducation: {
        type: higherSecondaryEducationSchema,
        required: false,
    },
};

const primaryDetailsSchema = {
    fullName: {
        type: reusableSchemas.fullNameSchema,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    displayName: {
        type: String,
        required: false,
    },
    maritalStatus: {
        type: String,
        required: false,
    },
    bloodGroup: {
        type: String,
        required: false,
    },
    isPhysicallyDisabled: {
        type: Boolean,
        required: true,
        default: false,
    },
    disabiltyType: {
        type: String,
        required: [
            function () {
                return this.isPhysicallyDisabled;
            },
            "Disability type is required",
        ],
    },
    nationality: {
        type: String,
        required: false,
    },
};

const contactDetailsSchema = {
    workEmail: {
        type: String,
        required: [true, "Work email is required"],
    },
    personalEmail: {
        type: String,
        required: false,
    },
    mobileNumber: {
        type: reusableSchemas.contactNumberSchema,
        required: [true, "Mobile number is required"],
    },
    workNumber: {
        type: reusableSchemas.contactNumberSchema,
        required: false,
    },
    residenceNumber: {
        type: reusableSchemas.contactNumberSchema,
        required: false,
    },
    skype: {
        type: String,
        required: false,
    },
};

const relationsSchema = {
    relation: {
        type: String,
        required: [true, "Relation is required"],
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
    gender: {
        type: String,
        required: [true, "gender is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate(value) {
            if (!validator.isEmail(value, { allow_utf8_local_part: false })) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Email");
            }
        },
        trim: true,
    },
    mobileNumber: {
        type: reusableSchemas.contactNumberSchema,
        required: [true, "Mobile number is required"],
    },
    profession: {
        type: String,
        required: [true, "Profession is required"],
    },
    dateOfBirth: {
        type: Date,
        required: [true, "Date of birth is required"],
    },
};

const jobDetailsSchema = {
    jobTitlePrimary: {
        type: String,
        required: [true, "Job title is required"],
    },
    jobTitleSecondary: {
        type: String,
        required: false,
    },
    department: {
        type: String,
        required: [true, "Department is required"],
    },
    position: {
        type: String,
        required: [true, "Position is required"],
    },
    dateOfJoining: {
        type: Date,
        required: [true, "Date of joining is required"],
    },
    dateOfExit: {
        type: Date,
        required: false,
    },
    employeeId: {
        type: String,
        required: [true, "Employee ID is required"],
    },
    workerType: {
        type: String,
        required: false,
    },
    timeType: {
        type: String,
        required: false,
    },
    contractStatus: {
        type: String,
        required: false,
    },
    payBand: {
        type: String,
        required: false,
    },
    payGrade: {
        type: String,
        required: false,
    },
    isInProbation: {
        type: Boolean,
        required: true,
        default: false,
    },
    probationStartDate: {
        type: Date,
        required: [
            function () {
                return;
            },
            "Probation start date is required",
        ],
        default: function () {
            return this.jobDetails.isInProbation
                ? this.jobDetails.dateOfJoining
                : null;
        },
    },
    probationEndDate: {
        type: Date,
        required: [
            function () {
                return this.jobDetails.isInProbation;
            },
            "Probation end date is required",
        ],
    },
    probationPolicy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "probationPolicy",
        required: [
            function () {
                return this.jobDetails.isInProbation;
            },
            "Probation policy is reequired",
        ],
    },
    reportingManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Reporting manager is required"],
    },
};

const employeeProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        primaryDetails: {
            type: primaryDetailsSchema,
            required: true,
        },
        contactDetails: {
            type: contactDetailsSchema,
            required: false,
        },
        avatar: {
            type: reusableSchemas.avatarSchema,
            required: false,
        },
        education: {
            type: educationSchema,
            required: false,
        },
        aboutMe: {
            type: aboutMeSchema,
            required: false,
        },
        address: {
            type: {
                currentAddress: {
                    type: reusableSchemas.addressSchema,
                    required: [true, "Current address is required"],
                },
                permanentAddress: {
                    type: reusableSchemas.addressSchema,
                    required: [true, "Permanent address is required"],
                },
            },
            required: false,
        },
        relations: {
            type: [relationsSchema],
            required: false,
        },
        documents: {
            type: {
                addressProof: [documentSchema],
                identityProof: [documentSchema],
            },
        },
        jobDetails: {
            type: jobDetailsSchema,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

employeeProfileSchema.plugin(plugins.paginate);
employeeProfileSchema.plugin(plugins.privatePlugin);
employeeProfileSchema.plugin(plugins.softDelete);

employeeProfileSchema.pre("save", async function (next) {
    // Populate user with organisation details
    await this.populate("user", "organisation");

    // Helper function to create and throw ValidationError
    const throwValidationError = (field, value, message) => {
        const error = new ValidationError(this);
        error.errors[field] = new mongoose.Error.ValidatorError({
            message,
            path: field,
            value,
        });
        logger.logMessage("error", `Validation failed: ${message}`, {
            field,
            value,
        });
        return next(error);
    };

    // Check if user or organisation is missing
    if (!this.user || !this.user.organisation) {
        return throwValidationError(
            "user",
            this.user,
            "User or organisation not found"
        );
    }

    // Fetch organisation configuration
    const config = await getOrgConfig(this.user.organisation);
    if (!config) {
        logger.logMessage("error", "Failed to fetch organisation config", {
            organisation: this.user.organisation,
        });
        return next(new Error("Organisation configuration not available"));
    }

    // Define validation rules for job details
    const validations = [
        {
            field: "jobDetails.position",
            value: this.jobDetails.position,
            list: config.positions,
            message: `Invalid position: ${this.jobDetails.position}`,
        },
        {
            field: "jobDetails.department",
            value: this.jobDetails.department,
            list: config.departments,
            message: `Invalid department: ${this.jobDetails.department}`,
        },
        {
            field: "jobDetails.workerType",
            value: this.jobDetails.workerType,
            list: config.workerTypes,
            message: `Invalid worker type: ${this.jobDetails.workerType}`,
            optional: true, // WorkerType is optional
        },
    ];

    // Validate job details fields
    for (const { field, value, list, message, optional } of validations) {
        if ((!optional || value) && !list.includes(value)) {
            return throwValidationError(field, value, message);
        }
    }

    // Log successful validation (optional, can remove if not needed)
    logger.logMessage("info", "Employee profile validation passed", {
        employeeId: this.jobDetails.employeeId,
    });

    next();
});

const EmployeeProfile = mongoose.model(
    "EmployeeProfile",
    employeeProfileSchema
);

export default EmployeeProfile;
