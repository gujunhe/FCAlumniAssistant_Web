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
          :data-source="questions"
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
      title="问题表单"
      v-model:visible="modalVisible"
      :confirm-loading="modalLoading"
      @ok="handleModalOk"
  >
    <a-form :model="question" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="id">
        <a-input v-model:value="question.keyId" />
      </a-form-item>
      <a-form-item label="问题">
        <a-input v-model:value="question.question" />
      </a-form-item>
      <a-form-item label="正确选项" >
        <a-input v-model:value="question.correct" />
      </a-form-item>
      <a-form-item label="A选项" >
        <a-input v-model:value="question.a" />
      </a-form-item>
      <a-form-item label="B选项">
        <a-input v-model:value="question.b" />
      </a-form-item>
      <a-form-item label="C选项">
        <a-input v-model:value="question.c" />
      </a-form-item>
      <a-form-item label="D选项">
        <a-input v-model:value="question.d" />
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
  name: 'Question',
  setup() {
    const param = ref();
    param.value = {};
    const questions = ref();
    const pagination = ref({
      current: 1,
      pageSize: 10,
      total: 0
    });
    const loading = ref(false);

    const columns = [
      {
        title: 'Id',
        dataIndex: 'keyId'
      },
      {
        title: '问题',
        dataIndex: 'question'
      },
      {
        title: '正确选项',
        dataIndex: 'correct'
      },
      {
        title:'A选项',
        dataIndex:'a'
      },
      {
        title:'B选项',
        dataIndex:'b'
      },
      {
        title:'C选项',
        dataIndex:'c'
      },
      {
        title:'D选项',
        dataIndex:'d'
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
      questions.value = [];
      axios.get("/question/page", {
        params: {
          pageNum: params.page,
          pageSize: params.size,
          question: ""
        }
      }).then((response) => {
        loading.value = false;
        const data = response.data;
        if (data.success) {
          questions.value = data.content.data;

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
    const question = ref();
    const modalVisible = ref(false);
    const modalLoading = ref(false);
    const handleModalOk = () => {
      modalLoading.value = true;



      axios.post("/question/save", question.value).then((response) => {
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
      question.value = Tool.copy(record);
    };

    /**
     * 新增
     */
    const add = () => {
      modalVisible.value = true;
      question.value = {};
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
      questions,
      pagination,
      columns,
      loading,
      handleTableChange,
      handleQuery,

      edit,
      add,

      question,
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