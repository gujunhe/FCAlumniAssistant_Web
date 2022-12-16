<template>
  <a-layout-header class="header" v-show="user.id">
    <img class="logo" src="../assets/icon.png">
    <div class="title">福州大学计算机学院院庆后台管理系统</div>
    <a-menu
      theme="dark"
      mode="horizontal"

      :style="{ lineHeight: '64px' }"
    >

      <a-menu-item key="/" >
        <router-link to="/">校友管理</router-link>
      </a-menu-item>
      <a-menu-item key="/admin/map" >
        <router-link to="/admin/map">校园地图管理</router-link>
      </a-menu-item>
      <a-menu-item key="/admin/question" >
        <router-link to="/admin/question">答题管理</router-link>
      </a-menu-item>
      <a-menu-item key="/admin/bless">
        <router-link to="/admin/bless">祝福语管理</router-link>
      </a-menu-item>
<!--      <a-menu-item key="/admin/alumnus">-->
<!--        <router-link to="/admin/alumnus">校友风采管理</router-link>-->
<!--      </a-menu-item>-->

      <a-menu-item key="/admin/donation">
        <router-link to="/admin/donation">捐款管理</router-link>
      </a-menu-item>
      <a-popconfirm
          title="确认退出登录?"
          ok-text="是"
          cancel-text="否"
          @confirm="logout()"
      >
        <a class="login-menu" v-show="user.id">
          <span>退出登录</span>
        </a>
      </a-popconfirm>

    </a-menu>

  </a-layout-header>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import store from "@/store";
  import  axios from "axios"
  import "vue-router/dist/vue-router";
  import router from "@/router";

  declare let hexMd5: any;
  declare let KEY: any;

  export default defineComponent({
    name: 'the-header',

    setup: function () {
      // 登录后保存
      const user = computed(() => store.state.user);
      // 退出登录
      const logout = () => {
        console.log("退出登录开始");
        //   axios.get('/user/logout/' + user.value.token).then((response) => {
        //     const data = response.data;
        //     if (data.success) {
        //       message.success("退出登录成功！");
        //       store.commit("setUser", {});
        //     } else {
        //       message.error(data.message);
        //     }
        //   });
        // };
        message.success("退出登录成功！");
        store.commit("setUser", {});
        router.replace('/login')
      }
      return {
        user,
        logout
      }
    }

  });
</script>

<style>
  .title {

    height: 31px;
    /*background: rgba(255, 255, 255, 0.2);*/
    margin: 16px 28px 16px 0;
    float: left;
    color: white;
    font-size: 18px;
  }
  .logo{
    height: 50px;
  margin-top: 7px;
    float: left;
    margin-left: 15px;


  }

  .login-menu {
    float: right;
    color: white;
    padding-right: 30px;
  }
</style>
