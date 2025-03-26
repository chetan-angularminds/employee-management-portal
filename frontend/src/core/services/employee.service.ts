/* eslint-disable @typescript-eslint/no-explicit-any */
import initialEmployees from "./../../data/employeesData.json";

// Define Employee interface
export interface Employee {
    id: number;
    name: string;
    department: string;
    position: string;
    status: "Active" | "Inactive";
    email: string;
    phone: string;
    leaveRequests?: { id: number; startDate: string; endDate: string; status: "Pending" | "Approved" | "Rejected", createdAt: string }[];
    expenses?: { id: number; amount: number; description: string; status: "Pending" | "Approved" | "Rejected", createdAt: string }[];
    performanceReviews?: { id: number; date: string; rating: number; comments: string }[];
}

// Load initial data: Check localStorage first, fallback to JSON
const loadEmployees = (): Employee[] => {
    const storedData = localStorage.getItem("employees");
    if (storedData) {
        try {
            const parsedData = JSON.parse(storedData);
            // Ensure parsed data matches Employee interface
            return parsedData.map((emp: any) => ({
                ...emp,
                status: emp.status === "Active" || emp.status === "Inactive" ? emp.status : "Active",
                leaveRequests: emp.leaveRequests || [],
                expenses: emp.expenses || [],
                performanceReviews: emp.performanceReviews || [],
            }));
        } catch (error) {
            console.error("Error parsing localStorage data:", error);
            // If parsing fails, fallback to default
        }
    }
    // Fallback to initialEmployees from JSON if localStorage is empty or invalid
    const typedEmployees: Employee[] = (initialEmployees as any[]).map((emp) => ({
        ...emp,
        status: emp.status === "Active" || emp.status === "Inactive" ? emp.status : "Active",
        leaveRequests: emp.leaveRequests || [],
        expenses: emp.expenses || [],
        performanceReviews: emp.performanceReviews || [],
    }));
    localStorage.setItem("employees", JSON.stringify(typedEmployees));
    return typedEmployees;
};

class EmployeeService {
    private employeeData: Employee[] = loadEmployees();

    // Save to localStorage
    private saveToStorage() {
        localStorage.setItem("employees", JSON.stringify(this.employeeData));
    }

    // Get all employees
    getEmployees(): Employee[] {
        return this.employeeData;
    }

    // Add new employee
    addEmployee(employee: Omit<Employee, "id" | "leaveRequests" | "expenses" | "performanceReviews">): Employee {
        const newEmployee: Employee = {
            ...employee,
            id: this.employeeData.length + 1,
            leaveRequests: [],
            expenses: [],
            performanceReviews: [],
        };
        this.employeeData.push(newEmployee);
        this.saveToStorage();
        return newEmployee;
    }

    // Update employee status
    updateEmployeeStatus(id: number, status: "Active" | "Inactive"): Employee | null {
        const employee = this.employeeData.find((emp) => emp.id === id);
        if (employee) {
            employee.status = status;
            this.saveToStorage();
            return employee;
        }
        return null;
    }

    // Approve/Reject leave request
    updateLeaveRequest(employeeId: number, requestId: number, status: "Approved" | "Rejected"): void {
        const employee = this.employeeData.find((emp) => emp.id === employeeId);
        if (employee && employee.leaveRequests) {
            const request = employee.leaveRequests.find((req) => req.id === requestId);
            if (request) {
                request.status = status;
                this.saveToStorage();
            }
        }
    }

    // Approve/Reject expense
    updateExpense(employeeId: number, expenseId: number, status: "Approved" | "Rejected"): void {
        const employee = this.employeeData.find((emp) => emp.id === employeeId);
        if (employee && employee.expenses) {
            const expense = employee.expenses.find((exp) => exp.id === expenseId);
            if (expense) {
                expense.status = status;
                this.saveToStorage();
            }
        }
    }
}

export default new EmployeeService();