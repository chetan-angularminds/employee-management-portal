/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, memo } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

// Mock data (to be replaced with API data in production)
const MOCK_EMPLOYEES = [
    { id: 1, name: "John Doe", department: "Engineering", position: "Senior Developer" },
    { id: 2, name: "Jane Smith", department: "Marketing", position: "Marketing Manager" },
    { id: 3, name: "Mike Johnson", department: "HR", position: "HR Specialist" },
    { id: 4, name: "Sarah Wilson", department: "Engineering", position: "Full Stack Developer" },
    { id: 5, name: "Tom Brown", department: "Sales", position: "Sales Director" },
    { id: 6, name: "Alice Chen", department: "Design", position: "UI/UX Designer" },
];

// Interface for employee data
interface Employee {
    id: number;
    name: string;
    department: string;
    position: string;
}

// Employee Card Component (Memoized for performance)
const EmployeeCard = memo(({ employee }: { employee: Employee }) => (
    <Card className="p-4 hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800">
        <Typography variant="h6" className="font-bold truncate">{employee.name}</Typography>
        <Typography className="text-gray-600 dark:text-gray-300 truncate">{employee.position}</Typography>
        <Typography className="text-sm text-gray-500 truncate">{employee.department}</Typography>
    </Card>
));

const HomePage = () => {
    const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Stats interface and data
    interface Stat {
        label: string;
        value: number;
        color: string;
    }

    const stats: Stat[] = [
        { label: "Total Employees", value: employees.length, color: "text-blue-500" },
        { label: "Departments", value: 5, color: "text-green-500" },
        { label: "Active Projects", value: 12, color: "text-purple-500" },
    ];

    // Fetch employees from API (uncomment and configure for production)
    // useEffect(() => {
    //     const fetchEmployees = async () => {
    //         setIsLoading(true);
    //         setError(null);
    //         try {
    //             const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     // Add authentication headers if required, e.g., "Authorization": `Bearer ${token}`
    //                 },
    //             });
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             const data: Employee[] = await response.json();
    //             setEmployees(data);
    //         } catch (err) {
    //             setError(err instanceof Error ? err.message : "An unexpected error occurred");
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     // Uncomment this line when API is ready
    //     // fetchEmployees();
    // }, []);

    return (
        <div className="container mx-auto px-4 py-8 dark:text-white min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-gray-900 dark:to-gray-800 p-8 rounded-xl mb-12 shadow-lg text-center">
                <Typography variant="h1" className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                    Staff Mosaic
                </Typography>
                <Typography variant="h6" className="text-blue-100 dark:text-gray-300 mb-1">
                    Employee Management Portal
                </Typography>
                <Typography className="text-blue-100 dark:text-gray-300 text-md">
                    A comprehensive solution for workforce management
                </Typography>
            </section>

            {/* Quick Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {stats.map((stat) => (
                    <Card
                        key={stat.label}
                        className="p-6 text-center dark:bg-gray-800 hover:scale-105 transition-transform duration-200"
                    >
                        <Typography className={`text-4xl font-bold ${stat.color}`}>{stat.value}</Typography>
                        <Typography className="text-gray-600 dark:text-gray-300 mt-1">{stat.label}</Typography>
                    </Card>
                ))}
            </section>

            {/* Quick Actions */}
            <section className="mb-12">
                <Typography variant="h2" className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                    Quick Actions
                </Typography>
                <div className="flex flex-wrap gap-4">
                    <Button
                        onClick={() => navigate("/add-employee")}
                        className="bg-green-600 hover:bg-green-700 transition-colors px-6 py-3 rounded-md"
                    >
                        Add New Employee
                    </Button>
                    <Button
                        onClick={() => navigate("/departments")}
                        className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-md"
                    >
                        View Departments
                    </Button>
                    <Button
                        onClick={() => navigate("/reports")}
                        className="bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-3 rounded-md"
                    >
                        Generate Reports
                    </Button>
                </div>
            </section>

            {/* Staff Directory */}
            <section className="mb-12">
                <Typography variant="h2" className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                    Staff Directory
                </Typography>
                {isLoading ? (
                    <Typography className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
                        Loading employees...
                    </Typography>
                ) : error ? (
                    <Typography className="text-center text-red-500 dark:text-red-400">{error}</Typography>
                ) : employees.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {employees.map((employee) => (
                            <EmployeeCard key={employee.id} employee={employee} />
                        ))}
                    </div>
                ) : (
                    <Typography className="text-center text-gray-500 dark:text-gray-400">
                        No employees found.
                    </Typography>
                )}
            </section>

            {/* Recent Updates */}
            <section className="mb-12">
                <Typography variant="h2" className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                    Recent Updates
                </Typography>
                <Card className="p-6 dark:bg-gray-800 shadow-md">
                    <ul className="space-y-4">
                        {[
                            "New hiring process implemented",
                            "Updated employee handbook released",
                            "Team building event scheduled",
                        ].map((update, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <span className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></span>
                                <Typography className="text-gray-700 dark:text-gray-200">{update}</Typography>
                            </li>
                        ))}
                    </ul>
                </Card>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-6 rounded-t-lg mt-auto">
                <Typography variant="small" className="text-center">
                    © {new Date().getFullYear()} Staff Mosaic. All rights reserved.
                </Typography>
            </footer>
        </div>
    );
};

export default HomePage;