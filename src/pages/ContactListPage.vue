<script setup lang="ts">
import { IconAdd, IconLogout } from '@/components/icons';
import {
  ContactList,
  CreateContactForm,
  IconButton,
  SubmitButton,
} from '../components';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const formDialogRef = ref<null | HTMLDialogElement>(null);

const handleLogout = (evt: Event) => {
  evt.preventDefault();
  router.push('/');
};
const openDialog = () => {
  if (formDialogRef.value) {
    formDialogRef.value.showModal();
  }
};

const closeDialog = () => {
  if (formDialogRef.value) {
    formDialogRef.value.close();
  }
};
</script>

<template>
  <header>
    <h1>Meine Kontakte</h1>
    <div class="menu">
      <SubmitButton
        label="Kontakt hinzufügen"
        :icon="IconAdd"
        @click="openDialog"
      />
      <IconButton :icon="IconLogout" @click="handleLogout" />
    </div>
  </header>

  <div class="contact-list-root">
    <ContactList />
  </div>
  <dialog ref="formDialogRef">
    <CreateContactForm ref="contactCardRef" :close-dialog="closeDialog" />
  </dialog>
</template>

<style scoped>
@import '../assets/base.css';

.contact-list-root {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

@media (min-width: 1024px) {
  h1 {
    opacity: 1;
  }
}

header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1rem;
}

.menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

dialog {
  margin: auto;
  border: none;
  background-color: var(--color-background);
  border-radius: 4px;
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>
