<template lang='pug'>
div.m-2
  div
    a-modal(:visible='formVisible' :title='formTitle' okText='确认' cancelText='取消' @ok='confirm' @cancel='formVisible=false' width='100%' wrapClassName='full-modal')
      a-form(ref='formRef' :model='formData')
        a-form-item(label='名称' name='nick_name' required :label-col='{span: 2}')
          a-input(placeholder='大名' v-model:value='formData.nick_name')
  a-table(:dataSource='users' :columns='columns' rowKey='id' :loading='loading')
    template(#action='{record}')
      a(@click='openModifyPlayerModal(record)') 编辑

</template>

<script>
import {
  ref,
} from 'vue'
import {
  Table as ATable,
  Modal as AModal,
  Form as AForm,
  Input as AInput,
} from 'ant-design-vue'
import HeroAndPlayer from './HeroAndPlayer.vue'
import {
  getPlayers,
  modifyPlayer as modifyPlayerApi,
} from 'src/js/api.js'
export default {
  components: {
    HeroAndPlayer,
    ATable,
    AModal,
    AForm,
    AFormItem: AForm.Item,
    AInput,
  },
  setup() {
    let formVisible =ref(false)
    let users = ref([])
    let formData = ref({})
    let formRef = ref()
    let formTitle = ref('')
    let loading =ref(false)
    let confirmAction
    let loadPlayer = () => {
      loading.value = true
      getPlayers()
        .then(data => {
          users.value = data
        })
        .finally(() => {
          loading.value = false
        })
    }
    loadPlayer()

    let openModifyPlayerModal = (d) => {
      console.log(d)
      confirmAction = modifyPlayer
      formData.value = d
      formTitle.value = '编辑'
      formVisible.value = true
    }
    let modifyPlayer = () => {
      formRef.value.validate()
        .then(data => {
          modifyPlayerApi({
            id: formData.value.id,
            nick_name: data.nick_name,
          })
            .then(() => {
              formVisible.value = false
              loadPlayer()
            })
        })
    }

    let confirm = (...args) => {
      confirmAction(...args)
    }
    return {
      formVisible,
      loading,
      users,
      formData,
      formRef,
      formTitle,
      openModifyPlayerModal,
      confirm,
      columns: [
        {title: '用户', dataIndex: 'nick_name', key: 'name'},
        {title: 'STEAMID', dataIndex: 'steam_id', key: 'sid'},
        {title: '操作', key: 'action', slots: { customRender: 'action' }}
      ],
      rules: {
        nick_name: [{required: true, trigger: 'blur'}]
      },
    }
  }
}
</script>
<style lang='less'>
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
    overflow: scroll;
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>