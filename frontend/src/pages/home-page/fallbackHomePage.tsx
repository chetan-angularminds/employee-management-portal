/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const FallbackHomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900 py-12">
            <Typography
                as="h1"
                type="h2"
                className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white"
            >
                Welcome to Employee Management Portal
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-8">
                <FeatureCard
                    title="Employee Management"
                    description="Manage employee profiles, track performance, and handle personnel records efficiently."
                    icon="👥"
                />
                <FeatureCard
                    title="Leave Management"
                    description="Handle leave requests, track balances, and manage team availability."
                    icon="📅"
                />
                <FeatureCard
                    title="Payroll"
                    description="Process payroll, manage salaries, and track compensation details."
                    icon="💰"
                />
                <FeatureCard
                    title="Documents"
                    description="Store and manage important company documents and employee records."
                    icon="📄"
                />
                <FeatureCard
                    title="Performance Reviews"
                    description="Conduct performance evaluations and track employee growth."
                    icon="📊"
                />
                <FeatureCard
                    title="Team Collaboration"
                    description="Foster team communication and project management."
                    icon="🤝"
                />
            </div>

            <div className="text-center">
                <Typography
                    as="p"
                    type="p"
                    className="text-lg mb-6 text-gray-600 dark:text-gray-300"
                >
                    Please sign in to access these features and more.
                </Typography>
                <Button
                    size="lg"
                    className="bg-blue-500 hover:bg-blue-600 text-white dark:bg-purple-600 dark:hover:bg-purple-700"
                    onClick={() => navigate("/auth/sign-in")}
                >
                    Sign In
                </Button>
            </div>
        </div>
    );
};

const FeatureCard = ({ title, description, icon }:any) => (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
        <div className="text-4xl mb-4">{icon}</div>
        <Typography
            as="h3"
            className="text-xl font-semibold mb-2 text-gray-800 dark:text-white"
        >
            {title}
        </Typography>
        <Typography
            as="p"
            className="text-gray-600 dark:text-gray-300"
        >
            {description}
        </Typography>
    </div>
);

export default FallbackHomePage;