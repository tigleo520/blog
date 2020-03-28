<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>Banner管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" plain @click="bannerEdit()">添加Banner</el-button>
        </el-col>
      </el-row>
      <el-table :data="items">
        <el-table-column type="index" label="#" align="center" width="100"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="image" label="图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.image" style="height:3rem;">
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="120">
          <template slot-scope="scope">
            <el-button @click="bannerEdit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="提示" :visible.sync="dialogVisible" @close="dialogClosed">
        <el-form :model="edit" ref="formRef">
          <el-form-item label="标题">
            <el-input v-model="edit.title"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接（URL）">
            <el-input v-model="edit.url"></el-input>
          </el-form-item>
          <el-form-item>
            <el-upload
              :action="uploadUrl"
              :on-success="handleSuccess"
              :show-file-list="false"
              >
              <img v-if="edit.image" :src="edit.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
      const res = await this.$http.get('rest/banners')
      this.items = res.data
    },
    async bannerEdit (row) {
      this.dialogVisible = true
      if (row) {
        const res = await this.$http.get(`rest/banners/${row._id}`)
        this.edit = res.data
      }
    },
    dialogClosed () {
      this.edit = {}
      this.$refs.formRef.resetFields()
    },
    handleSuccess (res) {
      this.$set(this.edit, 'image', res.image)
    },
    async save () {
      if (this.edit._id) {
        await this.$http.put(`rest/banners/${this.edit._id}`, this.edit)
      } else {
        await this.$http.post('rest/banners', this.edit)
      }
      this.$message.success('保存成功')
      this.dialogVisible = false
      this.fetch()
    },
    remove (row) {
      this.$confirm(`是否确定删除Banner'${row.title}'`, '提示', {
        confirmButtonText: '确定',
        concleButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/banners/${row._id}`)
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

<style scoped>
.el-dialog{
  margin-top: 10vh;
}
.el-dialog__body{
  margin-top: 5px;
  margin-bottom: 5px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  min-width: 178px;
  height: 178px;
  display: block;
}
</style>
