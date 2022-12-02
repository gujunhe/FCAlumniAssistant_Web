<template>
  <a-layout class="layout" >
    <the-header ></the-header>
    <router-view />

  </a-layout>

</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import TheHeader from '@/components/the-header.vue';
import Login from './views/admin-login.vue'
import store from "@/store";
export default defineComponent({

  name: 'app',
  components: {
    TheHeader,
    Login,
    setup(){
      // 登录后保存
      const user = computed(() => store.state.user);


      return{
        user
      }
    }


  },
});
</script>

