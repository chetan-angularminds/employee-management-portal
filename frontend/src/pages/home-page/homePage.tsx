/* eslint-disable @typescript-eslint/no-unused-vars */
import {  useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";

// Add this after the imports but before the component:
const MOCK_EMPLOYEES = [
    { id: 1, name: "John Doe", department: "Engineering", position: "Senior Developer" },
    { id: 2, name: "Jane Smith", department: "Marketing", position: "Marketing Manager" },
    { id: 3, name: "Mike Johnson", department: "HR", position: "HR Specialist" },
    { id: 4, name: "Sarah Wilson", department: "Engineering", position: "Full Stack Developer" },
    { id: 5, name: "Tom Brown", department: "Sales", position: "Sales Director" },
    { id: 6, name: "Alice Chen", department: "Design", position: "UI/UX Designer" }
];
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
    const navigate = useNavigate();

    return (
        <div className="container mx-auto mt-10 dark:text-white">
            {/* Hero Section */}
            <section className="bg-blue-50 dark:bg-gray-900 p-8 rounded-lg mb-10">
                <Typography as="h1" className="text-4xl font-bold text-center mb-4">
                    Welcome to Employee Management Portal
                </Typography>
                <Typography className="text-center text-gray-600 dark:text-gray-300">
                    Streamline your workforce management with our comprehensive solution
                </Typography>
            </section>

            {/* Quick Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <Card className="p-6 text-center dark:bg-gray-800">
                    <Typography className="text-3xl font-bold text-blue-500">{employees.length}</Typography>
                    <Typography>Total Employees</Typography>
                </Card>
                <Card className="p-6 text-center dark:bg-gray-800">
                    <Typography className="text-3xl font-bold text-green-500">5</Typography>
                    <Typography>Departments</Typography>
                </Card>
                <Card className="p-6 text-center dark:bg-gray-800">
                    <Typography className="text-3xl font-bold text-purple-500">12</Typography>
                    <Typography>Active Projects</Typography>
                </Card>
            </section>

            {/* Quick Actions */}
            <section className="mb-10">
                <Typography as="h2" className="text-2xl font-bold mb-4">
                    Quick Actions
                </Typography>
                <div className="flex gap-4 flex-wrap">
                    <Button onClick={() => navigate('/add-employee')} className="bg-green-500">
                        Add New Employee
                    </Button>
                    <Button onClick={() => navigate('/departments')} className="bg-blue-500">
                        View Departments
                    </Button>
                    <Button onClick={() => navigate('/reports')} className="bg-purple-500">
                        Generate Reports
                    </Button>
                </div>
            </section>

            {/* Staff Mosaic Section (existing employees section) */}
            <main className="my-10">
                <Typography as="h2" className="text-2xl font-bold text-center mb-6">
                    Staff Mosaic
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* ... existing employee cards ... */}
                </div>
            </main>

            {/* Recent Updates Section */}
            <section className="mb-10">
                <Typography as="h2" className="text-2xl font-bold mb-4">
                    Recent Updates
                </Typography>
                <Card className="p-4 dark:bg-gray-800">
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <Typography>New hiring process implemented</Typography>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <Typography>Updated employee handbook available</Typography>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <Typography>Upcoming team building event</Typography>
                        </li>
                    </ul>
                </Card>
            </section>

            {/* Existing footer */}
            <footer className="bg-gray-800 text-white py-4 mt-10">
                <Typography as="p" type="small" className="text-center">
                    &copy; {new Date().getFullYear()} Employee Management Portal. All rights reserved.
                </Typography>
            </footer>
        </div>
    );
};

export default HomePage;