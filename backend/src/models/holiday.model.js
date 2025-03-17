import mongoose from "mongoose";
import plugins from "./plugins/index.js";

const holidaySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        enum: ['National', 'Regional', 'Company'],
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

holidaySchema.plugin(plugins.paginate);
holidaySchema.plugin(plugins.privatePlugin);
holidaySchema.plugin(plugins.softDelete);

// Update timestamp on document update
holidaySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Holiday = mongoose.model('Holiday', holidaySchema);

export default Holiday;