import {
  Card,
  Typography,
  Button,
  Input,
  Checkbox,
  Spinner,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import {
  Credentials,
  SignInResponse,
} from "../../core/interfaces/auth.interfaces";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToast } from "../../core/services/toasts.service";
import authService from "../../core/services/auth.service";

export default function SignIn() {
  const Navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setisLoading] = useState<boolean>(false);

  const handleSingIn = async (data: Credentials) => {
    setisLoading(true);
    const response: SignInResponse = await authService.login(data);
    setTimeout(() => {
      if (response.success) {
        getToast("success", response.message);
        Navigate("/");
      } else {
        getToast("error", response.message);
      }

      setisLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full h-fit flex justify-center items-center">
      <Card className="max-w-xs bg-white border border-gray-200 dark:bg-slate-950 dark:border-gray-700 shadow-lg rounded-lg">
        <Card.Header
          as={Card}
          className="flex items-center justify-center p-4 bg-transparent border-none"
        >
          <Typography
            as="span"
            type="h4"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-purple-400 dark:to-pink-400"
          >
            Sign In
          </Typography>
        </Card.Header>
        <Card.Body as="form" className="p-4">
          <div className="mb-4 space-y-1.5">
            <Typography
              as="label"
              htmlFor="email"
              type="small"
              className="font-semibold text-gray-700 dark:text-gray-300"
            >
              Email
            </Typography>
            <Input
              id="email"
              type="email"
              placeholder="someone@example.com"
              className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <Typography type="small" className="text-red-500">
                {errors.email.message}
              </Typography>
            )}
          </div>
          <div className="mb-4 space-y-1.5">
            <Typography
              as="label"
              htmlFor="password"
              type="small"
              className="font-semibold text-gray-700 dark:text-gray-300"
            >
              Password
            </Typography>
            <Input
              id="password"
              type="password"
              placeholder="************"
              className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <Typography type="small" className="text-red-500">
                {errors.password.message}
              </Typography>
            )}
          </div>
          <label htmlFor="remember" className="mb-4 flex items-center gap-2">
            <Checkbox id="remember">
              <Checkbox.Indicator className="bg-purple-600 dark:bg-purple-600 rounded-sm" />
            </Checkbox>
            <Typography className="text-gray-700 dark:text-gray-300">
              Remember Me
            </Typography>
          </label>
          <Button
            onClick={handleSubmit((data) => {
              console.log(data);
              handleSingIn(data);
            })}
            isFullWidth
            className="bg-blue-500 border-none hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white"
          >
            Sign In &nbsp;{isLoading && <Spinner size="sm" />}
          </Button>
        </Card.Body>
        <Card.Footer className="text-center p-4">
          <Typography
            type="small"
            className="my-1 flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300"
          >
            Don't have an account?
            <Typography
              type="small"
              as="a"
              onClick={() => {
                Navigate("/auth/sign-up");
              }}
              className="font-bold text-blue-500 dark:text-purple-400 hover:underline"
            >
              Sign up
            </Typography>
          </Typography>
        </Card.Footer>
      </Card>
    </div>
  );
}
