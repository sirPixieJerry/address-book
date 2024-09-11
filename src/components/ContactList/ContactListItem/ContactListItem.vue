<script setup lang="ts">
import { ref } from 'vue';
import { ContactAvatar } from '../ContactAvatar';
import type { ContactType } from '../types';
import { ContactCard } from '../ContactCard';

const props = defineProps<{
  contact: ContactType;
}>();

const dialogRef = ref<null | HTMLDialogElement>(null);

const openDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.showModal();
  }
};

const closeDialog = () => {
  if (dialogRef.value) {
    dialogRef.value.close();
  }
};

const { firstName, lastName } = props.contact;
</script>

<template>
  <li>
    <button @click="openDialog">
      <ContactAvatar :first-name :last-name />
      <p>{{ `${firstName} ${lastName}` }}</p>
    </button>
  </li>
  <dialog ref="dialogRef">
    <ContactCard ref="contactCardRef" :close-dialog="closeDialog" :contact />
  </dialog>
</template>

<style scoped>
@import '../../../assets/base.css';

button {
  background-color: transparent;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  cursor: pointer;
  padding: 6px 0px;
  color: var(--color-heading);
}

button:hover {
  background-color: var(--link-hover);
}

dialog {
  margin: auto;
  border: none;
  background-color: transparent;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>
