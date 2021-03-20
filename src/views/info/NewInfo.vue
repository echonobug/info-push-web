<template>
  <h3>信息定义</h3>
  <div>
    <a-form :model="infoDefineForm" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-divider orientation="left">基础信息</a-divider>
      <a-form-item label="标题">
        <a-input
          v-model:value="infoDefineForm.title"
          placeholder="请输入标题"
        />
      </a-form-item>
      <a-form-item label="描述">
        <a-textarea
          v-model:value="infoDefineForm.description"
          placeholder="信息描述"
          auto-size
        />
      </a-form-item>
      <a-form-item label="封面图片">
        <a-input
          v-model:value="infoDefineForm.image"
          placeholder="请输入图片url"
        />
      </a-form-item>
      <a-form-item label="数据更新时间">
        <a-row>
          <a-col :span="5">
            <a-radio-group v-model:value="cronModel" button-style="solid" size="small">
              <a-radio-button value="day">每天</a-radio-button>
              <a-radio-button value="cron">高级</a-radio-button>
            </a-radio-group>
          </a-col>
          <a-col :span="19">
            <div v-if="cronModel==='day'">
              <a-time-picker v-model:value="pushTime" format="HH:mm"/>
            </div>
            <div v-if="cronModel==='cron'">
              <a-input v-model:value="infoDefineForm.updateCron" placeholder="请输入cron表达式"/>
            </div>
          </a-col>
        </a-row>
      </a-form-item>
      <a-divider orientation="left">信息获取</a-divider>
      <div v-for="(item,index) in infoDefineForm.content.find" :key="index">
        <a-divider v-if="index>0"/>
        <a-form-item label="url">
          <a-input
            v-model:value="item.request.url"
            placeholder="请输入url"
          />
        </a-form-item>
        <a-form-item label="method">
          <a-radio-group v-model:value="item.request.method" button-style="solid" size="small">
            <a-radio-button value="get">GET</a-radio-button>
            <a-radio-button value="post">POST</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="header">
          <a-input
            v-model:value="item.request.header"
          />
        </a-form-item>
        <a-form-item label="cookies">
          <a-input
            v-model:value="item.request.cookies"
          />
        </a-form-item>
        <a-form-item label="js渲染">
          <a-switch checked-children="开" un-checked-children="关" v-model:checked="item.render"/>
        </a-form-item>
        <a-divider style="border-color: #7cb305" dashed/>
        <a-divider>内容提取</a-divider>
        <div v-for="(it,i) in item.parse" :key="i">
          <a-divider style="border-color: #7cb305" dashed v-if="i>0"/>
          <a-form-item label="解析器">
            <a-radio-group v-model:value="it.parser" button-style="solid" size="small">
              <a-radio-button value="XPath">XPath</a-radio-button>
              <a-radio-button value="JsonPath">JsonPath</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <div v-for="(it2,j) in it.content" :key="j">
            <a-divider orientation="left">解析字段 {{ j + 1 }}</a-divider>
            <a-form-item label="字段名">
              <a-input
                v-model:value="it2.fieldName"
                placeholder="请定义字段名"
              />
            </a-form-item>
            <a-form-item label="选择器">
              <a-input
                v-model:value="it2.selector"
                placeholder="请配置选择器"
              />
            </a-form-item>
            <a-row>
              <a-col :span="j===it.content.length-1?12:24" v-if="it.content.length>1">
                <a-button type="danger" block @click="delField(it.content,j)">删除字段</a-button>
              </a-col>
              <a-col :span="it.content.length===1?24:12" v-if="it.content.length-1===j">
                <a-button type="primary" block @click="addField(it.content)">添加字段</a-button>
              </a-col>
            </a-row>
          </div>
          <a-row>
            <a-col :span="i===item.parse.length-1?12:24" v-if="item.parse.length>1">
              <a-button type="danger" block @click="delParser(item.parse,i)">删除解析器</a-button>
            </a-col>
            <a-col :span="item.parse.length===1?24:12" v-if="item.parse.length-1===i">
              <a-button type="primary" block @click="addParser(item.parse)">添加解析器</a-button>
            </a-col>
          </a-row>
        </div>
        <a-row>
          <a-col :span="index===infoDefineForm.content.find.length-1?12:24" v-if="infoDefineForm.content.find.length>1">
            <a-button type="danger" block @click="delFind(infoDefineForm.content.find,index)">删除网页</a-button>
          </a-col>
          <a-col :span="infoDefineForm.content.find.length===1?24:12"
                 v-if="infoDefineForm.content.find.length-1===index">
            <a-button type="primary" block @click="addFind(infoDefineForm.content.find)">添加网页</a-button>
          </a-col>
        </a-row>
      </div>
      <a-divider orientation="left">信息推送</a-divider>
      <a-form-item label="推送方式">
        <a-radio-group v-model:value="infoDefineForm.content.send.type" button-style="solid" size="small">
          <a-radio-button value="email_html">邮件发送(html)</a-radio-button>
          <a-radio-button value="other">Other</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="主题">
        <a-input
          v-model:value="infoDefineForm.content.send.subject"
          placeholder="请输入信息主题"
        />
      </a-form-item>
      <a-form-item v-if="infoDefineForm.content.send.type==='email_html'" label="邮件内容">
        <a-textarea
          v-model:value="infoDefineForm.content.send.content"
          placeholder="freemark模板"
          auto-size
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSave">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { save } from '../../api/info'
import { message } from 'ant-design-vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Info',
  setup () {
    const params = useRoute().query.params
    const state = reactive({
      infoDefineForm: {
        title: '',
        description: '',
        image: '',
        updateCron: '',
        content: {
          find: [
            {
              parse: [
                {
                  parser: 'XPath',
                  content: [
                    {
                      extra: {},
                      selector: '',
                      fieldName: ''
                    }
                  ]
                }
              ],
              render: false,
              request: {
                url: '',
                header: '',
                method: 'get',
                cookies: ''
              }
            }
          ],
          send: {
            type: 'email_html',
            content: '',
            subject: ''
          }
        }
      },
      labelCol: { span: 2 },
      wrapperCol: { span: 10 },
      cronModel: 'day',
      pushTime: ''
    })
    if (params) {
      state.infoDefineForm = JSON.parse(params)
      state.infoDefineForm.content = JSON.parse(state.infoDefineForm.content)
      state.cronModel = 'cron'
    }
    const addField = content => {
      content.push({
        extra: {},
        selector: '',
        fieldName: ''
      })
    }
    const delField = (content, index) => {
      content.splice(index, 1)
    }
    const addParser = content => {
      content.push({
        parser: 'XPath',
        content: [
          {
            extra: {},
            selector: '',
            fieldName: ''
          }
        ]
      })
    }
    const delParser = (content, index) => {
      content.splice(index, 1)
    }
    const addFind = content => {
      content.push({
        parse: [
          {
            parser: 'XPath',
            content: [
              {
                extra: {},
                selector: '',
                fieldName: ''
              }
            ]
          }
        ],
        render: false,
        request: {
          url: '',
          header: '',
          method: 'get',
          cookies: ''
        }
      })
    }
    const delFind = (content, index) => {
      content.splice(index, 1)
    }
    const onSave = () => {
      if (state.cronModel === 'day') {
        state.infoDefineForm.updateCron = '0 ' + state.pushTime.format('m H') + ' * * ? *'
      }
      const data = JSON.parse(JSON.stringify(state.infoDefineForm))
      data.content = JSON.stringify(data.content)
      save(data).then(msg => {
        message.success(msg)
      })
    }
    return {
      onSave,
      addField,
      delField,
      addParser,
      delParser,
      addFind,
      delFind,
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
</style>
