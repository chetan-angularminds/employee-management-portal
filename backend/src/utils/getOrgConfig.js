// utils/getOrgConfig.js
import constants from "../constants/index.js";
import models from "../models/index.js";

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
        allowedPolicies: [], // Populated dynamically
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
 * @property {string[]} jobTitles
 * @property {string[]} departments
 * @property {string[]} positions
 * @property {string[]} workerTypes
 * @property {string[]} workTimeTypes
 * @property {string[]} contractStatuses
 * @property {string[]} payBands
 * @property {string[]} payGrades
 * @property {Object} probation
 * @property {Object[]} probation.allowedPolicies - Array of policy objects with details
 * @property {Object} leave
 * @property {string[]} leave.leaveTypes
 * @property {string[]} leave.leaveIntervals
 * @property {string[]} leave.leaveStatuses
 * @property {string[]} roles
 * @property {Object} attendance
 * @property {string[]} attendance.actions
 * @property {string[]} attendance.logTypes
 * @property {Object} holiday
 * @property {string[]} holiday.holidayTypes
 * @property {string[]} holiday.holidayStatuses
 */

const mergeConfig = (existing, defaults) => {
    const result = { ...defaults, ...existing };
    result.leave = { ...defaults.leave, ...existing?.leave };
    result.attendance = { ...defaults.attendance, ...existing?.attendance };
    result.holiday = { ...defaults.holiday, ...existing?.holiday };
    result.probation = { ...defaults.probation, ...existing?.probation };
    return result;
};

const getOrgConfig = async (orgId) => {
    try {
        if (!orgId || typeof orgId !== "string") {
            throw new Error("Invalid orgId provided");
        }

        const orgConfig = await models.OrganisationConfig.findOne({ organisation: orgId })
            .populate("probation.allowedPolicies")
            .lean();

        const probationPolicies = orgConfig?.probation?.allowedPolicies?.length
            ? orgConfig.probation.allowedPolicies
            : await models.OrganisationPolicy.getActivePoliciesByType(
                  orgId,
                  constants.OrganisationConstants.POLICY_TYPES_SUGGESTIONS.PROBATION
              );

        if (!orgConfig) {
            return {
                ...DEFAULT_CONFIG,
                probation: { allowedPolicies: probationPolicies },
            };
        }

        const mergedConfig = mergeConfig(orgConfig, DEFAULT_CONFIG);
        mergedConfig.probation.allowedPolicies = probationPolicies;

        return mergedConfig;
    } catch (error) {
        console.error("Error fetching org config:", { orgId, message: error.message });
        throw error;
    }
};

export default getOrgConfig;