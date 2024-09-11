<script setup lang="ts">
import { LoginForm } from '../components';
</script>

<template>
  <div class="login-root">
    <LoginForm />
  </div>
</template>

<style scoped>
.login-root {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  place-items: center;
}
</style>
