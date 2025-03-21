import mongoose from "mongoose";
import plugins from "./plugins/index.js";
import logger from "../config/logger.config.js";
import constants from "../constants/index.js";

// Define sub-schemas for policy details based on type
const probationDetailsSchema = new mongoose.Schema({
    duration: {
        type: Number,
        required: [true, "Duration in days is required"],
        min: [1, "Duration must be at least 1 day"],
    },
    reviewIntervals: {
        type: [Number],
        required: [true, "Review intervals are required"],
        validate: {
            validator: (v) => v.every((interval) => interval > 0),
            message: "All review intervals must be positive numbers",
        },
    },
    criteria: {
        type: [String],
        required: [true, "Evaluation criteria are required"],
        trim: true,
    },
    extensionAllowed: {
        type: Boolean,
        required: true,
        default: false,
    },
    maxExtensionDays: {
        type: Number,
        required: [
            function () {
                return this.extensionAllowed;
            },
            "Max extension days is required if extensions are allowed",
        ],
        min: [1, "Max extension days must be at least 1 day"],
    },
    requiresManagerApproval: {
        type: Boolean,
        required: true,
        default: true,
    },
});

const leaveDetailsSchema = new mongoose.Schema({
    maxDaysPerYear: {
        type: Number,
        required: [true, "Maximum days per year is required"],
        min: [1, "Max days must be at least 1"],
    },
    carryForwardAllowed: {
        type: Boolean,
        required: true,
        default: false,
    },
    maxCarryForwardDays: {
        type: Number,
        required: [
            function () {
                return this.carryForwardAllowed;
            },
            "Max carry forward days is required if carry forward is allowed",
        ],
    },
    requiresApproval: {
        type: Boolean,
        required: true,
        default: true,
    },
});

const organisationPolicySchema = new mongoose.Schema(
    {
        organisation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation",
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: [true, "Policy name is required"],
            trim: true,
            index: true,
        },
        type: {
            type: String,
            required: [true, "Policy type is required"],
            trim: true,
            lowercase: true,
            index: true,
        },
        details: {
            type: mongoose.Schema.Types.Mixed,
            required: [true, "Policy details are required"],
            validate: {
                validator: function (v) {
                    switch (this.type) {
                        case constants.OrganisationConstants.POLICY_TYPES_SUGGESTIONS.PROBATION:
                            return probationDetailsSchema.validateSync(v) !== undefined;
                        case constants.OrganisationConstants.POLICY_TYPES_SUGGESTIONS.LEAVE:
                            return leaveDetailsSchema.validateSync(v) !== undefined;
                        // Add more cases for other predefined types as needed
                        default:
                            // For custom types, just ensure it's an object with some content
                            return typeof v === "object" && v !== null && Object.keys(v).length > 0;
                    }
                },
                message: "Invalid details structure for policy type '{VALUE}'",
            },
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true,
        },
        applicableTo: {
            type: {
                departments: [{ type: String, trim: true }],
                positions: [{ type: String, trim: true }],
                workerTypes: [{ type: String, trim: true }],
                roles: [{ type: String, trim: true }],
            },
            required: false,
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
            required: false,
            default: {},
            description: "Additional metadata for custom policies",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Add plugins
organisationPolicySchema.plugin(plugins.paginate);
organisationPolicySchema.plugin(plugins.softDelete);

// Pre-save validation and logging
organisationPolicySchema.pre("save", async function (next) {
    // Ensure unique name within organisation
    const existing = await this.constructor.findOne({
        organisation: this.organisation,
        name: this.name,
        _id: { $ne: this._id },
    });
    if (existing) {
        const error = new mongoose.Error.ValidationError(this);
        error.errors["name"] = new mongoose.Error.ValidatorError({
            message: `Policy name '${this.name}' already exists for this organisation`,
            path: "name",
            value: this.name,
        });
        return next(error);
    }

    // Normalize type to lowercase
    this.type = this.type.toLowerCase();

    logger.logMessage("info", `${this.isNew ? "Creating" : "Updating"} organisation policy`, {
        organisation: this.organisation,
        name: this.name,
        type: this.type,
        updatedBy: this.updatedBy,
    });
    next();
});

// Static method to seed default policies
organisationPolicySchema.statics.seedDefaultPolicies = async function (organisationId, userId) {
    const existingPolicies = await this.countDocuments({
        organisation: organisationId,
        type: constants.OrganisationConstants.POLICY_TYPES_SUGGESTIONS.PROBATION,
    });
    if (existingPolicies === 0) {
        const defaultPolicies = constants.OrganisationConstants.DEFAULT_PROBATION_POLICIES.map((policy) => ({
            organisation: organisationId,
            name: policy.name,
            type: policy.type,
            details: policy.details,
            description: policy.description,
            isActive: policy.isActive,
            createdBy: userId,
            updatedBy: userId,
        }));
        await this.insertMany(defaultPolicies);
        logger.logMessage("info", "Seeded default probation policies", { organisation: organisationId });
    }
};

// Static method to get active policies by type
organisationPolicySchema.statics.getActivePoliciesByType = async function (organisationId, type) {
    return this.find({ organisation: organisationId, type: type.toLowerCase(), isActive: true }).lean();
};

// Static method to get all policy types for an organisation
organisationPolicySchema.statics.getPolicyTypes = async function (organisationId) {
    const types = await this.distinct("type", { organisation: organisationId });
    return [...new Set([...Object.values(constants.OrganisationConstants.POLICY_TYPES_SUGGESTIONS), ...types])];
};

const OrganisationPolicy = mongoose.model("OrganisationPolicy", organisationPolicySchema);
export default OrganisationPolicy;