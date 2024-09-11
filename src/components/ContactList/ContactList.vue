<script setup lang="ts">
import contactData from './mocks/contacts.json';
import { useContactList } from './store';
import { ContactListSection } from './ContactListSection';

const store = useContactList();
store.setContactList(contactData);
</script>

<template>
  <div class="contact-list">
    <ContactListSection
      v-for="(contacts, letter) in store.getContactList"
      :key="letter"
      :letter
      :contacts
    />
  </div>
</template>

<style scoped>
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
