<template>
  <a-table
    :columns="columns"
    :row-key="record => record.id"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    size="small"
    @change="handleTableChange"
  >
    <template #action="{ record }">
      <a-row :gutter="8">
        <a-col>
          <a-tooltip placement="top" title="重新设置信息推送时间">
            <a-button type="primary" size="small" @click="edit(record)">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </a-button>
          </a-tooltip>
        </a-col>
        <a-col>
          <a-popconfirm placement="leftBottom" ok-text="Yes" cancel-text="No" @confirm="handCancel(record.id)">
            <template #title>
              <p>确定要取消订阅该条信息吗？</p>
            </template>
            <a-tooltip placement="top" title="取消订阅">
              <a-button type="danger" size="small">
                <i class="fa fa-times-circle" aria-hidden="true"></i>
              </a-button>
            </a-tooltip>
          </a-popconfirm>
        </a-col>
      </a-row>
    </template>
  </a-table>
  <a-modal
    :title="'重新设置信息推送时间——'+infoTitle"
    v-model:visible="resetVisible"
    :confirm-loading="confirmResetLoading"
    @ok="handOk"
  >
    <a-form :model="subscribeForm">
      <a-form-item label="推送时间">
        <a-radio-group v-model:value="cronModel" button-style="solid" size="small">
          <a-radio-button value="day">每天</a-radio-button>
          <a-radio-button value="cron">高级</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item v-if="cronModel==='day'" label="请选择时间">
        <a-time-picker v-model:value="pushTime" format="HH:mm"/>
      </a-form-item>
      <a-form-item v-if="cronModel==='cron'" label="cron表达式">
        <a-input :value="subscribeForm.cron" placeholder="请输入cron表达式"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { cancel, list, update } from '@/api/subscription'
import { message } from 'ant-design-vue'

const columns = [
  {
    title: '信息标题',
    dataIndex: 'title',
    width: '20%'
  },
  {
    title: '信息描述',
    dataIndex: 'description'
  },
  {
    title: '推送时间(cron表达式)',
    dataIndex: 'cron'
  },
  {
    title: '订阅时间',
    dataIndex: 'time'
  },
  {
    title: '操作',
    slots: { customRender: 'action' }
  }
]

export default {
  name: 'Subscription',
  setup () {
    const state = reactive({
      dataSource: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      loading: false,
      resetVisible: false,
      infoTitle: '',
      subscribeForm: {
        id: '',
        cron: ''
      },
      cronModel: 'day',
      pushTime: '',
      confirmResetLoading: false
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
    const edit = item => {
      state.resetVisible = true
      state.infoTitle = item.title
      state.subscribeForm.id = item.id
      state.subscribeForm.cron = item.cron
    }
    const handOk = () => {
      if (state.cronModel === 'day') {
        state.subscribeForm.cron = '* ' + state.pushTime.format('m H') + ' * * ? *'
      }
      state.confirmSubscriptionLoading = true
      update(state.subscribeForm).then(rep => {
        state.confirmSubscriptionLoading = false
        state.resetVisible = false
        message.success(rep)
        getList()
      })
    }
    const handCancel = id => {
      cancel({ id: id }).then(rep => {
        message.success(rep)
        getList()
      })
    }
    return {
      columns,
      edit,
      handCancel,
      handOk,
      handleTableChange,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>

</style>
