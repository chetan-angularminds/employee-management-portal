import mongoose from "mongoose";
import plugins from "./plugins/index.js";
import getOrgConfig from "../utils/getOrgConfig.js";
import logger from "../config/logger.config.js";
import constants from "../constants/index.js";

const leaveEntitlementSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID is required to assign leave entitlement"],
            index: true,
        },
        organisation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation",
            required: [
                true,
                "Organisation ID is required for leave entitlement",
            ],
            index: true,
        },
        leavePolicy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrganisationPolicy",
            required: [
                true,
                "Leave policy ID is required to define entitlement rules",
            ],
        },
        leaveType: {
            type: String,
            required: [
                true,
                "Leave type is required to specify the entitlement",
            ],
            trim: true,
        },
        maxDaysPerYear: {
            type: Number,
            required: [
                true,
                "Maximum days per year is required for entitlement",
            ],
            min: [0, "Maximum days cannot be negative"],
        },
        remainingDays: {
            type: Number,
            required: [true, "Remaining days is required for tracking"],
            min: [0, "Remaining days cannot be negative"],
            default: function () {
                return this.maxDaysPerYear;
            },
        },
        carryForwardAllowed: {
            type: Boolean,
            required: [true, "Specify if carry forward is allowed"],
            default: false,
        },
        maxCarryForwardDays: {
            type: Number,
            required: [
                function () {
                    return this.carryForwardAllowed;
                },
                "Maximum carry forward days is required when carry forward is allowed",
            ],
            min: [0, "Maximum carry forward days cannot be negative"],
        },
        carryForwardDays: {
            type: Number,
            required: [
                function () {
                    return this.carryForwardAllowed;
                },
                "Carry forward days is required when carry forward is allowed",
            ],
            default: 0,
            min: [0, "Carry forward days cannot be negative"],
        },
        year: {
            type: Number,
            required: [true, "Year is required to track entitlement period"],
            default: function () {
                return new Date().getFullYear();
            },
            validate: {
                validator: (v) => v >= 2000 && v <= 2100,
                message: "Year must be between 2000 and 2100",
            },
        },
        resetDate: {
            type: Date,
            required: [true, "Reset date is required for entitlement renewal"],
            default: function () {
                return new Date(this.year, 11, 31); // Default to Dec 31 of the year
            },
        },
        status: {
            type: String,
            enum: ["ACTIVE", "EXPIRED", "PENDING"],
            default: "ACTIVE",
            required: [
                true,
                "Status is required to track entitlement lifecycle",
            ],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Creator ID is required for audit purposes"],
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Updater ID is required for audit purposes"],
        },
    },
    {
        timestamps: true,
    }
);

// Plugins
leaveEntitlementSchema.plugin(plugins.paginate);
leaveEntitlementSchema.plugin(plugins.softDelete);
leaveEntitlementSchema.plugin(plugins.privatePlugin);

// Pre-save Validation
leaveEntitlementSchema.pre("save", async function (next) {
    await this.populate("user", "organisation");
    await this.populate("leavePolicy");

    const throwValidationError = (field, value, message) => {
        const error = new mongoose.Error.ValidationError(this);
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

    // Validate user and organisation
    if (!this.user || !this.user.organisation || !this.organisation) {
        return throwValidationError(
            "user",
            this.user,
            "User or organisation not found"
        );
    }

    // Fetch organisation config
    const config = await getOrgConfig(this.organisation);
    if (!config || !config.leave) {
        logger.logMessage("error", "Failed to fetch organisation config", {
            organisation: this.organisation,
        });
        return next(new Error("Organisation configuration is not available"));
    }

    // Validate leaveType against config
    if (!config.leave.leaveTypes.includes(this.leaveType)) {
        return throwValidationError(
            "leaveType",
            this.leaveType,
            `Invalid leave type: '${this.leaveType}' is not allowed`
        );
    }

    // Validate leavePolicy
    if (!this.leavePolicy) {
        return throwValidationError(
            "leavePolicy",
            this.leavePolicy,
            "Leave policy is required"
        );
    }

    const validPolicy = config.probation?.allowedPolicies?.find(
        (policy) =>
            policy._id.toString() === this.leavePolicy.toString() &&
            policy.type ===
                constants.OrganisationConstants.POLICY_TYPES_SUGGESTIONS.LEAVE
    );
    if (!validPolicy) {
        return throwValidationError(
            "leavePolicy",
            this.leavePolicy,
            `Invalid leave policy ID: '${this.leavePolicy}' is not valid for leave`
        );
    }

    // Sync maxDaysPerYear with policy if applicable
    if (
        this.isNew &&
        validPolicy.details.maxDaysPerYear &&
        this.maxDaysPerYear !== validPolicy.details.maxDaysPerYear
    ) {
        return throwValidationError(
            "maxDaysPerYear",
            this.maxDaysPerYear,
            `Max days must match policy: ${validPolicy.details.maxDaysPerYear}`
        );
    }

    // Carry forward validation
    if (this.carryForwardAllowed) {
        if (this.maxCarryForwardDays > this.maxDaysPerYear) {
            return throwValidationError(
                "maxCarryForwardDays",
                this.maxCarryForwardDays,
                "Maximum carry forward days cannot exceed max days per year"
            );
        }
        if (this.carryForwardDays > this.maxCarryForwardDays) {
            return throwValidationError(
                "carryForwardDays",
                this.carryForwardDays,
                "Carry forward days cannot exceed maximum carry forward days"
            );
        }
    }

    // Ensure remainingDays doesn't exceed maxDaysPerYear
    if (this.remainingDays > this.maxDaysPerYear) {
        return throwValidationError(
            "remainingDays",
            this.remainingDays,
            "Remaining days cannot exceed maximum days per year"
        );
    }

    logger.logMessage("info", "Leave entitlement validation passed", {
        user: this.user,
        leaveType: this.leaveType,
        year: this.year,
    });

    next();
});

// Static Method: Reset Entitlements Yearly
leaveEntitlementSchema.statics.resetEntitlements = async function (
    organisationId,
    year
) {
    const entitlements = await this.find({
        organisation: organisationId,
        year: year - 1,
        status: "ACTIVE",
    });
    for (const entitlement of entitlements) {
        const newEntitlement = new this({
            ...entitlement.toObject(),
            year,
            remainingDays: entitlement.maxDaysPerYear,
            carryForwardDays: entitlement.carryForwardAllowed
                ? Math.min(
                      entitlement.remainingDays,
                      entitlement.maxCarryForwardDays
                  )
                : 0,
            status: "ACTIVE",
            resetDate: new Date(year, 11, 31),
            createdBy: entitlement.updatedBy,
            updatedBy: entitlement.updatedBy,
        });
        entitlement.status = "EXPIRED";
        await entitlement.save();
        await newEntitlement.save();
    }
    logger.logMessage("info", `Entitlements reset for year ${year}`, {
        organisation: organisationId,
    });
};


// Static Method: Get User's Active Entitlements
leaveEntitlementSchema.statics.getActiveEntitlements = async function (
    userId,
    year = new Date().getFullYear()
) {
    return this.find({ user: userId, year, status: "ACTIVE" }).populate(
        "leavePolicy"
    );
};


leaveEntitlementSchema.index({ user: 1, year: 1, status: 1 });
leaveEntitlementSchema.index({ organisation: 1, leaveType: 1 });


const LeaveEntitlement = mongoose.model(
    "LeaveEntitlement",
    leaveEntitlementSchema
);
export default LeaveEntitlement;
