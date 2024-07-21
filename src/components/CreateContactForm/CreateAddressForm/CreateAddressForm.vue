<script setup lang="ts">
import { computed, ref } from 'vue';
import { FormInput } from '../../common';

const street = ref('');
const streetNumber = ref('');
const zipCode = ref('');
const city = ref('');
</script>

<template>
  <div>
    <div class="group">
      <FormInput
        label="street:"
        name="street"
        type="text"
        size="large"
        v-model="street"
        :required="false"
      />
      <FormInput
        label="number:"
        name="streetNumber"
        size="small"
        type="text"
        v-model="streetNumber"
        :required="false"
      />
    </div>
    <div class="group">
      <FormInput
        label="zip code:"
        name="zipCode"
        type="text"
        size="small"
        v-model="zipCode"
        :required="false"
      />
      <FormInput
        label="city:"
        name="city"
        type="text"
        size="large"
        v-model="city"
        :required="false"
      />
    </div>
  </div>
</template>

<style scoped>
.group {
  display: flex;
  flex-direction: row;
  gap: 12px;
}
</style>
