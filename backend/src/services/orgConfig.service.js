import models from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const createConfig = async (configDetails, user) => {
    if (!configDetails) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Config details are required"
        );
    }
    const config = new models.OrganisationConfig.create({
        organisation: user.organisation,
        ...configDetails,
        createdBy: user._id,
        updatedBy: user._id,
    });

    return config;
};

const getConfigById = async (id) => {
    if (!id) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Config ID is required");
    }
    const config = await models.OrganisationConfig.findById(id);
    if (!config) {
        throw new ApiError(httpStatus.NOT_FOUND, "Config not found");
    }
    return config;
};



const deleteConfig = async (id) => {
    if (!id) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Config ID is required");
    }
    const config = await models.OrganisationConfig.findByIdAndDelete(id);
    if (!config) {
        throw new ApiError(httpStatus.NOT_FOUND, "Config not found");
    }
    return config;
};

/**
 * Updates the configuration for a given organization.
 * @param {string} orgId - The ID of the organization whose config is to be updated.
 * @param {Object} updateData - The data to update the organization config with.
 * @param {string} userId - The ID of the user performing the update.
 * @returns {Promise<Object>} The updated organization config document.
 * @throws {ApiError} If the organization ID is invalid, config is not found, or update fails.
 */
const updateConfig = async (orgId, updateData, userId) => {
    // Validate inputs
    if (!orgId || !mongoose.Types.ObjectId.isValid(orgId)) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Invalid organization ID provided."
        );
    }

    if (!updateData || Object.keys(updateData).length === 0) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Update data is required."
        );
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Invalid user ID provided."
        );
    }

    // Find the existing config, excluding soft-deleted ones
    const config = await models.OrganisationConfig.findOne({
        organisation: orgId,
        deleted: { $ne: true },
    });

    if (!config) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `No active configuration found for organization ID: ${orgId}`
        );
    }

    // Update fields with provided data and set updatedBy
    Object.assign(config, updateData, { updatedBy: userId });

    // Save the updated config
    const updatedConfig = await config.save();

    // Return lean version for performance
    return updatedConfig.toObject();
};
const orgConfigService = {
    createConfig,
    getConfigById,
    updateConfig,
    deleteConfig,
};
export default orgConfigService;
