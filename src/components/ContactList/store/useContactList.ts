import { defineStore } from 'pinia';
import type { ContactType } from '../types';
import { computed, ref } from 'vue';
import { groupContacts } from './utils/groupContacts';
import { mapFormValues } from './utils';

export const useContactList = defineStore('contactListState', () => {
  const contactListState = ref<ContactType[]>([]);

  const setContactList = (contacts: ContactType[]): void => {
    if (contactListState.value.length !== 0) return;
    contactListState.value = [...contacts];
  };

  const getContactList = computed(() => {
    return groupContacts(contactListState.value);
  });

  // 🚩This is a temporary approach because a mock server doesn't exist yet!
  // 🚩So there are no tests!
  const addContact = (contact: ContactType): void => {
    const newContact = mapFormValues(contact);
    contactListState.value.push(newContact);
  };

  return {
    contactListState,
    addContact,
    setContactList,
    getContactList,
  };
});
