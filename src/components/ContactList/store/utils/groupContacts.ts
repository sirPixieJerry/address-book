import type { ContactType, GroupedContactsType } from '../../types';
import { sortContactsByLastname } from './sortContactsByLastname';

export const groupContacts = (contacts: ContactType[]): GroupedContactsType => {
  const groups = contacts.reduce((acc: GroupedContactsType, contact) => {
    const initial = contact.lastName.charAt(0).toUpperCase();

    if (!acc[initial]) {
      acc[initial] = [];
    }

    acc[initial].push(contact);
    return acc;
  }, {});

  Object.keys(groups).forEach((key) => {
    sortContactsByLastname(groups[key]);
  });

  return Object.keys(groups)
    .sort()
    .reduce((obj: { [initial: string]: ContactType[] }, key) => {
      obj[key] = groups[key];
      return obj;
    }, {});
};
