<template>
  <a-table
    :columns="columns"
    :row-key="record => record.type+record.id"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    size="small"
    @change="handleTableChange"
  >
    <template #type="{ record }">
      <span v-if="record.type==='send'">信息发送</span>
      <span v-else-if="record.type==='find'">信息获取</span>
      <span v-else>{{ record.type }}</span>
    </template>
    <template #online="{ record }">
      <span v-if="record.online===0">未上线</span>
      <span v-else>已上线</span>
    </template>
    <template>
      <a-row :gutter="8">
        <a-col>
          <a-tooltip placement="top" title="重新设置信息推送时间">
            <a-button type="primary" size="small">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <a-col>
          <a-tooltip placement="top" title="取消订阅">
            <a-button type="danger" size="small">
              <i class="fa fa-times-circle" aria-hidden="true"></i>
            </a-button>
          </a-tooltip>
        </a-col>
      </a-row>
    </template>
  </a-table>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { list } from '../../api/task'

const columns = [
  {
    title: '任务类型',
    slots: { customRender: 'type' }
  },
  {
    title: '任务对应信息标题',
    dataIndex: 'title'
  },
  {
    title: '任务执行时间(cron表达式)',
    dataIndex: 'cron'
  },
  {
    title: '任务状态',
    slots: { customRender: 'online' }
  },
  {
    title: '任务已执行次数',
    dataIndex: 'cnt'
  },
  {
    title: '操作',
    slots: { customRender: 'action' }
  }
]

export default {
  name: 'TaskManage',
  setup () {
    const state = reactive({
      dataSource: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      loading: false
    })
    const getList = () => {
      state.loading = true
      list({
        page: state.pagination.current,
        size: state.pagination.pageSize
      }).then(data => {
        state.dataSource = data.list
        state.pagination.total = data.total
      }).finally(() => {
        state.loading = false
      })
    }
    getList(state.pagination)
    const handleTableChange = (pag) => {
      state.pagination = pag
      getList()
    }
    return {
      columns,
      handleTableChange,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>

</style>
