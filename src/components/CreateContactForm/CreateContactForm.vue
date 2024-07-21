<script setup lang="ts">
import { computed, ref } from 'vue';
import { FormInput, SubmitButton } from '../common';
import { CreateAddressForm } from './CreateAddressForm';
import { CreatePhoneNumberForm } from './CreatePhoneNumberForm';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
</script>

<template>
  <div>
    <FormInput
      label="firstname:"
      name="firstname"
      type="text"
      v-model="firstName"
      :required="true"
    />
    <FormInput
      label="lastname:"
      name="lastname"
      type="text"
      v-model="lastName"
      :required="true"
    />
    <FormInput
      label="email:"
      name="email"
      type="text"
      v-model="email"
      :required="true"
    />
    <CreateAddressForm />
    <CreatePhoneNumberForm />
    <SubmitButton label="save contact" />
  </div>
</template>

<style scoped></style>
