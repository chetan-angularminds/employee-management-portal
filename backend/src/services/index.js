import authService from "./auth.service.js";
import employeeService from "./employee.service.js";
import leaveService from "./leave.service.js";
import organisationService from "./organisation.service.js";
import profileService from "./profile.service.js";
import userService from "./user.service.js";

const services = {
    userService,
    authService,
    organisationService,
    employeeService,
    leaveService,
    profileService,
};

export default services;
