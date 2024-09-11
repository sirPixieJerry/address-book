<script setup lang="ts">
import { IconButton } from '../../common';
import {
  IconClose,
  IconHomeWork,
  IconEmail,
  IconLocalPhone,
} from '../../icons';
import { ContactAvatar } from '../ContactAvatar';
import { ContactCardItem } from '../ContactCardItem';
import type { ContactType } from '../types';

const props = defineProps<{
  closeDialog: () => void;
  contact: ContactType;
}>();

const { addresses, email, firstName, lastName, phoneNumbers } = props.contact;
</script>

<template>
  <div class="card-root">
    <div class="button-wrapper">
      <IconButton :icon="IconClose" @click="closeDialog" />
    </div>

    <div class="avatar-wrapper">
      <ContactAvatar :first-name :last-name size="large" />
    </div>
    <h3 class="contact-name">{{ `${firstName} ${lastName}` }}</h3>
    <hr />

    <div class="list-item-wrapper">
      <ContactCardItem :icon="IconEmail" :index="0">
        <a :href="'mailto:' + email" class="email">{{ email }}</a>
      </ContactCardItem>

      <template v-if="addresses.length">
        <div>
          <ContactCardItem
            v-for="(address, index) in addresses"
            :key="index"
            :icon="IconHomeWork"
            :index
          >
            <address class="address">
              {{ `${address.streetName} ${address.streetNumber}` }}<br />
              {{ `${address.zipCode} ${address.city}` }}
            </address>
          </ContactCardItem>
        </div>
      </template>

      <template v-if="phoneNumbers.length">
        <div>
          <ContactCardItem
            v-for="(phoneNumber, index) in phoneNumbers"
            :key="index"
            :icon="IconLocalPhone"
            :index
          >
            <a :href="'tel:' + phoneNumber.phoneNumber">
              {{ phoneNumber.phoneNumber }}
            </a>
          </ContactCardItem>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.address {
  font-style: normal;
  padding: 3px;
}

.card-root {
  background-color: #181818;
  border-radius: 12px;
  padding: 16px;
  color: white;
  fill: white;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
}

.contact-name {
  text-align: center;
  padding: 8px;
}

hr {
  margin-bottom: 16px;
}

.list-item-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 480px) {
  .card-root {
    min-width: 280px;
  }
}
</style>
