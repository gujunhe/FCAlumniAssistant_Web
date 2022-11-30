<template>
  <a-layout class="layout">
    <the-header></the-header>
    <router-view/>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheHeader from '@/components/the-header.vue';
export default defineComponent({
  components: {
    TheHeader,

  },
});
</script>

