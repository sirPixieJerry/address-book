import type { CreateContactType } from '../../../CreateContactForm/types';
import type { ContactType } from '../../types';

// 🚩This is a temporary approach because a mock server doesn't exist yet!
// 🚩So there are no tests!
export const mapFormValues = (formValues: CreateContactType): ContactType => {
  const { firstName, lastName, email, addresses, phoneNumbers } = formValues;
  const newContact = {
    firstName,
    lastName,
    email,
    addresses: addresses.every((address) =>
      Object.values(address).every((value) => value === '')
    )
      ? []
      : addresses,
    phoneNumbers: phoneNumbers.every((phoneNumber) =>
      Object.values(phoneNumber).every((value) => value === '')
    )
      ? []
      : phoneNumbers,
  };
  return newContact;
};
