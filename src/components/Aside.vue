<template>
  <el-row class="tac">
    <el-col>
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">CURD</span>
        </el-menu-item>
        <el-menu-item index="2" @click="openApiDoc">
          <i class="el-icon-document"></i>
          <span slot="title">API Doc</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Aside',
  methods: {
    openApiDoc: function () {
      window.open('http://localhost:3000/apidoc')
    }
  }
}
</script>

<style scoped>

</style>
