import models from "../models/index.js";

/**
 * Creates a new employee profile.
 *
 * @param {Object} profileDetails - The details of the profile to be created.
 * @param {Object} user - The user creating the profile.
 * @param {string} user._id - The ID of the user creating the profile.
 * @returns {Promise<Object>} The created profile.
 */
const createProfile = async (profileDetails, user) => {
    const profile = await models.EmployeeProfile.create(profileDetails);
    profile.createdBy = user._id;
    profile.save();
    return profile;
};

/**
 * Retrieves an employee profile by its ID.
 *
 * @param {string} id - The ID of the profile to retrieve.
 * @returns {Promise<Object|null>} The profile if found, otherwise null.
 */
const getProfileById = async (id) => {
    return models.EmployeeProfile.findById(id);
};

/**
 * Retrieves an employee profile by email.
 *
 * @param {string} email - The email of the profile to retrieve.
 * @returns {Promise<Object|null>} The profile if found, otherwise null.
 */
const getProfileByEmail = async (email) => {
    return models.EmployeeProfile.findOne({
        $eq: { email: email },
        $ne: { deleted: true },
    });
};

/**
 * Retrieves an employee profile by phone number.
 *
 * @param {string} phone - The phone number of the profile to retrieve.
 * @returns {Promise<Object|null>} The profile if found, otherwise null.
 */
const getProfileByPhone = async (phone) => {
    return models.EmployeeProfile.findOne({
        $eq: { phone: phone },
        $ne: { deleted: true },
    });
};

const profileService = {
    createProfile,
    getProfileById,
    getProfileByEmail,
    getProfileByPhone,
};

export default profileService;