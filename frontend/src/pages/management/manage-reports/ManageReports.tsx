import { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import employeeService from "./../../../core/services/employee.service";

const ManageReports = () => {
    const [employees] = useState(employeeService.getEmployees());
    const [reportType, setReportType] = useState<"performance" | "status" | null>(null);

    const generateReport = (type: "performance" | "status") => {
        setReportType(type);
    };

    return (
        <div className="container mx-auto px-4 py-8 dark:text-white">
            <Typography variant="h2" className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Generate Reports
            </Typography>
            <Card className="p-6 dark:bg-gray-800 shadow-md">
                <div className="flex flex-wrap gap-4 mb-6">
                    <Button
                        className="bg-purple-600 hover:bg-purple-700 transition-colors"
                        onClick={() => generateReport("performance")}
                    >
                        Performance Report
                    </Button>
                    <Button
                        className="bg-purple-600 hover:bg-purple-700 transition-colors"
                        onClick={() => generateReport("status")}
                    >
                        Status Report
                    </Button>
                </div>

                {reportType === "performance" && (
                    <div>
                        <Typography className="font-semibold mb-4 text-gray-800 dark:text-white">
                            Performance Report
                        </Typography>
                        {employees.map((employee) => (
                            (employee.performanceReviews ?? []).length > 0 && (
                                <div key={employee.id} className="p-4 border-b dark:border-gray-700">
                                    <Typography className="text-gray-800 dark:text-white">
                                        {employee.name}
                                    </Typography>
                                    {employee.performanceReviews?.map((review) => (
                                        <Typography key={review.id} className="text-gray-600 dark:text-gray-300 text-sm">
                                            {review.date}: Rating {review.rating}/5 - {review.comments}
                                        </Typography>
                                    ))}
                                </div>
                            )
                        ))}
                    </div>
                )}

                {reportType === "status" && (
                    <div>
                        <Typography className="font-semibold mb-4 text-gray-800 dark:text-white">
                            Status Report
                        </Typography>
                        {employees.map((employee) => (
                            <div key={employee.id} className="p-4 border-b dark:border-gray-700">
                                <Typography className="text-gray-800 dark:text-white">
                                    {employee.name} - {employee.status}
                                </Typography>
                                <Typography className="text-gray-600 dark:text-gray-300 text-sm">
                                    {employee.position}, {employee.department}
                                </Typography>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ManageReports;