<script setup lang="ts">
import { computed } from 'vue';
import { FormInput } from '../../common';
import { ItemControls } from '../ItemControls';
import { address as addressItem } from '../formSetup';
import type { CreateContactType } from '../types';
import { useFormContext } from '../store';

const props = defineProps<{
  index: number;
}>();

const { getForm } = useFormContext<CreateContactType>('createContact');

const address = computed(() => {
  const form = getForm('createContact');
  return form?.formValues.addresses[props.index];
});
</script>

<template>
  <div v-if="address" class="add-address-form">
    <div class="form-inputs">
      <div class="form-group">
        <FormInput
          v-model="address.streetName"
          label="Straße"
          name="street"
          type="text"
          size="large"
        />
        <FormInput
          v-model="address.streetNumber"
          label="Hausnummer"
          name="streetNumber"
          type="text"
          size="small"
        />
      </div>
      <div class="form-group">
        <FormInput
          v-model="address.zipCode"
          label="Postleitzahl"
          name="zipCode"
          type="text"
          size="small"
        />
        <FormInput
          v-model="address.city"
          label="Stadt"
          name="city"
          type="text"
        />
      </div>
    </div>
    <ItemControls class="controls" field="addresses" :item="addressItem" />
  </div>
</template>

<style scoped>
.add-address-form {
  display: inline-flex;
  gap: 8px;
}

.form-inputs {
  display: flex;
  flex-direction: column;
  gap: inherit;
}

.form-group {
  display: flex;
  flex-direction: row;
  gap: inherit;
}

.controls {
  height: 56px;
  display: flex;
  align-items: center;
}
</style>
