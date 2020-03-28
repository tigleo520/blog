<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" plain @click="categoryEdit()">添加分类</el-button>
        </el-col>
      </el-row>
      <el-table :data="items">
        <el-table-column type="index" label="#" align="center" width="100"></el-table-column>
        <el-table-column prop="name" label="标题" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button @click="categoryEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="dialogVisible" @close="dialogClosed">
        <el-form :model="edit" ref="formRef">
          <el-form-item label="名称">
            <el-input v-model="edit.name"></el-input>
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
      const res = await this.$http.get('rest/categorys')
      this.items = res.data
    },
    async categoryEdit (row) {
      this.dialogVisible = true
      if (row) {
        const res = await this.$http.get(`rest/categorys/${row._id}`)
        this.edit = res.data
      }
    },
    dialogClosed () {
      this.edit = {}
      this.$refs.formRef.resetFields()
    },
    async save () {
      if (this.edit._id) {
        await this.$http.put(`rest/categorys/${this.edit._id}`, this.edit)
      } else {
        await this.$http.post('rest/categorys', this.edit)
      }
      this.$message.success('保存成功')
      this.dialogVisible = false
      this.fetch()
    },
    remove (row) {
      this.$confirm(`是否确定删除分类'${row.name}'`, '提示', {
        confirmButtonText: '确定',
        concleButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/categorys/${row._id}`)
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
