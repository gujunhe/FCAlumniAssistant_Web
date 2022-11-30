<template>
  <a-layout-header class="header">
    <img class="logo" src="../assets/icon.png">
    <div class="title">福州大学计算机学院院庆后台管理系统</div>
    <a-menu
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
    >
      <a-menu-item key="/">
        <router-link to="/">首页</router-link>
      </a-menu-item>
      <a-menu-item key="/admin/user" >
        <router-link to="/admin/user">校友管理</router-link>
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
      <a-menu-item key="/admin/alumnus">
        <router-link to="/admin/alumnus">校友风采管理</router-link>
      </a-menu-item>

      <a-menu-item key="/admin/donation">
        <router-link to="/admin/donation">捐款管理</router-link>
      </a-menu-item>

    </a-menu>

  </a-layout-header>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import store from "@/store";
  import  axios from "axios"

  declare let hexMd5: any;
  declare let KEY: any;

  export default defineComponent({
    name: 'the-header',

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


  }
  .login-menu {
    float: right;
    color: white;
    padding-left: 10px;
  }
</style>
