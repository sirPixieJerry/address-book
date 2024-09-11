export type AddressType = {
  streetName: string;
  streetNumber: string;
  zipCode: string;
  city: string;
};

export type PhoneNumberType = {
  phoneNumber: string;
};

export type CreateContactType = {
  firstName: string;
  lastName: string;
  email: string;
  addresses: AddressType[];
  phoneNumbers: PhoneNumberType[];
};
