import type { ContactType } from '../../types';

export const sortContactsByLastname = (
  contacts: ContactType[]
): ContactType[] =>
  [...contacts].sort((a, b) => a.lastName.localeCompare(b.lastName));
