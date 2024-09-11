<script setup lang="ts">
import { computed } from 'vue';
import { SubmitButton, FormSection, IconButton } from '../common';
import { AddContact } from './AddContact';
import { AddAddress } from './AddAddress';
import { AddPhoneNumber } from './AddPhoneNumber';
import { IconSave, IconClose } from '../icons';
import { useFormState } from './store';
import type { CreateContactType } from './types';
import { useFormContext } from './store/useFormContext';
import { initialState } from './formSetup';
import { useContactList } from '../ContactList/store';

const props = defineProps<{
  closeDialog: () => void;
}>();

const { setForm, getForm, formState } = useFormState<CreateContactType>();
const { validateForm, reset } =
  useFormContext<CreateContactType>('createContact');
const { addContact } = useContactList();

setForm('createContact', initialState);

const handleSubmit = (evt: Event) => {
  evt.preventDefault();
  validateForm();
  // 🚩This is a temporary approach because a mock server doesn't exist yet!
  // 🚩So there are no tests!
  if (!(formState[0].errors.length === 0)) return;
  addContact(formState[0].formValues);
  reset();
  props.closeDialog();
};

const form = computed(() => getForm('createContact'));
</script>

<template>
  <div class="button-wrapper">
    <IconButton :icon="IconClose" @click="closeDialog" />
  </div>
  <form v-if="form" class="create-contact-form">
    <FormSection legend="Kontaktdetails:">
      <AddContact />
    </FormSection>
    <FormSection legend="Kontaktadressen:">
      <AddAddress
        v-for="(_item, index) in form.formValues.addresses"
        :key="index"
        :index="index"
      />
    </FormSection>
    <FormSection legend="Kontaktnummern:">
      <AddPhoneNumber
        v-for="(_item, index) in form.formValues.phoneNumbers"
        :key="index"
        :index="index"
      />
    </FormSection>
    <SubmitButton
      label="speichern"
      aria-label="Kontakt speichern"
      :icon="IconSave"
      @click="handleSubmit"
    />
  </form>
</template>

<style scoped>
.button-wrapper {
  display: flex;
  justify-content: flex-end;
}

.create-contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
