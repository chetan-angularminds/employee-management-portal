/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Input,
  Spinner,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import { OrgDetailsFormProps } from "../../core/interfaces/signUp.interfaces";
import IntlTelInput from "react-intl-tel-input";
import { useEffect } from "react";

function OrgDetailsForm({ onSubmit, isLoading }: OrgDetailsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      dba: "",
      email: "",
      phone: { countryCode: "+1", number: "" },
      fax: "",
      billingInformation: { name: "", email: "", phone: "" },
      address: {
        physical: {
          street: "",
          addressLine2: "",
          city: "",
          state: "",
          zip: "",
        },
        mailing: { street: "", addressLine2: "", city: "", state: "", zip: "" },
      },
      timezone: "",
      locale: "",
    },
    mode: "onBlur",
    resolver: async (data) => {
      const errors: any = {};
      if (!data.name) {
        errors.name = { message: "Organization Name is required" };
      }
      if (!data.email) {
        errors.email = { message: "Email is required" };
      }
      if (!data.phone.number) {
        errors.phone = errors.phone || {};
        errors.phone.number = { message: "Phone Number is required" };
      }
      return { values: data, errors };
    },
  });

  const physicalAddress = watch("address.physical");
useEffect(()=>{mailingAddressHandler(); console.log(physicalAddress);
},[JSON.stringify(physicalAddress)])


  const mailingAddressHandler = (e?: any) => {
    if (e) {
      e.preventDefault();
        
      if (e.target.checked) {
        setValue("address.mailing", physicalAddress);
      }else{
        setValue("address.mailing", { street: "", addressLine2: "", city: "", state: "", zip: "" });
      }
    }else{
        const checkbox = document.getElementById("isSameAsPhysical") as HTMLInputElement;
        if (checkbox && checkbox.checked) {
          setValue("address.mailing", physicalAddress);
        }
        
    }
  };

  return (
    <div className="w-full h-fit flex justify-center items-center">
      <div className="max-w-4xl shadow-lg rounded-lg p-6">
        <div className="flex items-center justify-center p-4 bg-transparent border-none">
          <Typography
            as="span"
            type="h4"
            className="text-2xl mt-0 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-purple-400 dark:to-pink-400"
          >
            Organization Details
          </Typography>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);

            onSubmit(data);
          })}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Basic Details */}
            <div className="col-span-1 md:col-span-3">
              <Typography
                type="h5"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Basic Details
              </Typography>
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="name"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Organization Name
              </Typography>
              <Input
                id="name"
                type="text"
                placeholder="Organization Name"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("name", {
                  required: "Organization Name is required",
                })}
              />
              {errors.name && (
                <Typography type="small" className="text-red-500">
                  {errors.name.message}
                </Typography>
              )}
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="dba"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                DBA
              </Typography>
              <Input
                id="dba"
                type="text"
                placeholder="DBA"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("dba")}
              />
            </div>
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
                placeholder="Email"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <Typography type="small" className="text-red-500">
                  {errors.email.message}
                </Typography>
              )}
            </div>
            <div>
              <Typography
                as="label"
                htmlFor="contactNumber"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Contact Number
              </Typography>
              <Controller
                name="phone"
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
                    {errors.phone?.countryCode && (
                      <Typography type="small" className="text-red-500">
                        {errors.phone.countryCode.message}
                      </Typography>
                    )}
                    {errors.phone?.number && (
                      <Typography type="small" className="text-red-500">
                        {errors.phone.number.message}
                      </Typography>
                    )}
                  </>
                )}
              />
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="fax"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Fax
              </Typography>
              <Input
                id="fax"
                type="text"
                placeholder="Fax"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("fax")}
              />
            </div>

            {/* Billing Details */}
            <div className="col-span-1 md:col-span-3">
              <Typography
                type="h5"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Billing Details
              </Typography>
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="billingName"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Billing Name
              </Typography>
              <Input
                id="billingName"
                type="text"
                placeholder="Billing Name"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("billingInformation.name")}
              />
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="billingEmail"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Billing Email
              </Typography>
              <Input
                id="billingEmail"
                type="email"
                placeholder="Billing Email"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("billingInformation.email")}
              />
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="billingPhone"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Billing Phone
              </Typography>
              <Input
                id="billingPhone"
                type="text"
                placeholder="Billing Phone"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("billingInformation.phone")}
              />
            </div>

            {/* Physical Address */}
            <div className="col-span-1 md:col-span-3">
              <Typography
                type="h5"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Physical Address
              </Typography>
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="physicalStreet"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Physical Street
              </Typography>
              <Input
                id="physicalStreet"
                type="text"
                placeholder="Physical Street"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("address.physical.street")}
              />
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="physicalAddressLine2"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Physical Address Line 2
              </Typography>
              <Input
                id="physicalAddressLine2"
                type="text"
                placeholder="Physical Address Line 2"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("address.physical.addressLine2")}
              />
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="physicalCity"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Physical City
              </Typography>
              <Input
                id="physicalCity"
                type="text"
                placeholder="Physical City"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("address.physical.city")}
              />
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="physicalState"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Physical State
              </Typography>
              <Input
                id="physicalState"
                type="text"
                placeholder="Physical State"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("address.physical.state")}
              />
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="physicalZip"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Physical Zip
              </Typography>
              <Input
                id="physicalZip"
                type="text"
                placeholder="Physical Zip"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("address.physical.zip")}
              />
            </div>

            {/* Mailing Address */}
            <div className="col-span-1 md:col-span-3 flex items-center justify-between">
              <Typography
                type="h5"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Mailing Address
              </Typography>
              <div className="flex items-center space-x-2">
                <Typography
                  as="label"
                  htmlFor="mailingStreet"
                  type="small"
                  className="font-semibold text-gray-700 dark:text-gray-300"
                >
                  Same as Physical Address
                </Typography>
                <Checkbox
                  id="isSameAsPhysical"
                  onChange={mailingAddressHandler}
                  className="border-white"
                >
                  <Checkbox.Indicator className="bg-purple-600 dark:bg-purple-600 rounded-sm" />
                </Checkbox>
              </div>
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="mailingStreet"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Mailing Street
              </Typography>
              <Input
                id="mailingStreet"
                type="text"
                placeholder="Mailing Street"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("address.mailing.street")}
              />
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="mailingAddressLine2"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Mailing Address Line 2
              </Typography>
              <Input
                id="mailingAddressLine2"
                type="text"
                placeholder="Mailing Address Line 2"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("address.mailing.addressLine2")}
              />
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="mailingCity"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Mailing City
              </Typography>
              <Input
                id="mailingCity"
                type="text"
                placeholder="Mailing City"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("address.mailing.city")}
              />
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="mailingState"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Mailing State
              </Typography>
              <Input
                id="mailingState"
                type="text"
                placeholder="Mailing State"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("address.mailing.state")}
              />
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="mailingZip"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Mailing Zip
              </Typography>
              <Input
                id="mailingZip"
                type="text"
                placeholder="Mailing Zip"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("address.mailing.zip")}
              />
            </div>

            {/* Remaining Fields */}
            <div className="col-span-1 md:col-span-3">
              <Typography
                type="h5"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Additional Information
              </Typography>
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="timezone"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Timezone
              </Typography>
              <Input
                id="timezone"
                type="text"
                placeholder="Timezone"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("timezone")}
              />
            </div>
            <div className="w-full space-y-1">
              <Typography
                as="label"
                htmlFor="locale"
                type="small"
                className="font-semibold text-gray-700 dark:text-gray-300"
              >
                Locale
              </Typography>
              <Input
                id="locale"
                type="text"
                placeholder="Locale"
                className="border border-gray-300 dark:border-gray-600 dark:hover:border-gray-600 focus:border-blue-500 dark:focus:border-purple-400"
                {...register("locale")}
              />
            </div>
          </div>
          <div className="w-full mt-6">
            <Button
              type="submit"
              isFullWidth
              className="bg-blue-500 border-none hover:bg-blue-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white"
            >
              Submit &nbsp;{isLoading && <Spinner size="sm" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrgDetailsForm;
