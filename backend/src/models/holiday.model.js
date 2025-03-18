import mongoose from "mongoose";
import plugins from "./plugins/index.js";

const holidaySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        type: {
            type: String,
            enum: ["National", "Regional", "Company"],
            required: true,
        },
        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active",
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

holidaySchema.plugin(plugins.paginate);
holidaySchema.plugin(plugins.privatePlugin);
holidaySchema.plugin(plugins.softDelete);


const Holiday = mongoose.model("Holiday", holidaySchema);

export default Holiday;
