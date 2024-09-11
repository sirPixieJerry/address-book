export const address = {
  streetName: '',
  streetNumber: '',
  zipCode: '',
  city: '',
};

export const phoneNumber = { phoneNumber: '' };

export const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  addresses: [{ ...address }],
  phoneNumbers: [{ ...phoneNumber }],
};
