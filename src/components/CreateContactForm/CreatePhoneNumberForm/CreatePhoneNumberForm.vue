<script setup lang="ts">
import { computed, ref } from 'vue';
import { FormInput } from '../../common';

const phoneNumber = ref('');
</script>

<template>
  <div>
    <FormInput
      label="phone number:"
      name="phoneNumber"
      type="text"
      v-model="phoneNumber"
      :required="false"
    />
  </div>
</template>

<style scoped></style>
