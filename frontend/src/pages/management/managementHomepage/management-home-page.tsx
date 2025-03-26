/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

// Mock data for manager-specific stats (to be replaced with API data)
interface ManagerStat {
    label: string;
    value: number | string;
    color: string;
}

const MOCK_MANAGER_STATS = [
    { label: "Team Size", value: 8, color: "text-blue-500" },
    { label: "Pending Approvals", value: 3, color: "text-orange-500" },
    { label: "Open Positions", value: 2, color: "text-red-500" },
];

// Mock data for pending actions (to be replaced with API data)
interface PendingAction {
    id: number;
    employeeName: string;
    action: string;
    date: string;
}

const MOCK_PENDING_ACTIONS = [
    { id: 1, employeeName: "John Doe", action: "Leave Request", date: "2025-03-26" },
    { id: 2, employeeName: "Jane Smith", action: "Expense Approval", date: "2025-03-25" },
    { id: 3, employeeName: "Mike Johnson", action: "Performance Review", date: "2025-03-28" },
];

const ManagementHomePage = () => {
    const [stats, setStats] = useState<ManagerStat[]>(MOCK_MANAGER_STATS);
    const [pendingActions, setPendingActions] = useState<PendingAction[]>(MOCK_PENDING_ACTIONS);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Fetch manager data from API (uncomment and configure for production)
    // useEffect(() => {
    //     const fetchManagerData = async () => {
    //         setIsLoading(true);
    //         setError(null);
    //         try {
    //             const response = await fetch(`${process.env.REACT_APP_API_URL}/manage/dashboard`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     // Add authentication headers, e.g., "Authorization": `Bearer ${token}`
    //                 },
    //             });
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! Status: ${response.status}`);
    //             }
    //             const data = await response.json();
    //             setStats(data.stats || MOCK_MANAGER_STATS);
    //             setPendingActions(data.pendingActions || MOCK_PENDING_ACTIONS);
    //         } catch (err) {
    //             setError(err instanceof Error ? err.message : "An unexpected error occurred");
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     // Uncomment this line when API is ready
    //     // fetchManagerData();
    // }, []);

    return (
        <div className="container mx-auto px-4 py-8 dark:text-white min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-gray-900 dark:to-gray-800 p-8 rounded-xl mb-12 shadow-lg text-center">
                <Typography variant="h1" className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                    Staff Mosaic
                </Typography>
                <Typography variant="h6" className="text-xl text-blue-100 dark:text-gray-300 mb-4">
                    Manager Dashboard
                </Typography>
                <Typography className="text-blue-100 dark:text-gray-300 text-md">
                    Oversee your team, approvals, and key metrics with ease.
                </Typography>
            </section>

            {/* Manager Stats */}
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
                        onClick={() => navigate("/manage/team")}
                        className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-md"
                    >
                        Manage Team
                    </Button>
                    <Button
                        onClick={() => navigate("/manage/approvals")}
                        className="bg-orange-600 hover:bg-orange-700 transition-colors px-6 py-3 rounded-md"
                    >
                        Review Approvals
                    </Button>
                    <Button
                        onClick={() => navigate("/manage/reports")}
                        className="bg-purple-600 hover:bg-purple-700 transition-colors px-6 py-3 rounded-md"
                    >
                        Generate Reports
                    </Button>
                </div>
            </section>

            {/* Pending Actions */}
            <section className="mb-12">
                <Typography variant="h2" className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                    Pending Actions
                </Typography>
                {isLoading ? (
                    <Typography className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
                        Loading pending actions...
                    </Typography>
                ) : error ? (
                    <Typography className="text-center text-red-500 dark:text-red-400">{error}</Typography>
                ) : pendingActions.length > 0 ? (
                    <Card className="p-6 dark:bg-gray-800 shadow-md">
                        <ul className="space-y-4">
                            {pendingActions.map((action) => (
                                <li key={action.id} className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-3 h-3 bg-orange-500 rounded-full flex-shrink-0"></span>
                                        <Typography className="text-gray-700 dark:text-gray-200">
                                            {action.employeeName} - {action.action}
                                        </Typography>
                                    </div>
                                    <Typography className="text-sm text-gray-500 dark:text-gray-400">
                                        {action.date}
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Card>
                ) : (
                    <Typography className="text-center text-gray-500 dark:text-gray-400">
                        No pending actions at this time.
                    </Typography>
                )}
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

export default ManagementHomePage;