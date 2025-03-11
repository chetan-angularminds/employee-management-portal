import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardBody } from "@material-tailwind/react";
import authService from "../../core/services/auth.service";
import UserDetailsForm from "./userDetailsForm";
import {
  OrgDetails,
  UserDetails,
} from "../../core/interfaces/signUp.interfaces";
import OrgDetailsForm from "./orgDetailsForm";
import { getToast } from "../../core/services/toasts.service";

const SignupPage = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [step, setStep] = useState("user");
  const [isLoading, setisLoading] = useState(false);

  // const [orgDetails, setOrgDetails] = useState({
  //   name: "",
  //   dba: "",
  //   email: "",
  //   phone: { countryCode: "", number: "" },
  //   fax: "",
  //   billingInformation: { name: "", email: "", phone: "" },
  //   address: {
  //     physical: { street: "", addressLine2: "", city: "", state: "", zip: "" },
  //     mailing: { street: "", addressLine2: "", city: "", state: "", zip: "" },
  //   },
  //   timezone: "",
  //   locale: "",
  //   status: "ACTIVE",
  // });

  useEffect(() => {
    if (id) {
      authService.checkIdValidity(id).then((response) => {
        if (response.success) {
          setStep("org");
        } else {
          setStep("user");

          if (response.redirect) {
            Navigate(response.redirect);
          }
        }
      });
    }
  }, [id]);

  const handleUserSubmit = async (userDetails: UserDetails) => {
    setisLoading(true);
    const response = await authService.register(userDetails);
    console.log(response);

    if (response?.data?.user?.registrationToken) {
      Navigate(`/auth/sign-up/${response.data.user.registrationToken}`);
      localStorage.setItem(
        "registerToken",
        response.data.user.registrationToken
      );
      setStep("org");
    }
    setisLoading(false);
  };

  const handleOrgSubmit = async (data: OrgDetails) => {
    const result = await authService.createOrganization(data);
    if (result.success) {
      getToast("success", "Organization Registered Successfully!");
      localStorage.removeItem("registerToken");
    } else {
      getToast("error", result.message);
    }
  };

  return (
    <Card className="max-w-fit mx-auto mt-10 px-6 pt-0 shadow-md">
      <CardBody className="mt-0">
        {/* <Typography type="h2" className="mb-4 dark:text-white">
          {step === "user" ? "User Signup" : "Organization Details"}
        </Typography> */}
        {step === "user" ? (
          <UserDetailsForm isLoading={isLoading} onSubmit={handleUserSubmit} />
        ) : (
          <OrgDetailsForm isLoading={isLoading} onSubmit={handleOrgSubmit} />
        )}
      </CardBody>
    </Card>
  );
};

export default SignupPage;
