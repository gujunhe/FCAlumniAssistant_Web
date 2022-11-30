<template>
<a-layout>
<a-layout-content
    :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
>
  <p>
    <a-form layout="inline" :model="param">
      <a-form-item>
        <a-input v-model:value="param.loginName" placeholder="登陆名">
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleQuery({page: 1, size: pagination.pageSize})">
          查询
        </a-button>
      </a-form-item>
    </a-form>
  </p>
  <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="users"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
  >
    <template v-slot:action="{ text, record }">
      <a-space size="small">
        <a-button type="primary" @click="edit(record)">
          编辑
        </a-button>
        <a-popconfirm
            title="删除后不可恢复，确认删除?"
            ok-text="是"
            cancel-text="否"
            @confirm="handleDelete(record.id)"
        >
          <a-button type="danger">
            删除
          </a-button>
        </a-popconfirm>
      </a-space>
    </template>
  </a-table>
</a-layout-content>
</a-layout>

<a-modal
    title="用户表单"
    v-model:visible="modalVisible"
    :confirm-loading="modalLoading"
    @ok="handleModalOk"
>
<a-form :model="user" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
  <a-form-item label="openid">
    <a-input v-model:value="user.openid" :disabled="!!user.openid"/>
  </a-form-item>
  <a-form-item label="姓名">
    <a-input v-model:value="user.name" />
  </a-form-item>
  <a-form-item label="室友">
    <a-input v-model:value="user.roommatename" />
  </a-form-item>
  <a-form-item label="电话号" v-show="user.phonenumber">
    <a-input v-model:value="user.phonenumber" />
  </a-form-item>
  <a-form-item label="毕业年份" v-show="user.graduationtime">
    <a-input v-model:value="user.graduationtime" />
  </a-form-item>
  <a-form-item label="专业" v-show="user.major">
    <a-input v-model:value="user.major" />
  </a-form-item>
  <a-form-item label="班级" v-show="user.banji">
    <a-input v-model:value="user.banji" />
  </a-form-item>
  <a-form-item label="部门" v-show="user.department">
    <a-input v-model:value="user.department"/>
  </a-form-item>
</a-form>
</a-modal>

<a-modal
    title="重置密码"
    v-model:visible="resetModalVisible"
    :confirm-loading="resetModalLoading"
    @ok="handleResetModalOk"
>
<a-form :model="user" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
  <a-form-item label="新密码">
    <a-input v-model:value="user.password" type="password"/>
  </a-form-item>
</a-form>
</a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
import {Tool} from "@/util/tool";
declare let hexMd5: any;
declare let KEY: any;


export default defineComponent({
  name: 'User',
  setup() {
    const param = ref();
    param.value = {};
    const users = ref();
    const pagination = ref({
      current: 1,
      pageSize: 10,
      total: 0
    });
    const loading = ref(false);

    const columns = [
      {
        title: 'openid',
        dataIndex: 'openid'
      },
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '室友',
        dataIndex: 'roommatename'
      },
      {
        title: '电话号',
        dataIndex: 'phonenumber'
      },
      {
        title: '毕业年份',
        dataIndex: 'graduationtime'
      },
      {
        title: '专业',
        dataIndex: 'major'
      },
      {
        title: '班级',
        dataIndex: 'banji'
      },
      {
        title: '部门',
        dataIndex: 'department'
      },
      {
        title: 'Action',
        key: 'action',
        slots: { customRender: 'action' }
      }
    ];

    /**
     * 数据查询
     **/
    const handleQuery = (params: any) => {
      loading.value = true;
      // 如果不清空现有数据，则编辑保存重新加载数据后，再点编辑，则列表显示的还是编辑前的数据
      users.value = [];
      axios.get("/certified/page", {
        params: {
          pageNum: params.page,
          pageSize: params.size,
          name:"",
          roommateName:"",
          phonenumber:"",
          graduationTime:"",
          major:"",
          banji:"",
          department:""
        }
      }).then((response) => {
        loading.value = false;
        const data = response.data;
        if (data.success) {
          users.value = data.content.data;

          // 重置分页按钮
          pagination.value.current = params.page;
          pagination.value.total = data.content.total;
        } else {
          message.error(data.message);
        }
      });
    };

    /**
     * 表格点击页码时触发
     */
    const handleTableChange = (pagination: any) => {
      console.log("看看自带的分页参数都有啥：" + pagination);
      handleQuery({
        page: pagination.current,
        size: pagination.pageSize
      });
    };

    // -------- 表单 ---------
    const user = ref();
    const modalVisible = ref(false);
    const modalLoading = ref(false);
    const handleModalOk = () => {
      modalLoading.value = true;

      user.value.password = hexMd5(user.value.password + KEY);

      axios.post("/user/save", user.value).then((response) => {
        modalLoading.value = false;
        const data = response.data; // data = commonResp
        if (data.success) {
          modalVisible.value = false;

          // 重新加载列表
          handleQuery({
            page: pagination.value.current,
            size: pagination.value.pageSize,
          });
        } else {
          message.error(data.message);
        }
      });
    };

    /**
     * 编辑
     */
    const edit = (record: any) => {
      modalVisible.value = true;
      user.value = Tool.copy(record);
    };


    const handleDelete = (id: number) => {
      axios.delete("/user/delete/" + id).then((response) => {
        const data = response.data; // data = commonResp
        if (data.success) {
          // 重新加载列表
          handleQuery({
            page: pagination.value.current,
            size: pagination.value.pageSize,
          });
        } else {
          message.error(data.message);
        }
      });
    };

    // -------- 重置密码 ---------
    const resetModalVisible = ref(false);
    const resetModalLoading = ref(false);
    const handleResetModalOk = () => {
      resetModalLoading.value = true;

      user.value.password = hexMd5(user.value.password + KEY);

      axios.post("/user/reset-password", user.value).then((response) => {
        resetModalLoading.value = false;
        const data = response.data; // data = commonResp
        if (data.success) {
          resetModalVisible.value = false;

          // 重新加载列表
          handleQuery({
            page: pagination.value.current,
            size: pagination.value.pageSize,
          });
        } else {
          message.error(data.message);
        }
      });
    };

    /**
     * 重置密码
     */
    const resetPassword = (record: any) => {
      resetModalVisible.value = true;
      user.value = Tool.copy(record);
      user.value.password = null;
    };

    onMounted(() => {
      handleQuery({
        page: 1,
        size: pagination.value.pageSize,
      });
    });

    return {
      param,
      users,
      pagination,
      columns,
      loading,
      handleTableChange,
      handleQuery,

      edit,


      user,
      modalVisible,
      modalLoading,
      handleModalOk,

      handleDelete,

      resetModalVisible,
      resetModalLoading,
      handleResetModalOk,
      resetPassword
    }
  }
});
</script>

<style scoped>

</style>