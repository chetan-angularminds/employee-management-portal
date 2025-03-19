/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { UserDetailsFormProps } from "../../core/interfaces/signUp.interfaces";
import "react-intl-tel-input/dist/main.css";
import IntlTelInput from "react-intl-tel-input";
import "./userDetailsForm.css"
import { InfoCircle } from "iconoir-react/regular";




function UserDetailsForm({ onSubmit, isLoading }: UserDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      email: "",
      userName: "",
      fullName: { firstName: "", lastName: "" },
      password: "",
      confirmPassword: "",
      contactNumber: { countryCode: "+91", number: "" },
    },
    mode: "onBlur",
    resolver: async (data) => {
      const errors: any = {};
      if (!data.email) {
        errors.email = { message: "Email is required" };
      }
      if (!data.userName) {
        errors.userName = { message: "User Name is required" };
      } else if (!/^[a-zA-Z0-9-_]+$/.test(data.userName)) {
        errors.userName = { message: "Only alphabets, numbers, -, _ are allowed in user name" };
      }
      if (!data.fullName.firstName) {
        errors.fullName = errors.fullName || {};
        errors.fullName.firstName = { message: "First Name is required" };
      }
      if (!data.fullName.lastName) {
        errors.fullName = errors.fullName || {};
        errors.fullName.lastName = { message: "Last Name is required" };
      }
      if (!data.password) {
        errors.password = { message: "Password is required" };
      }
      if (!data.confirmPassword) {
        errors.confirmPassword = { message: "Confirm Password is required" };
      } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = { message: "Passwords do not match" };
      }
      if (!data.contactNumber.number) {
        errors.contactNumber = errors.contactNumber || {};
        errors.contactNumber.number = { message: "Contact Number is required" };
      }
      return { values: data, errors };
    },
  });



  return (
    <div className="w-full h-fit flex justify-center items-center">
      <div className="max-w-2xl   shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-center p-4 bg-transparent border-none">
        <Typography
        as="span"
        type="h4"
        className="text-2xl mt-0 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-purple-400 dark:to-pink-400"
        >
        Sign Up
        </Typography>
      </div>
      <form onSubmit={handleSubmit((data)=>{console.log(data);
      const {confirmPassword, ...UserDetailsForm} = data
       onSubmit(UserDetailsForm)})} className="space-y-4">
        <div className="w-full space-y-1">
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
        <div className="w-full space-y-1">
        <Typography
          as="label"
          htmlFor="username"
          type="small"
          className="font-semibold text-gray-700 dark:text-gray-300"
        >
          Username
        </Typography>
        <Input
          id="username"
          type="text"
          placeholder="someone-example_user"
          className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
          {...register("userName", { required: "User Name is required" })}
        />
        {errors.userName && (
          <Typography type="small" className="text-red-500">
          {errors.userName.message}
          </Typography>
        )}
        </div>
        <div className="w-full space-y-1">
        <Typography
          as="label"
          htmlFor="firstname"
          type="small"
          className="font-semibold text-gray-700 dark:text-gray-300"
        >
          First Name
        </Typography>
        <Input
          id="firstname"
          type="text"
          placeholder="First Name"
          className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
          {...register("fullName.firstName", {
          required: "First Name is required",
          })}
        />
        {errors.fullName?.firstName && (
          <Typography type="small" className="text-red-500">
          {errors.fullName.firstName.message}
          </Typography>
        )}
        </div>
        <div className="w-full space-y-1">
        <Typography
          as="label"
          htmlFor="lastname"
          type="small"
          className="font-semibold text-gray-700 dark:text-gray-300"
        >
          Last Name
        </Typography>
        <Input
          id="lastname"
          type="text"
          placeholder="Last Name"
          className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
          {...register("fullName.lastName", {
          required: "Last Name is required",
          })}
        />
        {errors.fullName?.lastName && (
          <Typography type="small" className="text-red-500">
          {errors.fullName.lastName.message}
          </Typography>
        )}
        </div>
        <div className="w-full space-y-1">
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
          placeholder="Password"
          className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
          {...register("password", { required: "Password is required" })}
        />
        
        {errors.password ?(
          <Typography type="small" className="text-red-500">
          {errors.password.message}
          </Typography>
        ):<div className="flex gap-1.5 text-foreground">
        <InfoCircle className="h-3.5 w-3.5 shrink-0 translate-y-[3px] stroke-2" />
        <Typography type="small" className="text-wrap">
          Use at least 8 characters, one uppercase, one lowercase and one number.
        </Typography>
      </div>}
        </div>
        <div className="w-full space-y-1">
        <Typography
          as="label"
          htmlFor="confirmPassword"
          type="small"
          className="font-semibold text-gray-700 dark:text-gray-300"
        >
          Confirm Password
        </Typography>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
          {...register("confirmPassword", {
          required: "Confirm Password is required",
          })}
        />
        {errors.confirmPassword && (
          <Typography type="small" className="text-red-500">
          {errors.confirmPassword.message}
          </Typography>
        )}
        </div>
        <div className="w-full space-y-1">
        <Typography
          as="label"
          htmlFor="contactNumber"
          type="small"
          className="font-semibold text-gray-700 dark:text-gray-300"
        >
          Contact Number
        </Typography>
        <Controller
          name="contactNumber"
          control={control}
          render={({ field }) => (
          <>
            <IntlTelInput
            preferredCountries={["in", "us"]}
            defaultCountry="in"
            value={field.value.number}
            placeholder="xxxxx-xxxxx"
            onPhoneNumberChange={(isValid, value, countryData) =>
              field.onChange({
              countryCode: `+${countryData.dialCode}`,
              number: value,
              })
            }
            containerClassName="intl-tel-input w-full"
            inputClassName="form-control w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-none focus:border-blue-500 dark:border-gray-600 dark:bg-slate-950 dark:text-white dark:focus:border-purple-400"
            />
            {errors.contactNumber?.countryCode && (
            <Typography type="small" className="text-red-500">
              {errors.contactNumber.countryCode.message}
            </Typography>
            )}
            {errors.contactNumber?.number && (
            <Typography type="small" className="text-red-500">
              {errors.contactNumber.number.message}
            </Typography>
            )}
          </>
          )}
        />
        </div>
        <div className="w-full mt-6">
        <Button
          type="submit"
          isFullWidth
          className="bg-blue-500 border-none hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white"
        >
          Register &nbsp;{isLoading && <Spinner size="sm" />}
        </Button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default UserDetailsForm;
