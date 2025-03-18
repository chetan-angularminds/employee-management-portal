import mongoose from "mongoose";
import plugins from "./plugins/index.js";
import models from "./index.js";

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
        type: fullNameSchema,
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
        type: contactNumberSchema,
        required: [true, "Mobile number is required"],
    },
    workNumber: {
        type: contactNumberSchema,
        required: false,
    },
    residenceNumber: {
        type: contactNumberSchema,
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
        type: contactNumberSchema,
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
            type: avatarSchema,
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
                    type: addressSchema,
                    required: [true, "Current address is required"],
                },
                permanentAddress: {
                    type: addressSchema,
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
        reportingManager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        position: {
            type: String,
            required: [true, "Position is required"],
        },
        jobTitle: {
            type: String,
            required: [true, "Job title is required"],
        },
        department: {
            type: String,
            required: [true, "Department is required"],
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
    },
    {
        timestamps: true,
    }
);

employeeProfileSchema.plugin(plugins.paginate);
employeeProfileSchema.plugin(plugins.privatePlugin);
employeeProfileSchema.plugin(plugins.softDelete);

employeeProfileSchema.pre("save", async function (next) {
    await this.populate("user", "organisation");

    if (!this.user || !this.user.organisation) {
        return next(new Error("User or organisation not found"));
    }

    const OrganisationConfig = models.OrganisationConfig;
    const config = await OrganisationConfig.findOne({
        organisation: this.user.organisation,
    });
    if (!config) {
    }

    if (!config.positions.includes(this.position)) {
        return next(new Error(`Invalid position: ${this.position}`));
    }
    if (!config.departments.includes(this.department)) {
        return next(new Error(`Invalid department: ${this.department}`));
    }

    next();
});

const EmployeeProfile = mongoose.model(
    "EmployeeProfile",
    employeeProfileSchema
);

export default EmployeeProfile;
