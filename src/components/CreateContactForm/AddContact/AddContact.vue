<script setup lang="ts">
import { computed } from 'vue';
import { FormInput } from '../../common';
import { useFormContext } from '../store';
import type { CreateContactType } from '../types';
import { validateEmail } from '../utils';

const { getForm } = useFormContext<CreateContactType>('createContact');

const formValues = computed(() => {
  const form = getForm('createContact');
  return form?.formValues;
});
</script>

<template>
  <div v-if="formValues" class="add-contact-form">
    <FormInput
      v-model="formValues.firstName"
      label="Vorname"
      name="firstName"
      type="text"
      :rules="{
        required: { value: true, message: 'Vorname benötigt' },
      }"
    />
    <FormInput
      v-model="formValues.lastName"
      label="Nachname"
      name="lastName"
      type="text"
      :rules="{ required: { value: true, message: 'Nachname benötigt' } }"
    />
    <FormInput
      v-model="formValues.email"
      label="E-Mail"
      name="email"
      type="text"
      :rules="{
        required: { value: true, message: 'E-Mail benötigt' },
        validate: { callback: validateEmail, message: 'E-Mail ungültig' },
      }"
    />
  </div>
</template>

<style scoped>
.add-contact-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
</style>
