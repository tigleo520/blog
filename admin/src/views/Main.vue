<template>
  <el-container height="100vh">
    <el-header class="main_header">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col>
          <span class="main_title">Blog后台管理系统</span>
        </el-col>
        <el-col :span="2">
          <el-button type="info" plain @click="logout">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse?'64px':'200px'">
        <el-row>
          <el-col>
            <el-menu
              router
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              unique-opened
              :collapse="isCollapse">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span>内容管理</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分类</template>
                  <el-menu-item index="/category">分类管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <template slot="title">文章</template>
                  <el-menu-item index="/articles/create">添加文章</el-menu-item>
                  <el-menu-item index="/articles/list">文章列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>运营商管理</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">Banner</template>
                  <el-menu-item index="/ads/banner">Banner管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <template slot="title">广告位</template>
                  <el-menu-item index="/ads/ad">广告位管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  <span>系统管理</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">管理员</template>
                  <el-menu-item index="/user">管理员列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  mounted () {
    window.onresize = this.matchView
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    matchView () {
      if (window.matchMedia('(max-width: 900px)').matches) {
        this.isCollapse = true
      } else {
        this.isCollapse = false
      }
    }
  },
  created () {
    this.matchView()
  }
}
</script>

<style lang="less" scoped>
.el-container{
  background-color: #545c64;
  .el-aside{
    .el-menu{
      border: none;
      &:not(.el-menu--collapse) {
        width: 200px;
      }
    }
  }
  .el-main{
    height: calc(100vh - 60px);
    background-color: #eee;
  }
  .main_header{
    display: flex;
    align-items: center;
    .el-row{
      width: 100%;
      span{
        font-size: 2rem;
        color: #fff;
      }
    }
  }
}
</style>
