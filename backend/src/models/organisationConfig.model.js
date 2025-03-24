// models/organisationConfig.js
import mongoose from "mongoose";
import plugins from "./plugins/index.js";
import logger from "../config/logger.config.js";

const organisationConfigSchema = new mongoose.Schema(
    {
        organisation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation",
            required: true,
            unique: true,
        },
        jobTitles: [{ type: String, trim: true }],
        departments: [{ type: String, trim: true }],
        positions: [{ type: String, trim: true }],
        workerTypes: [{ type: String, trim: true }],
        workTimeTypes: [{ type: String, trim: true }],
        contractStatuses: [{ type: String, trim: true }],
        payBands: [{ type: String, trim: true }],
        payGrades: [{ type: String, trim: true }],
        probation: {
            type: {
                allowedPolicies: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "OrganisationPolicy",
                    },
                ],
            },
            required: false,
        },
        leave: {
            type: {
                leaveTypes: [{ type: String, trim: true }],
                leaveIntervals: [{ type: String, trim: true }],
                leaveStatuses: [{ type: String, trim: true }],
            },
            required: false,
        },
        roles: [{ type: String, trim: true }],
        attendance: {
            type: {
                actions: [{ type: String, trim: true }],
                logTypes: [{ type: String, trim: true }],
            },
            required: false,
        },
        holiday: {
            type: {
                holidayTypes: [{ type: String, trim: true }],
                holidayStatuses: [{ type: String, trim: true }],
            },
            required: false,
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

organisationConfigSchema.plugin(plugins.paginate);
organisationConfigSchema.plugin(plugins.softDelete);
organisationConfigSchema.plugin(plugins.privatePlugin);

organisationConfigSchema.pre("save", async function (next) {
    logger.logMessage("info", `${this.isNew ? "Creating" : "Updating"} organisation config`, {
        organisation: this.organisation,
        updatedBy: this.updatedBy,
    });
    next();
});

const OrganisationConfig = mongoose.model("OrganisationConfig", organisationConfigSchema);
export default OrganisationConfig;