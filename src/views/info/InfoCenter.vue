<template>
  <a-spin :spinning="loading">
    <div>
      <a-input-search class="input-search"
                      v-model:value="keyword"
                      placeholder="请输入标题或描述信息"
                      enter-button
                      @search="onChange(1,10)"
      />
    </div>
    <div>
      <a-row :gutter="[36,16]">
        <a-col v-for="(item,index) in infoDefineList" :key="index">
          <a-card hoverable style="width: 200px" bodyStyle="padding: 10px 10px 5px" @click="sayHello">
            <template #cover>
              <img
                alt="cover"
                :src="item.image"
              />
            </template>
            <div>
              <h3>{{ item.title }}</h3>
              <div class="description">{{ item.description }}</div>
            </div>
            <a-row type="flex" justify="end">
              <a-col v-if="item.concerned">
                <a-popconfirm placement="leftBottom" ok-text="Yes" cancel-text="No"
                              @confirm="handCancel(item.subscriptionId)">
                  <template #title>
                    <p>确定要取消订阅该条信息吗？</p>
                  </template>
                  <a-button class="heart w-20" type="link" @click.stop>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                  </a-button>
                </a-popconfirm>
              </a-col>
              <a-col v-else>
                <a-tooltip placement="topLeft" title="订阅">
                  <a-button class="heart w-20" type="link" @click.stop="showSubscription(item)">
                    <i class="fa fa-heart-o" aria-hidden="true"></i>
                  </a-button>
                </a-tooltip>
              </a-col>
              <a-col>
                <a-tooltip placement="topLeft" title="详情" @click.stop="sayHello">
                  <a-button class="detail w-20" type="link"><i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                  </a-button>
                </a-tooltip>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <div>
      <a-pagination class="pagination"
                    :showTotal="() => '共 '+ total +' 条'"
                    @change="onChange"
                    @showSizeChange="onChange"
                    :total="total"
                    showSizeChanger/>
    </div>
  </a-spin>
  <a-modal
    :title="'订阅——'+infoTitle"
    v-model:visible="subscriptionVisible"
    :confirm-loading="confirmSubscriptionLoading"
    @ok="handSubscribe"
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
        <a-input v-model:value="subscribeForm.cron" placeholder="请输入cron表达式"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>

import { reactive, toRefs } from 'vue'
import { subscribe, cancel } from '@/api/subscription'
import { message } from 'ant-design-vue'
import { listWithSubInfo } from '@/api/info'

export default {
  name: 'InfoCenter',
  setup () {
    const state = reactive({
      infoDefineList: [],
      total: 0,
      keyword: '',
      loading: false,
      subscriptionVisible: false,
      confirmSubscriptionLoading: false,
      infoTitle: '',
      subscribeForm: {
        id: '',
        cron: ''
      },
      cronModel: 'day',
      pushTime: '',
      curr: {
        page: 1,
        size: 10
      }
    })
    const getInfoDefineList = () => {
      state.loading = true
      listWithSubInfo({
        page: state.curr.page,
        size: state.curr.size,
        keyword: state.keyword
      }).then(data => {
        state.infoDefineList = data.list
        state.total = data.total
      }).finally(() => {
        state.loading = false
      })
    }
    getInfoDefineList()
    const onChange = (page, pageSize) => {
      state.curr.page = page
      state.curr.size = pageSize
      getInfoDefineList()
    }
    const handSubscribe = () => {
      if (state.cronModel === 'day') {
        state.subscribeForm.cron = '0 ' + state.pushTime.format('m H') + ' * * ? *'
      }
      state.confirmSubscriptionLoading = true
      subscribe(state.subscribeForm).then(rep => {
        getInfoDefineList()
        message.success(rep)
        state.subscriptionVisible = false
      }).finally(() => {
        state.confirmSubscriptionLoading = false
      })
    }
    const sayHello = () => {
      alert('hello')
    }
    const showSubscription = (item) => {
      state.infoTitle = item.title
      state.subscribeForm.id = item.id
      state.subscriptionVisible = true
    }
    const handCancel = id => {
      cancel({ id: id }).then(rep => {
        message.success(rep)
        getInfoDefineList()
      })
    }
    return {
      showSubscription,
      handSubscribe,
      sayHello,
      onChange,
      handCancel,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 20px;
}

.input-search {
  margin-bottom: 20px;
  width: 300px;
}

.w-20 {
  width: 20px;
}

.heart {
  color: red;
}

.detail {
  color: grey;
}
</style>
