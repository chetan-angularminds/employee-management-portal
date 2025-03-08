import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Input, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import authService from "../../core/services/auth.service";

const SignupPage = () => {
  const { id } = useParams();
  const [step, setStep] = useState("user");
  const [userDetails, setUserDetails] = useState({
    email: "", 
    userName: "", 
    fullName: { firstName: "", lastName: "" },
    password: "", 
    contactNumber: { countryCode: "+91", number: "" }
  });

  const [orgDetails, setOrgDetails] = useState({
    name: "", dba: "", email: "", phone: { countryCode: "", number: "" },
    fax: "", billingInformation: { name: "", email: "", phone: "" },
    address: {
      physical: { street: "", addressLine2: "", city: "", state: "", zip: "" },
      mailing: { street: "", addressLine2: "", city: "", state: "", zip: "" }
    },
    timezone: "", locale: "", status: "ACTIVE"
  });

  useEffect(() => {
    if (id) {
      authService.checkIdValidity(id).then((response) => {
        if (response) {
          setStep("org");
        } else {
          setStep("user");
        }
      });
    }
  }, [id]);

  const handleUserSubmit = async () => {
    const response = await authService.register(userDetails);
    if (response.data.token) {
      setStep("org");
    }
  };

  const handleOrgSubmit = async () => {
    await authService.createOrganization(orgDetails);
    alert("Organization Registered Successfully!");
  };

  return (
    <Card className="max-w-lg mx-auto mt-10 p-6 shadow-md">
      <CardBody>
        <Typography variant="h4" className="mb-4">
          {step === "user" ? "User Signup" : "Organization Details"}
        </Typography>
        {step === "user" ? (
          <div>
            <Input placeholder="Email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} className="mb-4"/>
            <Input placeholder="Username" value={userDetails.userName} onChange={(e) => setUserDetails({ ...userDetails, userName: e.target.value })} className="mb-4"/>
            <Input placeholder="First Name" value={userDetails.fullName.firstName} onChange={(e) => setUserDetails({ ...userDetails, fullName: { ...userDetails.fullName, firstName: e.target.value } })} className="mb-4"/>
            <Input placeholder="Last Name" value={userDetails.fullName.lastName} onChange={(e) => setUserDetails({ ...userDetails, fullName: { ...userDetails.fullName, lastName: e.target.value } })} className="mb-4"/>
            <Input placeholder="Password" type="password" value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} className="mb-4"/>
            <div className="flex gap-2">
              <Input placeholder="Country Code" value={userDetails.contactNumber.countryCode} onChange={(e) => setUserDetails({ ...userDetails, contactNumber: { ...userDetails.contactNumber, countryCode: e.target.value } })} className="mb-4 w-1/3"/>
              <Input placeholder="Contact Number" value={userDetails.contactNumber.number} onChange={(e) => setUserDetails({ ...userDetails, contactNumber: { ...userDetails.contactNumber, number: e.target.value } })} className="mb-4 w-2/3"/>
            </div>
            <Button onClick={handleUserSubmit} isFullWidth>Register</Button>
          </div>
        ) : (
          <div>
            <Input placeholder="Organization Name" value={orgDetails.name} onChange={(e) => setOrgDetails({ ...orgDetails, name: e.target.value })} className="mb-4"/>
            <Input placeholder="DBA" value={orgDetails.dba} onChange={(e) => setOrgDetails({ ...orgDetails, dba: e.target.value })} className="mb-4"/>
            <Input placeholder="Email" value={orgDetails.email} onChange={(e) => setOrgDetails({ ...orgDetails, email: e.target.value })} className="mb-4"/>
            <Input placeholder="Phone Number" value={orgDetails.phone.number} onChange={(e) => setOrgDetails({ ...orgDetails, phone: { ...orgDetails.phone, number: e.target.value } })} className="mb-4"/>
            <Button onClick={handleOrgSubmit} isFullWidth>Submit</Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default SignupPage;
