import mongoose from "mongoose";
import models from "../models/index.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const createPolicy = async (policyDetails, user) => {
    if (!policyDetails) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Policy details are required"
        );
    }
    const policy = await models.OrganisationPolicy.create({
        ...policyDetails,
        createdBy: user._id,
        updatedBy: user._id,
    });

    return policy;
};

/**
 * Retrieves a policy by its ID.
 * @param {string} id - The ID of the policy to retrieve.
 * @returns {Promise<Object>} The policy document if found.
 * @throws {ApiError} If the ID is invalid or the policy is not found.
 */
const getPolicyById = async (id) => {
    // Validate the provided ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Invalid policy ID provided."
        );
    }

    // Fetch the policy with lean for performance
    const policy = await models.OrganisationPolicy.findById(id);

    // Check if policy exists
    if (!policy) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `No policy found with ID: ${id}`
        );
    }

    return policy;
};

/**
 * Retrieves all non-deleted policies for a given organization ID.
 * @param {string} orgId - The ID of the organization to fetch policies for.
 * @returns {Promise<Object[]>} An array of active policy documents.
 * @throws {ApiError} If the organization ID is invalid or no active policies are found.
 */
const getPoliciesByOrgId = async (orgId) => {
    // Validate organization ID
    if (!orgId || !mongoose.Types.ObjectId.isValid(orgId)) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Invalid organization ID provided."
        );
    }

    // Fetch non-deleted policies with lean for performance
    const policies = await models.OrganisationPolicy.find({
        organisation: orgId,
        deleted: { $ne: true }, // Exclude soft-deleted policies
    });

    // Check if any active policies exist
    if (!policies || policies.length === 0) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `No active policies found for organization ID: ${orgId}`
        );
    }

    return policies;
};

/**
 * Updates a policy by its ID.
 * @param {string} id - The ID of the policy to update.
 * @param {Object} updateData - The data to update the policy with.
 * @param {Object} user - The user performing the update.
 * @returns {Promise<Object>} The updated policy document.
 * @throws {ApiError} If the ID is invalid, the policy is not found, or the update fails.
 */
const updatePolicy = async (id, updateData, user) => {
    // Validate the provided ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Invalid policy ID provided."
        );
    }

    // Ensure update data is provided
    if (!updateData || Object.keys(updateData).length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Update data is required.");
    }

    // Find and update the policy
    const policy = await models.OrganisationPolicy.findByIdAndUpdate(
        id,
        {
            ...updateData,
            updatedBy: user._id, // Track who updated the policy
            updatedAt: new Date(), // Update the timestamp
        },
        { new: true } // Return the updated document
    );

    // Check if the policy exists
    if (!policy) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `No policy found with ID: ${id}`
        );
    }

    return policy;
};

/**
 * Deletes a policy by its ID (soft delete).
 * @param {string} id - The ID of the policy to delete.
 * @param {Object} user - The user performing the deletion.
 * @returns {Promise<Object>} The deleted policy document.
 * @throws {ApiError} If the ID is invalid or the policy is not found.
 */
const deletePolicy = async (id, user) => {
    // Validate the provided ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            "Invalid policy ID provided."
        );
    }

    // Find and soft delete the policy
    const policy = await models.OrganisationPolicy.findByIdAndUpdate(
        id,
        {
            deleted: true, // Mark the policy as deleted
            updatedBy: user._id, // Track who deleted the policy
            updatedAt: new Date(), // Update the timestamp
        },
        { new: true } // Return the updated document
    );

    // Check if the policy exists
    if (!policy) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `No policy found with ID: ${id}`
        );
    }

    return policy;
};


const orgPolicyService = { 
    createPolicy, 
    getPolicyById, 
    getPoliciesByOrgId, 
    updatePolicy, 
    deletePolicy 
};

export default orgPolicyService;
