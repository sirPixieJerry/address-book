<script setup lang="ts">
import { computed, ref } from 'vue';
import { FormHelperText, FormInput, SubmitButton } from '../common';
import { IconLogin } from '../icons';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');

const router = useRouter();

const isDisabled = computed(() => {
  return username.value === '' || password.value === '';
});

const isUserNameOrPasswordInvalid = false;

const onSubmit = (event: Event) => {
  event.preventDefault();
  router.push('/contact-list');
};
</script>

<template>
  <div>
    <form action="">
      <FormInput
        v-model="username"
        label="Benutzername"
        name="username"
        type="text"
      />
      <FormInput
        v-model="password"
        label="Passwort"
        name="password"
        type="password"
      />
      <FormHelperText
        v-if="isUserNameOrPasswordInvalid"
        text="I am important!"
      />
      <SubmitButton
        aria-label="anmelden"
        label="anmelden"
        :disabled="isDisabled"
        :icon="IconLogin"
        @click="onSubmit"
      />
    </form>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
