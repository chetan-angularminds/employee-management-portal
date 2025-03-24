import mongoose from "mongoose";
import httpStatus from "http-status";
import models from "../models/index.js";
import ApiError from "../utils/ApiError.js";

/**
 * Creates a new leave request.
 * @param {Object} leaveDetails - Details of the leave request to create.
 * @param {Object} user - The user creating the leave request.
 * @returns {Promise<Object>} The created leave request document.
 * @throws {ApiError} If leave details or user are invalid.
 */
const createLeaveRequest = async (leaveDetails, user) => {
    if (!leaveDetails) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Leave request details are required");
    }
    if (!user || !mongoose.Types.ObjectId.isValid(user._id) || !user.organisation) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Valid user with organisation is required");
    }

    const leaveRequest = await models.LeaveRequest.create({
        ...leaveDetails,
        user: user._id,
        organisation: user.organisation,
        createdBy: user._id,
        updatedBy: user._id,
    });

    return leaveRequest.toObject();
};

/**
 * Retrieves a leave request by its ID.
 * @param {string} id - The ID of the leave request to retrieve.
 * @returns {Promise<Object>} The leave request document if found.
 * @throws {ApiError} If the ID is invalid or the leave request is not found.
 */
const getLeaveRequestById = async (id) => {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid leave request ID provided");
    }

    const leaveRequest = await models.LeaveRequest.findOne({
        _id: id,
        deleted: { $ne: true },
    }).lean();

    if (!leaveRequest) {
        throw new ApiError(httpStatus.NOT_FOUND, `No active leave request found with ID: ${id}`);
    }

    return leaveRequest;
};

/**
 * Retrieves all non-deleted leave requests for a given organization.
 * @param {string} orgId - The ID of the organization to fetch leave requests for.
 * @returns {Promise<Object[]>} An array of active leave request documents.
 * @throws {ApiError} If the organization ID is invalid or no active leave requests are found.
 */
const getLeaveRequestsByOrgId = async (orgId) => {
    if (!orgId || !mongoose.Types.ObjectId.isValid(orgId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid organization ID provided");
    }

    const leaveRequests = await models.LeaveRequest.find({
        organisation: orgId,
        deleted: { $ne: true }, 
    }).lean();

    if (!leaveRequests || leaveRequests.length === 0) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `No active leave requests found for organization ID: ${orgId}`
        );
    }

    return leaveRequests;
};

/**
 * Retrieves all non-deleted leave requests for a given user ID.
 * @param {string} userId - The ID of the user to fetch leave requests for.
 * @returns {Promise<Object[]>} An array of active leave request documents for the user.
 * @throws {ApiError} If the user ID is invalid or no active leave requests are found.
 */
const getLeaveRequestsByUserId = async (userId) => {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid user ID provided");
    }

    const leaveRequests = await models.LeaveRequest.find({
        user: userId,
        deleted: { $ne: true }, 
    }).lean();

    if (!leaveRequests || leaveRequests.length === 0) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `No active leave requests found for user ID: ${userId}`
        );
    }

    return leaveRequests;
};

/**
 * Updates a leave request by its ID.
 * @param {string} id - The ID of the leave request to update.
 * @param {Object} updateData - The data to update the leave request with.
 * @param {string} userId - The ID of the user performing the update.
 * @returns {Promise<Object>} The updated leave request document.
 * @throws {ApiError} If the ID, update data, or user ID is invalid, or the leave request is not found.
 */
const updateLeaveRequest = async (id, updateData, userId) => {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid leave request ID provided");
    }
    if (!updateData || Object.keys(updateData).length === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Update data is required");
    }
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid user ID provided");
    }

    const leaveRequest = await models.LeaveRequest.findOneAndUpdate(
        { _id: id, deleted: { $ne: true } },
        { ...updateData, updatedBy: userId, updatedAt: new Date() },
        { new: true } 
    ).lean();

    if (!leaveRequest) {
        throw new ApiError(httpStatus.NOT_FOUND, `No active leave request found with ID: ${id}`);
    }

    return leaveRequest;
};

/**
 * Deletes a leave request by its ID (soft delete).
 * @param {string} id - The ID of the leave request to delete.
 * @param {string} userId - The ID of the user performing the deletion.
 * @returns {Promise<Object>} The deleted leave request document.
 * @throws {ApiError} If the ID or user ID is invalid, or the leave request is not found.
 */
const deleteLeaveRequest = async (id, userId) => {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid leave request ID provided");
    }
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Invalid user ID provided");
    }

    const leaveRequest = await models.LeaveRequest.findOneAndUpdate(
        { _id: id, deleted: { $ne: true } },
        { deleted: true, updatedBy: userId, updatedAt: new Date() },
        { new: true } 
    ).lean();

    if (!leaveRequest) {
        throw new ApiError(httpStatus.NOT_FOUND, `No active leave request found with ID: ${id}`);
    }

    return leaveRequest;
};

const leaveService = {
    createLeaveRequest,
    getLeaveRequestById,
    getLeaveRequestsByOrgId,
    getLeaveRequestsByUserId,
    updateLeaveRequest,
    deleteLeaveRequest,
};

export default leaveService;