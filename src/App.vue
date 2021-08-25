<template>
  <div id="app">
    <el-container>
      <el-header>
        <h1>test-backend</h1>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-container>
          <el-main>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
        <h2>Design By HaoHaoP</h2>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Aside from '@/components/Aside'

export default {
  name: 'App',
  components: {Aside}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

</style>
