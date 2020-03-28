<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{id ? "编辑" : "新建"}}文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form label-width="100px" @submit.native.prevent="save">
        <el-form-item label="所属分类">
          <el-select v-model="model.category">
            <el-option v-for="item in category" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data () {
    return {
      model: {
        posttime: ''
      },
      category: {}
    }
  },
  methods: {
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.image)
      resetUploader()
    },
    async save () {
      this.model.posttime = new Date()
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        await this.$http.post('rest/articles', this.model)
      }
      this.$message.success('保存成功')
      this.$router.push('/articles/list')
    },
    async fetch () {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories () {
      const res = await this.$http.get('rest/categories')
      this.category = res.data
    }
  },
  created () {
    this.id && this.fetch()
    this.fetchCategories()
  }
}
</script>
