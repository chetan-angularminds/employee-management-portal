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
        // List of valid job titles
        jobTitles: [{ type: String, trim: true }],
        // List of valid departments
        departments: [{ type: String, trim: true }],
        // List of valid positions
        positions: [{ type: String, trim: true }],
        // List of valid worker types
        workerTypes: [{ type: String, trim: true }],
        // List of valid work time types (e.g., Full-Time, Part-Time)
        workTimeTypes: [{ type: String, trim: true }],
        // List of valid contract statuses (e.g., Permanent, Temporary)
        contractStatuses: [{ type: String, trim: true }],
        // List of valid pay bands (e.g., Band A, Band B)
        payBands: [{ type: String, trim: true }],
        // List of valid pay grades (e.g., Grade 1, Grade 2)
        payGrades: [{ type: String, trim: true }],
        // Probation configuration
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

// Add plugins for pagination and soft delete
organisationConfigSchema.plugin(plugins.paginate);
organisationConfigSchema.plugin(plugins.softDelete);
organisationConfigSchema.plugin(plugins.privatePlugin);

const OrganisationConfig = mongoose.model(
    "OrganisationConfig",
    organisationConfigSchema
);
export default OrganisationConfig;
