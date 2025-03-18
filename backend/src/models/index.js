import AttendanceLog from "./attendanceLog.model.js";
import DbLogs from "./dbLogs.model.js";
import EmployeeProfile from "./employeeProfile.model.js";
import Holiday from "./holiday.model.js";
import LeaveRequest from "./leaveRequest.model.js";
import Organisation from "./organisation.model.js";
import OrganisationConfig from "./organisationConfig.model.js";
import RequestLog from "./requestLogs.model.js";
import User from "./user.model.js";

const models = {
    Organisation,
    User,
    RequestLog,
    LeaveRequest,
    Holiday,
    EmployeeProfile,
    AttendanceLog,
    DbLogs,
    OrganisationConfig
};

export default models;
