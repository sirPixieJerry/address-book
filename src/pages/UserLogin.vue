<script setup lang="ts">
import SubmitButton from '../components/common/SubmitButton';
import FormInput from '../components/common/FormInput';
</script>

<template>
  <div>
    <form action="">
      <FormInput label="Username:" name="username" type="text" />
      <FormInput label="Password:" name="password" type="password" />
      <SubmitButton label="login" />
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
