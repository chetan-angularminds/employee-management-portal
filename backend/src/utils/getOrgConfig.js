import constants from "../constants/index.js";
import models from "../models/index.js";

// Default configuration based on updated OrganisationConstants
const DEFAULT_CONFIG = {
    jobTitles: Object.values(constants.OrganisationConstants.JOB_TITLES),
    departments: Object.values(constants.OrganisationConstants.DEPARTMENTS),
    positions: Object.values(constants.OrganisationConstants.POSITIONS),
    workerTypes: Object.values(constants.OrganisationConstants.WORKER_TYPES),
    workTimeTypes: Object.values(constants.OrganisationConstants.WORK_TIME_TYPES),
    contractStatuses: Object.values(constants.OrganisationConstants.CONTRACT_STATUSES),
    payBands: Object.values(constants.OrganisationConstants.PAY_BANDS),
    payGrades: Object.values(constants.OrganisationConstants.PAY_GRADES),
    probation: {
        maxProbationPeriod: constants.OrganisationConstants.PROBATION.MAX_PROBATION_PERIOD,
        allowedPolicies: constants.OrganisationConstants.PROBATION.ALLOWED_POLICIES,
    },
    leave: {
        leaveTypes: Object.values(constants.LeaveConstants.LeaveTypes),
        leaveIntervals: Object.values(constants.LeaveConstants.LeaveIntervals),
        leaveStatuses: Object.values(constants.LeaveConstants.LeaveStatus),
    },
    roles: Object.values(constants.UserRoles),
    attendance: {
        actions: Object.values(constants.AttendanceLogsConstants.Actions),
        logTypes: Object.values(constants.AttendanceLogsConstants.LogTypes),
    },
    holiday: {
        holidayTypes: Object.values(constants.HolidayConstants.HolidayTypes),
        holidayStatuses: Object.values(constants.HolidayConstants.HolidayStatus),
    },
};

/**
 * @typedef {Object} OrgConfig
 * @property {string[]} jobTitles - List of valid job titles
 * @property {string[]} departments - List of valid departments
 * @property {string[]} positions - List of valid positions
 * @property {string[]} workerTypes - List of valid worker types
 * @property {string[]} workTimeTypes - List of valid work time types
 * @property {string[]} contractStatuses - List of valid contract statuses
 * @property {string[]} payBands - List of valid pay bands
 * @property {string[]} payGrades - List of valid pay grades
 * @property {Object} probation - Probation configuration
 * @property {number} probation.maxProbationPeriod - Maximum probation period in days
 * @property {string[]} probation.allowedPolicies - List of allowed probation policy IDs
 * @property {Object} leave - Leave configuration
 * @property {string[]} leave.leaveTypes - List of valid leave types
 * @property {string[]} leave.leaveIntervals - List of valid leave intervals
 * @property {string[]} leave.leaveStatuses - List of valid leave statuses
 * @property {string[]} roles - List of valid roles
 * @property {Object} attendance - Attendance configuration
 * @property {string[]} attendance.actions - List of valid attendance actions
 * @property {string[]} attendance.logTypes - List of valid attendance log types
 * @property {Object} holiday - Holiday configuration
 * @property {string[]} holiday.holidayTypes - List of valid holiday types
 * @property {string[]} holiday.holidayStatuses - List of valid holiday statuses
 */

/**
 * Merges existing organization config with default config, ensuring all fields are present.
 * @param {Object} existing - Existing config from the database
 * @param {OrgConfig} defaults - Default configuration
 * @returns {OrgConfig} Merged configuration
 */
const mergeConfig = (existing, defaults) => {
    const result = { ...defaults, ...existing };
    result.leave = { ...defaults.leave, ...existing?.leave };
    result.attendance = { ...defaults.attendance, ...existing?.attendance };
    result.holiday = { ...defaults.holiday, ...existing?.holiday };
    result.probation = { ...defaults.probation, ...existing?.probation };
    return result;
};

/**
 * Retrieves the organization configuration for a given organization ID.
 * If no configuration is found, it returns the default configuration.
 *
 * @async
 * @function getOrgConfig
 * @param {string} orgId - The ID of the organization whose configuration is to be retrieved
 * @returns {Promise<OrgConfig>} A promise that resolves to the organization configuration object
 * @throws {Error} Throws an error if there is an issue retrieving the configuration
 */
const getOrgConfig = async (orgId) => {
    try {
        if (!orgId || typeof orgId !== "string") {
            throw new Error("Invalid orgId provided");
        }
        const orgConfig = await models.OrganisationConfig.findOne({ organisation: orgId }).lean();
        if (!orgConfig) return DEFAULT_CONFIG;
        return mergeConfig(orgConfig, DEFAULT_CONFIG);
    } catch (error) {
        console.error("Error fetching org config:", { orgId, message: error.message });
        throw error;
    }
};

export default getOrgConfig;