<template>
  <div>
    <p class="scoped-test1">{{msg}}</p>
    <p class="test-less-scoped">test-less-scoped</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="less" scoped>
  .scoped-test1 {
    height: 40px;
    background-color: blue;
  }
  .test-less-scoped {
    background-color: yellow;
  }
</style>
