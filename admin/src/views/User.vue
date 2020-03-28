<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" plain @click="userEdit()">添加管理员</el-button>
        </el-col>
      </el-row>
      <el-table :data="items">
        <el-table-column type="index" label="#" align="center" width="100"></el-table-column>
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button @click="userEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="dialogVisible" @close="dialogClosed">
        <el-form :model="edit" ref="formRef">
          <el-form-item label="用户名">
            <el-input v-model="edit.username"></el-input>
          </el-form-item>
          <el-form-item label="密码）">
            <el-input type="password" v-model="edit.password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      dialogVisible: false,
      edit: {}
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('rest/users')
      this.items = res.data
    },
    async userEdit (row) {
      this.dialogVisible = true
      if (row) {
        const res = await this.$http.get(`rest/users/${row._id}`)
        this.edit = res.data
      }
    },
    dialogClosed () {
      this.edit = {}
      this.$refs.formRef.resetFields()
    },
    async save () {
      if (this.edit._id) {
        await this.$http.put(`rest/users/${this.edit._id}`, this.edit)
      } else {
        await this.$http.post('rest/users', this.edit)
      }
      this.$message.success('保存成功')
      this.dialogVisible = false
      this.fetch()
    },
    remove (row) {
      this.$confirm(`是否确定删除管理员'${row.username}'`, '提示', {
        confirmButtonText: '确定',
        concleButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/users/${row._id}`)
        this.$message.success('删除成功')
        this.fetch()
      }).catch(() => {
        this.$message.info('取消删除')
      })
    }
  },
  created () {
    this.fetch()
  }
}
</script>
