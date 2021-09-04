<template lang='pug'>
div.m-2
  div
    a-button(type='primary' @click='showModal') 添加
  div
    a-modal(:visible='formVisible' :title='formTitle' okText='确认' cancelText='取消' @ok='confirm' @cancel='formVisible=false' width='100%' wrapClassName='full-modal')
      a-form(ref='formRef' :model='formData')
        a-form-item(label='名称' name='name' required :label-col='{span: 2}')
          a-input(placeholder='大名' v-model:value='formData.name')
        a-form-item(label='别名' name='alias' :label-col='{span: 2}')
          a-input(placeholder='别名，用逗号分隔' v-model:value='formData.alias')
  a-table(:dataSource='users' :columns='columns' rowKey='id' :loading='loading')
    template(#action='{record}')
      a(@click='openModifyUserModal(record)') 编辑
      a-divider(type='vertical')
      a-popconfirm(title='确认删除？' ok-text='是' cancel-text='否' @confirm='delUser(record)' @cancel='')
        a 删除

</template>

<script>
import {
  ref,
} from 'vue'
import HeroAndPlayer from './HeroAndPlayer.vue'
import {
  getUsers,
  createUser,
  modifyUser as modifyUserApi,
  delUser as delUserApi,
} from 'src/js/api.js'
export default {
  components: {
    HeroAndPlayer,
  },
  setup() {
    let formVisible =ref(false)
    let users = ref([])
    let formData = ref({})
    let formRef = ref()
    let formTitle = ref('')
    let loading =ref(false)
    let confirmAction
    let loadUser = () => {
      loading.value = true
      getUsers()
        .then(data => {
          users.value = data
        })
        .finally(() => {
          loading.value = false
        })
    }
    loadUser()


    let addUser = () => {
      formRef.value.validate()
        .then(data => {
          createUser(data)
            .then(() => {
              formVisible.value = false
              loadUser()
            })
        })
    }
    let openModifyUserModal = (d) => {
      confirmAction = modifyUser
      formData.value = d
      formTitle.value = '编辑'
      formVisible.value = true
    }
    let modifyUser = () => {
      formRef.value.validate()
        .then(data => {
          modifyUserApi(data)
            .then(() => {
              formVisible.value = false
              loadUser()
            })
        })
    }
    let delUser = (user) => {
      delUserApi(user.id)
        .then(() => {
          formVisible.value = false
          loadUser()
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
      showModal: () => {
        formTitle.value = '新增'
        formVisible.value = true
        formData.value = {}
        confirmAction = addUser
      },
      openModifyUserModal,
      delUser,
      confirm,
      columns: [
        {title: '用户', dataIndex: 'name', key: 'name'},
        {title: '别名', dataIndex: 'alias', key: 'alias'},
        {title: '操作', key: 'action', slots: { customRender: 'action' }}
      ],
      rules: {
        name: [{required: true, trigger: 'blur'}]
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