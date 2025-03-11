export interface UserDetails {
  email: string;
  userName: string;
  fullName: FullName;
  password: string;
  contactNumber: ContactNumber;
}

interface ContactNumber {
  countryCode: string;
  number: string;
}

interface FullName {
  firstName: string;
  lastName: string;
}

export interface OrgDetails {
  name: string;
  dba: string;
  email: string;
  phone: Phone;
  fax: string;
  billingInformation: BillingInformation;
  address: Address;
  timezone: string;
  locale: string;
}

interface Address {
  physical: Physical;
  mailing: Physical;
}

interface Physical {
  street: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
}

interface BillingInformation {
  name: string;
  email: string;
  phone: string;
}

interface Phone {
  countryCode: string;
  number: string;
}

export interface UserDetailsFormProps {
  onSubmit: (UserDetails: UserDetails) => void;
  isLoading: boolean;
}


export interface OrgDetailsFormProps {
  onSubmit: (orgDetails: OrgDetails) => void;
  isLoading: boolean;
}

