import mongoose from "mongoose";
import plugins from "./plugins/index.js";
import getOrgConfig from "../utils/getOrgConfig.js";
import logger from "../config/logger.config.js";
import constants from "../constants/index.js";

const leaveRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required for leave request"],
        },
        organisation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation",
            required: [true, "Organisation is required for leave request"],
        },
        leaveType: {
            type: String,
            required: [true, "Leave type is required"],
            trim: true,
        },
        date: {
            type: Date,
            required: [true, "Leave date is required"],
        },
        leaveInterval: {
            type: String,
            required: [true, "Leave interval is required"],
            trim: true,
        },
        status: {
            type: String,
            required: [true, "Leave status is required"],
            trim: true,
            default: constants.LeaveConstants.LeaveStatus.PENDING,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Created by is required"],
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Updated by is required"],
        },
    },
    {
        timestamps: true,
    }
);

leaveRequestSchema.plugin(plugins.paginate);
leaveRequestSchema.plugin(plugins.privatePlugin);
leaveRequestSchema.plugin(plugins.softDelete);

leaveRequestSchema.pre("save", async function (next) {
    await this.populate("user", "organisation");

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

    if (!this.user || !this.user.organisation || !this.organisation) {
        return throwValidationError(
            "organisation",
            this.organisation,
            "User or organisation not found"
        );
    }

    const config = await getOrgConfig(this.organisation);
    if (!config || !config.leave) {
        logger.logMessage("error", "Failed to fetch organisation config", {
            organisation: this.organisation,
        });
        return next(new Error("Organisation configuration not available"));
    }

    const validations = [
        {
            field: "leaveType",
            value: this.leaveType,
            list: config.leave.leaveTypes || [],
            message: `Invalid leave type: ${this.leaveType}`,
        },
        {
            field: "leaveInterval",
            value: this.leaveInterval,
            list: config.leave.leaveIntervals || [],
            message: `Invalid leave interval: ${this.leaveInterval}`,
        },
        {
            field: "status",
            value: this.status,
            list: config.leave.leaveStatuses || [],
            message: `Invalid leave status: ${this.status}`,
        },
    ];

    for (const { field, value, list, message } of validations) {
        if (!list.includes(value)) {
            return throwValidationError(field, value, message);
        }
    }

    logger.logMessage("info", "Leave request validation passed", {
        user: this.user,
        leaveType: this.leaveType,
    });

    next();
});

const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);

export default LeaveRequest;
