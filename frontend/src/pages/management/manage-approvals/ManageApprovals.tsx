/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import {
  Card,
  Typography,
  Button,
  Spinner,
  Input,
  Select,
} from "@material-tailwind/react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import employeeService, {
  Employee,
} from "./../../../core/services/employee.service";

type RequestStatus = "All" | "Pending" | "Approved" | "Rejected";
type SortOption = "name-asc" | "name-desc" | "date-desc";

// Define a type for combined requests to handle both leave and expense
type CombinedRequest = {
  id: number;
  requestType: "leave" | "expense";
  status: "Pending" | "Approved" | "Rejected";
  date: Date;
  startDate?: string;
  endDate?: string;
  amount?: number;
  description?: string;
};

const ManageApprovals = () => {
  const [employees, setEmployees] = useState(employeeService.getEmployees());
  const [loading, setLoading] = useState(false);

  const [sortOption, setSortOption] = useState<SortOption>("name-asc");
  const [filterStatus, setFilterStatus] = useState<RequestStatus>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const handleLeaveAction = (
    employeeId: number,
    requestId: number,
    status: "Approved" | "Rejected"
  ) => {
    setLoading(true);
    employeeService.updateLeaveRequest(employeeId, requestId, status);
    setTimeout(() => {
      setEmployees([...employeeService.getEmployees()]);
      setLoading(false);
    }, 500);
  };

  const handleExpenseAction = (
    employeeId: number,
    expenseId: number,
    status: "Approved" | "Rejected"
  ) => {
    setLoading(true);
    employeeService.updateExpense(employeeId, expenseId, status);
    setTimeout(() => {
      setEmployees([...employeeService.getEmployees()]);
      setLoading(false);
    }, 500);
  };

  const filteredEmployees = useMemo(() => {
    const result = employees.filter((emp) => {
      const nameMatch = emp.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const leaveMatch = emp.leaveRequests?.some((lr) =>
        lr.startDate?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const expenseMatch = emp.expenses?.some((ex) =>
        ex.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return nameMatch || leaveMatch || expenseMatch;
    });

    // Sort employees only when sorting by name
    if (sortOption === "name-asc" || sortOption === "name-desc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
      if (sortOption === "name-desc") {
        result.reverse();
      }
    }

    return result;
  }, [employees, sortOption, searchTerm]);

  const combineAndSortRequests = (employee: Employee): CombinedRequest[] => {
    const leaves: CombinedRequest[] = (employee.leaveRequests || []).map(
      (lr) => ({
        id: lr.id,
        requestType: "leave",
        status: lr.status,
        // Use the createdAt field if available; otherwise fall back to startDate
        date: new Date(lr.createdAt ? lr.createdAt : lr.startDate),
        startDate: lr.startDate,
        endDate: lr.endDate,
      })
    );

    const expenses: CombinedRequest[] = (employee.expenses || []).map((ex) => ({
      id: ex.id,
      requestType: "expense",
      status: ex.status,
      date: new Date(ex.createdAt),
      amount: ex.amount,
      description: ex.description,
    }));

    let combined = [...leaves, ...expenses];

    // Filter by request status if not set to "All"
    if (filterStatus !== "All") {
      combined = combined.filter((req) => req.status === filterStatus);
    }

    // When sorting by date, sort the combined requests descending by their date (createdAt)
    if (sortOption === "date-desc") {
      combined.sort((a, b) => b.date.getTime() - a.date.getTime());
    }

    return combined;
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:text-white">
      <Typography
        variant="h2"
        className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white"
      >
        Review Approvals
      </Typography>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="flex flex-col">
            <label
              htmlFor="search-input"
              className="text-gray-700 dark:text-gray-300 mb-1"
            >
              Search by Employee or Description
            </label>
            <Input
              id="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <Select
          label="Sort By"
          value={sortOption}
          onChange={(val: any) => setSortOption(val as SortOption)}
          className="dark:bg-gray-700 dark:text-white"
        >
          <Select.Option value="name-asc">Name (A - Z)</Select.Option>
          <Select.Option value="name-desc">Name (Z - A)</Select.Option>
          <Select.Option value="date-desc">
            Request Date (Newest First)
          </Select.Option>
        </Select>

        <Select
          label="Filter Status"
          value={filterStatus}
          onChange={(val: any) => setFilterStatus(val as RequestStatus)}
          className="dark:bg-gray-700 dark:text-white"
        >
          <Select.Option value="All">All</Select.Option>
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Approved">Approved</Select.Option>
          <Select.Option value="Rejected">Rejected</Select.Option>
        </Select>
      </div>

      <Card className="p-6 dark:bg-gray-800 shadow-lg rounded-xl">
        {filteredEmployees.map((employee: any) => {
          // Combine, filter, and sort requests for this employee
          const allRequests = combineAndSortRequests(employee);

          // If an employee has no requests after filtering, show a message
          if (allRequests.length === 0) {
            return (
              <div
                key={employee.id}
                className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
              >
                <Typography className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                  {employee.name}
                </Typography>
                <Typography className="text-gray-500 dark:text-gray-300">
                  No requests found for this user.
                </Typography>
              </div>
            );
          }

          // Otherwise, display the employee name and their sorted requests
          return (
            <div
              key={employee.id}
              className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md"
            >
              <Typography className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                {employee.name}
              </Typography>

              {/* Render each request */}
              {allRequests.map((req: any) => {
                if (req.requestType === "leave") {
                  return (
                    <div
                      key={`leave-${req.id}`}
                      className="flex justify-between items-center p-4 border-l-4 border-blue-500 dark:border-blue-400 bg-white dark:bg-gray-800 shadow rounded-lg mb-2 transition-opacity duration-300"
                    >
                      <Typography className="text-gray-700 dark:text-gray-300">
                        <strong>Leave:</strong> {req.startDate} to {req.endDate}
                        {req.status !== "Pending" && (
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                            ({req.status})
                          </span>
                        )}
                      </Typography>
                      {req.status === "Pending" && (
                        <div className="flex gap-3">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                            onClick={() =>
                              handleLeaveAction(employee.id, req.id, "Approved")
                            }
                          >
                            <AiFillCheckCircle className="h-5 w-5 text-white" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 flex items-center gap-1"
                            onClick={() =>
                              handleLeaveAction(employee.id, req.id, "Rejected")
                            }
                          >
                            <AiFillCloseCircle className="h-5 w-5 text-white" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={`expense-${req.id}`}
                      className="flex justify-between items-center p-4 border-l-4 border-yellow-500 dark:border-yellow-400 bg-white dark:bg-gray-800 shadow rounded-lg mb-2 transition-opacity duration-300"
                    >
                      <Typography className="text-gray-700 dark:text-gray-300">
                        <strong>Expense:</strong>{" "}
                        <span className="font-semibold">${req.amount}</span> -{" "}
                        {req.description}
                        {req.status !== "Pending" && (
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                            ({req.status})
                          </span>
                        )}
                      </Typography>
                      {req.status === "Pending" && (
                        <div className="flex gap-3">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                            onClick={() =>
                              handleExpenseAction(employee.id, req.id, "Approved")
                            }
                          >
                            <AiFillCheckCircle className="h-5 w-5 text-white" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 flex items-center gap-1"
                            onClick={() =>
                              handleExpenseAction(employee.id, req.id, "Rejected")
                            }
                          >
                            <AiFillCloseCircle className="h-5 w-5 text-white" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </Card>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Spinner className="h-12 w-12 text-white" />
        </div>
      )}
    </div>
  );
};

export default ManageApprovals;
