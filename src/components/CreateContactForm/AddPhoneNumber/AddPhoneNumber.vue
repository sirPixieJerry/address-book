<script setup lang="ts">
import { computed } from 'vue';
import { FormInput } from '../../common';
import { ItemControls } from '../ItemControls';
import { phoneNumber as phoneNumberItem } from '../formSetup';
import type { CreateContactType } from '../types';
import { useFormContext } from '../store';

const props = defineProps<{
  index: number;
}>();

const { getForm } = useFormContext<CreateContactType>('createContact');

const phoneNumbers = computed(() => {
  const form = getForm('createContact');
  return form?.formValues.phoneNumbers[props.index];
});
</script>

<template>
  <div v-if="phoneNumbers" class="phone-number-form">
    <FormInput
      v-model="phoneNumbers.phoneNumber"
      label="Telefonnummer"
      name="phoneNumber"
      type="text"
    />
    <ItemControls field="phoneNumbers" :item="phoneNumberItem" />
  </div>
</template>

<style scoped>
.phone-number-form {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
}
</style>
