<template>
  <a-table
    :columns="columns"
    :row-key="record => record.type+record.id"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    size="small"
    @change="handleTableChange"
    bordered
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
    <template #action="{ record }">
      <a-row :gutter="8">
        <a-col>
          <a-tooltip placement="top" title="查看任务执行日志">
            <a-button type="primary" size="small" @click="showLog({type:record.type,id:record.id},record.title)">
              <i class="fa fa-file-text-o" aria-hidden="true"></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <a-col v-if="record.online === 0">
          <a-tooltip placement="top" title="上线任务">
            <a-button type="primary" style="background-color:#009688"
                      size="small"
                      @click="handOnline({type:record.type,id:record.id})">
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <a-col v-else>
          <a-popconfirm placement="leftBottom" ok-text="Yes" cancel-text="No"
                        @confirm="handOffline({type:record.type,id:record.id})">
            <template #title>
              <p>确定要下线该任务吗？</p>
            </template>
            <a-tooltip placement="top" title="下线任务">
              <a-button type="danger" size="small">
                <i class="fa fa-arrow-down" aria-hidden="true"></i>
              </a-button>
            </a-tooltip>
          </a-popconfirm>
        </a-col>
      </a-row>
    </template>
  </a-table>
  <a-modal v-model:visible="logVisible" :title="logTitle" :footer="null" width="800px" :bodyStyle={padding:0}>
    <a-table
      :columns="logColumns"
      :row-key="record => record.id"
      :data-source="logDataSource"
      :pagination="logPagination"
      :loading="logLoading"
      size="small"
      @change="handleLogTableChange"
    >
      <template #jobStatus="{ record }">
        <span v-if="record.jobStatus===0">发起</span>
        <span v-else-if="record.jobStatus===1">成功</span>
        <span v-else-if="record.jobStatus===2">失败</span>
        <span v-else>{{ record.jobStatus }}</span>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { list, log, offline, online } from '../../api/task'
import { message } from 'ant-design-vue'

const logColumns = [
  {
    title: '任务ID',
    dataIndex: 'id'
  },
  {
    title: '任务执行时间',
    dataIndex: 'createTime'
  },
  {
    title: '任务执行状态',
    slots: { customRender: 'jobStatus' }
  },
  {
    title: '任务执行信息',
    dataIndex: 'description'
  }
]

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
      loading: false,
      logDataSource: [],
      logPagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      logLoading: false,
      logVisible: false,
      logTitle: '',
      task: {
        groupName: '',
        jobName: ''
      }
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
    const getLogList = () => {
      state.logLoading = true
      log({
        page: state.logPagination.current,
        size: state.logPagination.pageSize,
        groupName: state.task.groupName,
        jobName: state.task.jobName
      }).then(data => {
        state.logDataSource = data.records
        state.logPagination.total = data.total
      }).finally(() => {
        state.logLoading = false
      })
    }
    getList()
    const handleTableChange = (pag) => {
      state.pagination = pag
      getList()
    }
    const handleLogTableChange = (pag) => {
      state.logPagination = pag
      getLogList()
    }
    const handOffline = item => {
      offline(item).then(rep => {
        message.success(rep)
        getList()
      })
    }
    const handOnline = item => {
      online(item).then(rep => {
        message.success(rep)
        getList()
      })
    }
    const showLog = (item, title) => {
      state.logTitle = item.type + '_' + title + '_执行日志'
      state.task.groupName = item.type
      state.task.jobName = item.id
      getLogList()
      state.logVisible = true
    }
    return {
      showLog,
      handOnline,
      handOffline,
      columns,
      logColumns,
      handleTableChange,
      handleLogTableChange,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>

</style>
