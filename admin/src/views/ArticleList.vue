<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="15" type="flex" justify="start">
        <el-col :span="5">
          <el-select v-model="queryInfo.categoryId" clearable @change="selectChange" placeholder="请选择分类">
            <el-option v-for="item in category" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3" :offset="4">
          <el-button type="primary" plain @click="$router.push('/articles/create')">添加文章</el-button>
        </el-col>
      </el-row>
      <el-table :data="items" stripe>
        <el-table-column type="index" label="#" width="80" align="center"></el-table-column>
        <el-table-column prop="category.name" label="所属分类" width="120" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="posttime" label="添加时间" align="center"></el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 20]"
        :page-size="queryInfo.pagesize"
        layout="sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      category: {},
      total: 0,
      queryInfo: {
        pagenum: 1,
        pagesize: 5,
        categoryId: ''
      }
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('rest/articles', { params: this.queryInfo })
      this.items = res.data.items
      this.total = res.data.total
      this.items.forEach((item, index) => {
        item.posttime = new Date(Date.parse(item.posttime) + 28800000).toISOString().replace(/T/g, ' ').slice(0, 19)
      })
    },
    async fetchCategories () {
      const res = await this.$http.get('rest/categories')
      this.category = res.data
    },
    selectChange (val) {
      this.queryInfo.pagenum = 1
      this.fetch()
    },
    handleSizeChange (val) {
      this.queryInfo.pagesize = val
      this.fetch()
    },
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
      this.fetch()
    },
    remove (row) {
      this.$confirm(`是否确定删除文章'${row.title}'`, '提示', {
        confirmButtonText: '确定',
        concleButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/articles/${row._id}`)
        this.$message.success('删除成功')
        this.fetch()
      }).catch(() => {
        this.$message.info('取消删除')
      })
    }
  },
  created () {
    this.fetch()
    this.fetchCategories()
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 15px;
  text-align: center;
}
</style>
