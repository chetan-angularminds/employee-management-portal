import constants from "../constants/index.js"
import services from "./index.js"

const addEmployee = async (employeeDetails, user) => {

    const employee = await services.userService.createUser(employeeDetails);
    await employee.save();
    
    const employeeProfile = await services.profileService.createEmployeeProfile(employeeDetails, user);
    employeeProfile.user = employee._id;
    await employeeProfile.save();

    return employee;
}

const updateEmployee = async (employeeId, employeeDetails) => {
    const employee = await services.userService.updateUser(employeeId, employeeDetails);
    return employee;
}

const employeeService = {
    addEmployee
}

export default employeeService;