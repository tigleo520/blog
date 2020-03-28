<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#live2dcanvas {
  position: fixed;
  bottom: 20px;
  padding-top: 1em;
  width: 200px;
  opacity: .5 !important;
  left: 0;
}
</style>
