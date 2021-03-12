<template>
  <a-table
    :columns="columns"
    :row-key="record => record.id"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    size="small"
    @change="handleTableChange"
    bordered
  >
    <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`搜索 ${column.title}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon>
            <SearchOutlined/>
          </template>
          搜索
        </a-button>
        <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
          重置
        </a-button>
      </div>
    </template>
    <template #filterIcon="filtered">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }"/>
    </template>
  </a-table>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { list } from '../../api/info'
import { SearchOutlined } from '@ant-design/icons-vue'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '信息标题',
    dataIndex: 'title',
    slots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon'
    }
  },
  {
    title: '信息描述',
    dataIndex: 'description'
  },
  {
    title: '定义',
    dataIndex: 'description'
  },
  {
    title: '数据获取时间（cron表达式）',
    dataIndex: 'updateCron'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    slots: { customRender: 'action' }
  }
]
export default {
  name: 'InfoManage',
  setup () {
    const state = reactive({
      dataSource: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      loading: false,
      searchText: '',
      searchedColumn: ''
    })
    const getList = () => {
      state.loading = true
      list(
        {
          page: state.pagination.page,
          size: state.pagination.size
        },
        JSON.parse('{"' + state.searchedColumn + '":"' + state.searchText + '"}')
      ).then(data => {
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
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm()
      state.searchText = selectedKeys[0]
      state.searchedColumn = dataIndex
      getList()
    }

    const handleReset = clearFilters => {
      clearFilters()
      state.searchText = ''
      state.searchedColumn = ''
      getList()
    }

    return {
      columns,
      handleTableChange,
      SearchOutlined,
      handleSearch,
      handleReset,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>

</style>
