<script setup lang="ts">
import { computed, ref } from 'vue';
import { FormInput, SubmitButton } from '../components';

const username = ref('');
const password = ref('');

const isDisabled = computed(() => {
  return username.value === '' || password.value === '';
});

const onSubmit = (event: Event) => {
  event.preventDefault();
  console.log(
    'Form submitted with Username:',
    username.value,
    'Password:',
    password.value
  );
};
</script>

<template>
  <div>
    <form action="">
      <FormInput
        label="Username:"
        name="username"
        type="text"
        v-model="username"
        :required="true"
      />
      <FormInput
        label="Password:"
        name="password"
        type="password"
        v-model="password"
        :required="true"
      />
      <SubmitButton label="login" :disabled="isDisabled" />
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
}
</style>
