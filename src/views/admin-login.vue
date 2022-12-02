<template>
  <div id="building" v-show="!user.id">
    <div  class="title">     <img style="height: 120px;width: 90px" src="../assets/icon.png">福州大学计算机学院后台管理系统</div>


      <a-form class="main" :model="loginUser" >
        <a-form-item >
          <a-input placeholder="账号" v-model:value="loginUser.admin"   style="width: 400px;height: 40px">
            <template #prefix>
              <user-outlined type="user" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item  >
          <a-input-password placeholder="密码" v-model:value="loginUser.password" style="width: 400px;height: 40px">
            <template #prefix>
              <LockOutlined />
            </template>
          </a-input-password>
        </a-form-item>
        <a-button type="primary" style="width: 400px;height: 40px" @click="login">登陆</a-button>

      </a-form>



  </div>

<!--  <a-button type="primary">Primary Button</a-button>-->
</template>

<script>

import { defineComponent, onMounted, ref,computed } from 'vue';
import { UserOutlined, InfoCircleOutlined,HomeOutlined,LockOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
import store from "@/store";
export default defineComponent({
  components: {
    UserOutlined,
    InfoCircleOutlined,
    HomeOutlined,
    LockOutlined
  },
  name: "Login",
  setup()
  {
    // 登录后保存
    const user = computed(() => store.state.user);

    // 用来登录
    const loginUser = ref({
      admin:"",
      password: ""
    });
    const modalVisible = ref(true);
    const modalLoading = ref(false);
    const handleModalOk = () => {
      modalLoading.value = true;



      axios.post("/admin/login", user.value).then((response) => {
        modalLoading.value = false;
        const data = response.data; // data = commonResp
        if (data.success) {
          modalVisible.value = false;
          store.commit("setUser", data.content);
        } else {
          message.error(data.message);
        }
      });
    };
    // 登录
    const login = () => {
      console.log("开始登录");
      axios.post('/admin/login', loginUser.value).then((response) => {

        const data = response.data;
        if (data.success) {
          message.success("登录成功！");

          store.commit("setUser", {id:loginUser.value.admin});
        } else {
          message.error(data.message);
        }
      });
    };


    return{
      modalVisible,
      loginUser,
      modalLoading,
      handleModalOk,
      login,

      user
    }
  }

})
</script>

<style scoped>
#building{

  width: 100%;
  height: 100vh;
  background: url("../assets/back.png") center center no-repeat;
  background-size: 100% 100%;
  position:absolute;

}
.login-form {
  width: 565px;
  height: 372px;
  margin: 0 auto;
  /*background: url("../assets/houTaiKuang.png");*/
  padding: 40px 110px;
}
.main{
  text-align: center;

  border-radius: 20px;
  width: 300px;
  height: 350px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.title{
  text-align: center;

  border-radius: 20px;
  width: 600px;
  height: 350px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 75px;
  right: 0;
  bottom: 720px;
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  /*background: url("../assets/houTaiBg.png");*/
}

/* Log */
.login-title {
  color: #fff;
  text-align: center;
  margin: 150px 0;
  font-size: 48px;
  font-family: Microsoft Yahei;
}
/* 登陆按钮 */
.submit{
  width: 100%;
  height: 45px;
  font-size: 16px;
}
/* 用户登陆标题 */
.title{
  margin-bottom: 50px;
  color: black;
  font-weight: 700;
  font-size: 24px;
  font-family: Microsoft Yahei;
}
/* 输入框 */
.inputBox{
  height: 45px;
}
/* 输入框内左边距50px */
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
}

</style>