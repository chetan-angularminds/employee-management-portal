import mongoose from "mongoose";
import plugins from "./plugins/index.js";
import constants from "../constants/index.js";

const attendanceLogsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        logType: {
            type: String,
            enum: Object.values(constants.AttendanceLogsConstants.LogTypes),
            default: constants.AttendanceLogsConstants.LogTypes.RFID,
        },
        action: {
            type: String,
            enum: Object.values(constants.AttendanceLogsConstants.Actions),
            required: true,
        },
        timestamp: { type: Date, default: Date.now },
        ipAddress: { type: String },
        deviceInfo: { type: String },
    },
    {
        timestamps: true,
    }
);

attendanceLogsSchema.plugin(plugins.paginate);
attendanceLogsSchema.plugin(plugins.privatePlugin);
attendanceLogsSchema.plugin(plugins.softDelete);

const AttendanceLog = mongoose.model("AttendanceLog", attendanceLogsSchema);
export default AttendanceLog;
