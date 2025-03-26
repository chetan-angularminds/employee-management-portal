import { useState } from "react";
import {
  Card,
  Typography,
  Button,
  Switch,
  Input,
  Dialog,
} from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import employeeService, {
  Employee,
} from "./../../../core/services/employee.service";

type NewEmployeeForm = Omit<
  Employee,
  "id" | "leaveRequests" | "expenses" | "performanceReviews"
>;

const ManageTeam = () => {
  const [employees, setEmployees] = useState<Employee[]>(
    employeeService.getEmployees()
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewEmployeeForm>({
    defaultValues: {
      name: "",
      department: "",
      position: "",
      status: "Active",
      email: "",
      phone: "",
    },
  });

  const handleStatusToggle = (
    id: number,
    currentStatus: "Active" | "Inactive"
  ) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    employeeService.updateEmployeeStatus(id, newStatus);
    setEmployees([...employeeService.getEmployees()]);
  };

  const onSubmit = (data: NewEmployeeForm) => {
    employeeService.addEmployee(data);
    setEmployees([...employeeService.getEmployees()]);
    reset();
    setIsDialogOpen(false);
    console.log(employees);
  };

  const handleDialogToggle = () => {
    setIsDialogOpen(!isDialogOpen);
    if (!isDialogOpen) reset();
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:text-white">
      <Typography
        variant="h2"
        className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white"
      >
        Manage Team
      </Typography>
      <Card className="p-6 dark:bg-gray-800 shadow-lg rounded-xl">
        <div className="grid grid-cols-1 gap-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="flex items-center justify-between p-4 border-b dark:border-gray-700 hover:bg-blue-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <Typography className="font-semibold text-gray-800 dark:text-white truncate">
                  {employee.name}
                </Typography>
                <Typography className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {employee.position} • {employee.department}
                </Typography>
                <Typography className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {employee.email} • {employee.phone}
                </Typography>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <Switch
                  checked={employee.status === "Active"}
                  onChange={() =>
                    handleStatusToggle(employee.id, employee.status)
                  }
                  color="info"
                  className="h-5 w-10 bg-teal-500"
                />
                <Typography className="text-sm font-medium text-gray-600 dark:text-gray-300 min-w-[70px]">
                  {employee.status}
                </Typography>
              </div>
            </div>
          ))}
        </div>
        <Button
          className="mt-6 bg-teal-500 hover:bg-teal-600 text-white transition-all duration-300 shadow-lg"
          onClick={handleDialogToggle}
        >
          Add New Employee
        </Button>
      </Card>

      {/* Add Employee Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Dialog size="lg" open={isDialogOpen}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
              <div className="mb-4 flex items-center justify-between">
                <Typography
                  variant="h4"
                  className="text-xl font-bold text-gray-800 dark:text-white"
                >
                  Add New Employee
                </Typography>
                <Button
                  variant="solid"
                  color="secondary"
                  onClick={handleDialogToggle}
                  className="!text-gray-600 dark:!text-gray-300"
                >
                  ×
                </Button>
              </div>

              {/* Ensure form is correctly wrapped inside the dialog */}
              <form
                className="space-y-5"
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent default form submission
                    handleSubmit(onSubmit)(); // Manually trigger form submission
                  }
                }}
              >
                <div className="space-y-4">
                  {[
                    {
                      name: "name",
                      label: "Full Name",
                      type: "text",
                      rules: { required: "Name is required" },
                    },
                    {
                      name: "department",
                      label: "Department",
                      type: "text",
                      rules: { required: "Department is required" },
                    },
                    {
                      name: "position",
                      label: "Position",
                      type: "text",
                      rules: { required: "Position is required" },
                    },
                    {
                      name: "email",
                      label: "Email",
                      type: "email",
                      rules: {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        },
                      },
                    },
                    {
                      name: "phone",
                      label: "Phone",
                      type: "tel",
                      rules: {
                        required: "Phone is required",
                        pattern: {
                          value: /^\d{3}-\d{3}-\d{4}$/,
                          message: "Use XXX-XXX-XXXX format",
                        },
                      },
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <Typography
                        variant="small"
                        className="mb-2 text-gray-700 dark:text-gray-300"
                      >
                        {field.label}
                      </Typography>
                      <Controller
                        name={field.name as keyof NewEmployeeForm}
                        control={control}
                        rules={field.rules}
                        render={({ field: controllerField }) => (
                          <Input
                            {...controllerField}
                            type={field.type}
                            name={field.name}
                            placeholder={field.label}
                            className={`!text-gray-800 dark:!text-white ${
                              errors[field.name as keyof NewEmployeeForm]
                                ? "!border-red-500"
                                : ""
                            }`}
                          />
                        )}
                      />
                      {errors[field.name as keyof NewEmployeeForm] && (
                        <Typography className="text-red-500 text-xs mt-1">
                          {errors[field.name as keyof NewEmployeeForm]?.message}
                        </Typography>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2 mt-8">
                  <Button
                    variant="outline"
                    color="secondary"
                    onClick={handleDialogToggle}
                    className="hover:shadow-none"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="info"
                    className="bg-teal-500 hover:bg-teal-600 shadow-none hover:shadow-none"
                  >
                    Add Employee
                  </Button>
                </div>
              </form>
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ManageTeam;
