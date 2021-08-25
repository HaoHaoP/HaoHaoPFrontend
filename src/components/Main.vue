<template>
  <div class="main">
    <el-row style="margin-bottom: 20px">
      <el-col :span="4">
        <el-button type="primary" @click="handleAdd">Add User<i class="el-icon-plus el-icon--right"></i></el-button>
      </el-col>
      <el-col :span="8" :offset="12">
        <el-input v-model="id" placeholder="User Id" style="width: auto" @change="getUser"></el-input>
        <el-button type="primary" @click="getUser">Search<i class="el-icon-search el-icon--right"></i></el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="tableData" height="800px" border style="width: 100%">
      <el-table-column prop="_id" label="id" width="80px">
      </el-table-column>
      <el-table-column prop="name" label="name">
      </el-table-column>
      <el-table-column prop="dob" label="dob">
      </el-table-column>
      <el-table-column prop="address" label="address">
      </el-table-column>
      <el-table-column prop="description" label="description">
      </el-table-column>
      <el-table-column prop="createdAt" label="createdAt">
      </el-table-column>
      <el-table-column label="operate" width="180px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">Edit
          </el-button>
          <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row)">
            <el-button size="mini" type="danger" slot="reference">Delete</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" :page-size="limit" :current-page.sync="page"
                   @current-change="getUser">
    </el-pagination>

    <!-- Form -->
    <el-dialog title="" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="dob">
          <el-date-picker type="date" placeholder="Select date" format="yyyy/MM/dd" v-model="form.dob"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="save">Save</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Http from '@/http/http'

export default {
  name: 'Main',
  created: function () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.loading = true
      Http.get(`/user/${this.id}?page=${this.page}&limit=${this.limit}`).then(result => {
        this.loading = false
        if (result.data.code === 0) {
          this.tableData = result.data.result.data
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].dob = new Date(this.tableData[i].dob).toLocaleDateString()
            this.tableData[i].createdAt = new Date(this.tableData[i].createdAt).toLocaleDateString()
          }
          this.total = result.data.result.total
        } else {
          this.$message.error(result.data.msg)
        }
      }).catch(error => {
        this.loading = false
        this.$message.error(error)
      })
    },
    addUser () {
      const obj = {
        name: this.form.name,
        dob: new Date(this.form.dob).valueOf(),
        address: this.form.address,
        description: this.form.description
      }
      Http.put(`/user`, obj).then(result => {
        if (result.data.code === 0) {
          this.dialogFormVisible = false
          this.getUser()
        } else {
          this.$message.error(result.data.msg)
        }
      }).catch(error => {
        this.$message.error(error)
      })
    },
    handleDelete (data) {
      this.loading = true
      const id = data._id
      Http.del(`/user/${id}`).then(result => {
        this.loading = false
        if (result.data.code === 0) {
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i]._id === id) {
              this.tableData.splice(i, 1)
              return
            }
          }
        } else {
          this.$message.error(result.data.msg)
        }
      }).catch(error => {
        this.loading = false
        this.$message.error(error)
      })
    },
    handleAdd () {
      this.dialogFormVisible = true
      this.act = 'add'
      this.form = {
        name: '',
        dob: '',
        address: '',
        description: ''
      }
    },
    handleEdit (data) {
      this.dialogFormVisible = true
      this.act = 'edit'
      this.form = JSON.parse(JSON.stringify(data))
    },
    save () {
      if (this.act === 'edit') {
        this.editUser()
      } else {
        this.addUser()
      }
    },
    editUser () {
      this.loading = true
      const id = this.form._id
      const obj = {
        name: this.form.name,
        dob: new Date(this.form.dob).valueOf(),
        address: this.form.address,
        description: this.form.description
      }
      Http.post(`/user/${id}`, obj).then(result => {
        this.loading = false
        if (result.data.code === 0) {
          this.dialogFormVisible = false
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i]._id === id) {
              this.tableData[i].dob = new Date(obj.dob).toLocaleDateString()
              this.tableData[i].name = obj.name === '' ? this.tableData[i].name : obj.name
              this.tableData[i].address = obj.address === '' ? this.tableData[i].address : obj.address
              this.tableData[i].description = obj.description === '' ? this.tableData[i].description : obj.description
              return
            }
          }
        } else {
          this.$message.error(result.data.msg)
        }
      }).catch(error => {
        this.loading = false
        this.$message.error(error)
      })
    }
  },
  data () {
    return {
      id: '',
      page: 1,
      limit: 10,
      total: 0,
      loading: true,
      tableData: [],
      act: 'add',
      dialogFormVisible: false,
      form: {
        name: '',
        dob: '',
        address: '',
        description: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  height: calc(100vh - 160px);
}
</style>
