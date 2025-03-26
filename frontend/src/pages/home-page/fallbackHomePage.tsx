/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

// Interface for FeatureCard props
interface FeatureCardProps {
    title: string;
    description: string;
    icon: string;
}

const FallbackHomePage = () => {
    const navigate = useNavigate();

    // Feature data
    const features: FeatureCardProps[] = [
        {
            title: "Employee Management",
            description: "Manage employee profiles, track performance, and handle personnel records efficiently.",
            icon: "👥",
        },
        {
            title: "Leave Management",
            description: "Handle leave requests, track balances, and manage team availability.",
            icon: "📅",
        },
        {
            title: "Payroll",
            description: "Process payroll, manage salaries, and track compensation details.",
            icon: "💰",
        },
        {
            title: "Documents",
            description: "Store and manage important company documents and employee records.",
            icon: "📄",
        },
        {
            title: "Performance Reviews",
            description: "Conduct performance evaluations and track employee growth.",
            icon: "📊",
        },
        {
            title: "Team Collaboration",
            description: "Foster team communication and project management.",
            icon: "🤝",
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
            {/* Hero Section */}
            <section className="text-center mb-10">
                <Typography
                    variant="h1"
                    className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-2"
                >
                    Staff Mosaic
                </Typography>
                <Typography
                    variant="h6"
                    className="text-xl text-gray-600 dark:text-gray-300 mb-4"
                >
                    Employee Management Portal
                </Typography>
                <Typography className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Discover a comprehensive solution for managing your workforce effectively.
                </Typography>
            </section>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.title}
                        title={feature.title}
                        description={feature.description}
                        icon={feature.icon}
                    />
                ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
                <Typography
                    variant="paragraph"
                    className="text-lg mb-6 text-gray-600 dark:text-gray-300"
                >
                    Sign in to unlock all features and streamline your workforce management.
                </Typography>
                <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 transition-colors px-8 py-4 rounded-md"
                    onClick={() => navigate("/auth/sign-in")}
                >
                    Sign In
                </Button>
            </div>
        </div>
    );
};

// FeatureCard Component with proper typing
const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="text-4xl mb-4">{icon}</div>
        <Typography
            variant="h3"
            className="text-xl font-semibold mb-2 text-gray-800 dark:text-white truncate"
        >
            {title}
        </Typography>
        <Typography
            variant="paragraph"
            className="text-gray-600 dark:text-gray-300 line-clamp-2"
        >
            {description}
        </Typography>
    </div>
);

export default FallbackHomePage;