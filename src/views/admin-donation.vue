<template>
  <a-layout>
    <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
    >
      <p>
        <a-form layout="inline" :model="param">
          <a-form-item>
            <a-button type="primary" @click="add()">
              新增
            </a-button>
          </a-form-item>
        </a-form>
      </p>
      <a-table
          :columns="columns"
          :row-key="record => record.id"
          :data-source="donations"
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
      title="捐款表单"
      v-model:visible="modalVisible"
      :confirm-loading="modalLoading"
      @ok="handleModalOk"
  >
    <a-form :model="donation" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="id">
        <a-input v-model:value="donation.id" />
      </a-form-item>
      <a-form-item label="捐款标题">
        <a-input v-model:value="donation.name" />
      </a-form-item>
      <a-form-item label="介绍" >
        <a-input v-model:value="donation.introduction" />
      </a-form-item>
      <a-form-item label="所需积分">
        <a-input v-model:value="donation.need" />
      </a-form-item>
      <a-form-item label="当前积分">
        <a-input v-model:value="donation.had" />
      </a-form-item>
      <a-form-item label="进度">
        <a-input v-model:value="donation.prog" />
      </a-form-item>
      <a-form-item label="图片">
        <a-input v-model:value="donation.picture" />
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
  name: 'Donation',
  setup() {
    const param = ref();
    param.value = {};
    const donations = ref();
    const pagination = ref({
      current: 1,
      pageSize: 10,
      total: 0
    });
    const loading = ref(false);

    const columns = [
      {
        title: 'Id',
        dataIndex: 'id'
      },
      {
        title: '捐款标题',
        dataIndex: 'name'
      },
      {
        title: '介绍',
        dataIndex: 'introduction'
      },
      {
        title:'所需积分',
        dataIndex:'need'
      },
      {
        title:'当前积分',
        dataIndex:'had'
      },
      {
        title:'进度',
        dataIndex:'prog'
      },
      {
        title:'图片',
        dataIndex:'picture'
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
      donations.value = [];
      axios.get("/donation/page", {
        params: {
          pageNum: params.page,
          pageSize: params.size,
          name: ""
        }
      }).then((response) => {
        loading.value = false;
        const data = response.data;
        if (data.success) {
          donations.value = data.content.data;

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
    const donation = ref();
    const modalVisible = ref(false);
    const modalLoading = ref(false);
    const handleModalOk = () => {
      modalLoading.value = true;



      axios.post("/user/save", donation.value).then((response) => {
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
      donation.value = Tool.copy(record);
    };

    /**
     * 新增
     */
    const add = () => {
      modalVisible.value = true;
      donation.value = {};
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




    onMounted(() => {
      handleQuery({
        page: 1,
        size: pagination.value.pageSize,
      });
    });

    return {
      param,
      donations,
      pagination,
      columns,
      loading,
      handleTableChange,
      handleQuery,

      edit,
      add,

      donation,
      modalVisible,
      modalLoading,
      handleModalOk,

      handleDelete,


    }
  }
});
</script>

<style scoped>

</style>