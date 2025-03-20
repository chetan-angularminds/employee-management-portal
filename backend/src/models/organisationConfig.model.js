import mongoose from "mongoose";
import plugins from "./plugins/index.js";

const organisationConfigSchema = new mongoose.Schema(
    {
        organisation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organisation",
            required: true,
            unique: true,
        },
        positions: [{ type: String, trim: true }],
        departments: [{ type: String, trim: true }],
        workerTypes: [{ type: String, trim: true }],
        leave: {
            type: {
                leaveType: [{ type: String, trim: true }],
                LeaveIntervals: [{ type: String, trim: true }],
                LeaveStatus: [{ type: String, trim: true }],
            },
        },
        roles: [{ type: String, trim: true }],
        attendance: {
            type: {
                action: [
                    {
                        type: String,
                        trim: true,
                    },
                ],
                logType: [
                    {
                        type: String,
                        trim: true,
                    },
                ],
            },
            required: false,
        },
        holiday: {
            type: {
                holidayType: [
                    {
                        type: String,
                        trim: true,
                    },
                ],
                holidayStatus: [
                    {
                        type: String,
                        trim: true,
                    },
                ],
            },
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

const OrganisationConfig = mongoose.model(
    "OrganisationConfig",
    organisationConfigSchema
);
export default OrganisationConfig;
