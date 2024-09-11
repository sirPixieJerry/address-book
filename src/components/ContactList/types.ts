export type AddressType = {
  streetName: string;
  streetNumber: string;
  zipCode: string;
  city: string;
};

export type PhoneNumberType = {
  phoneNumber: string;
};

export type ContactType = {
  firstName: string;
  lastName: string;
  email: string;
  addresses: AddressType[];
  phoneNumbers: PhoneNumberType[];
};

export type GroupedContactsType = {
  [initial: string]: ContactType[];
};
