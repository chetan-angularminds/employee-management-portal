import ApiError from "../utils/ApiError.js";
import models from "./../models/index.js";
import httpStatus from "http-status";
/**
 * Creates a new organisation
 * @param {Object} orgDetails - The details of the organisation to create
 * @param {string} orgDetails.email - The email address of the organisation
 * @param {Object} user - The user creating the organisation
 * @param {string} user._id - The ID of the user creating the organisation
 * @throws {ApiError} When email is already taken - 400 Bad Request
 * @returns {Promise<Object>} The created organisation
 */
const createOrgnisation = async (orgDetails, user) => {
    if (await models.Organisation.isEmailTaken(orgDetails.email)) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `email ${orgDetails.email} is already taken!!`
        );
    }

    const org = await models.Organisation.create({
        createdBy: user._id,
        updatedBy: user._id,
        ...orgDetails,
    });
    org.save();
    return org;
};

/**
 * Retrieves an organisation by its ID
 * @param {string} id - The ID of the organisation to retrieve
 * @returns {Promise<Object>} The organisation with the given ID
 */
const getOrganisationById = async (id) => {
    return models.Organisation.findById(id);
};

/**
 * Retrieves an organisation by its email
 * @param {string} email - The email of the organisation to retrieve
 * @returns {Promise<Object>} The organisation with the given email
 */
const getOrganisationByEmail = async (email) => {
    return models.Organisation.findOne({ email: email });
};

/**
 * Retrieves an organisation by its phone number
 * @param {string} phone - The phone number of the organisation to retrieve
 * @returns {Promise<Object>} The organisation with the given phone number
 */
const getOrganisationByPhone = async (phone) => {
    return models.Organisation.findOne({ phone: phone });
};

/**
 * Retrieves an organisation by its address
 * @param {string} address - The address of the organisation to retrieve
 * @returns {Promise<Object>} The organisation with the given address
 */
const getOrganisationByAddress = async (address) => {
    return models.Organisation.findOne({
        address: { $elemMatch: { address: address } },
    });
};

/**
 * Updates an organisation's details
 * @param {string} orgId - The ID of the organisation to update
 * @param {Object} orgDetails - The details to update for the organisation
 * @param {string} [orgDetails.email] - The new email address for the organisation
 * @param {Object} user - The user performing the update
 * @param {string} user._id - The ID of the user performing the update
 * @throws {ApiError} When organisation is not found - 404 Not Found
 * @throws {ApiError} When email is already taken - 400 Bad Request
 * @returns {Promise<Object>} The updated organisation
 */
const updateOrganisation = async (orgId, orgDetails, user) => {
    const org = await getOrganisationById(orgId);
    if (!org) {
        throw new ApiError(httpStatus.NOT_FOUND, "Organisation not found");
    }
    if (
        orgDetails.email &&
        (await models.Organisation.isEmailTaken(orgDetails.email, orgId))
    ) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `Email ${orgDetails.email} is already taken`
        );
    }
    Object.assign(org, orgDetails);
    org.updatedBy = user._id;
    await org.save();
    return org;
};

/**
 * Deletes an organisation
 * @param {string} orgId - The ID of the organisation to delete
 * @throws {ApiError} When organisation is not found - 404 Not Found
 * @returns {Promise<Object>} The deleted organisation
 */
const deleteOrganisation = async (orgId) => {
    const org = await getOrganisationById(orgId);
    if (!org) {
        throw new ApiError(httpStatus.NOT_FOUND, "Organisation not found");
    }
    await org.delete();
    return org;
};

const organisationService = {
    createOrgnisation,
    getOrganisationById,
    getOrganisationByEmail,
    getOrganisationByPhone,
    getOrganisationByAddress,
    updateOrganisation,
    deleteOrganisation,
};

export default organisationService;
