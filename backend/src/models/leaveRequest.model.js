import mongoose from "mongoose";
import constants from "../constants/index.js";
import plugins from "./plugins/index.js";

const leaveRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        leaveType: {
            type: String,
            enum: Object.values(constants.LeaveConstants.LeaveTypes),
            default: constants.LeaveConstants.LeaveTypes.UNPAID,
        },
        date: {
            type: Date,
            required: true,
        },
        leaveInterval: {
            type: String,
            enum: Object.values(constants.LeaveConstants.LeaveIntervals),
            default: constants.LeaveConstants.LeaveIntervals.FULLDAY,
        },
        status: {
            type: String,
            enum: Object.values(constants.LeaveConstants.LeaveStatus),
            default: constants.LeaveConstants.LeaveStatus.PENDING,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "created by is required"],
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "created by is required"],
        },
    },
    {
        timestamps: true,
    }
);

leaveRequestSchema.plugin(plugins.paginate);
leaveRequestSchema.plugin(plugins.privatePlugin);
leaveRequestSchema.plugin(plugins.softDelete);

const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);

export default LeaveRequest;
