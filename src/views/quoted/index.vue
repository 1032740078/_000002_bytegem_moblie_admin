<template>
    <div>
        <img :src="'/static/images/quoted.jpg'" alt="" class="quoted_list_image">
        <el-button
                size="mini"
                @click="dialogFormVisible = true">
            新建类目
        </el-button>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="id"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="quoted_list_name"
                    label="案例类目"
            >
            </el-table-column>
            <el-table-column

                    label="操作"
            >
                <template slot-scope="scope">
                    <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                    <el-button
                            size="mini"
                            @click="to_quoted_list_list(scope.row)">
                        查看案例列表
                    </el-button>
                    |
                    <el-button
                            size="mini"
                            @click="data_update(scope.row)">
                        修改
                    </el-button>
                    <el-button
                            size="mini"
                            @click="data_delete(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <!--            <span class="demonstration">完整功能</span>-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-sizes="[10, 20, 50]"
                    :page-size="limit"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

        <!-- Form -->
        <el-dialog title="新建案例类目" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="分类名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <!--                <el-form-item label="活动区域" :label-width="formLabelWidth">-->
                <!--                    <el-select v-model="form.region" placeholder="请选择活动区域">-->
                <!--                        <el-option label="区域一" value="shanghai"></el-option>-->
                <!--                        <el-option label="区域二" value="beijing"></el-option>-->
                <!--                    </el-select>-->
                <!--                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false;data_new()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- Form -->
        <el-dialog title="修改案例类目" :visible.sync="dialogFormVisible2">
            <el-form :model="form">
                <el-form-item label="分类名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <!--                <el-form-item label="活动区域" :label-width="formLabelWidth">-->
                <!--                    <el-select v-model="form.region" placeholder="请选择活动区域">-->
                <!--                        <el-option label="区域一" value="shanghai"></el-option>-->
                <!--                        <el-option label="区域二" value="beijing"></el-option>-->
                <!--                    </el-select>-->
                <!--                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible2 = false;quoted_list_update()">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
  import { quoted_list_find, quoted_list_new, quoted_list_update, quoted_list_delete } from '../../api/api.js'

  export default {
    data() {
      return {
        page: 1,
        limit: 10,
        total: 10,
        tableData: [],
        dialogFormVisible: false,
        dialogFormVisible2: false,
        form: {
          name: ''
        },
        formLabelWidth: '120px',
        scopeRow: ''
      }
    },
    created() {
      this.quoted_list_find()
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.limit = val
        this.quoted_list_find()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.page = val
        this.quoted_list_find()
      },
      to_quoted_list_list(data) {
        this.$router.push('/quoted_class/' + data.id)
      },
      quoted_list_find() {
        quoted_list_find({
          page: this.page - 1,
          limit: this.limit
        }).then(data => {
          // console.log(data.data)
          this.tableData = data.data
          this.total = data.count
        })
      },
      quoted_list_update() {
        quoted_list_update({
          id: this.scopeRow.id,
          name: this.form.name
        }).then(data => {
          this.quoted_list_find()
          // console.log(data.data)
          // this.tableData = data.data
        })
      },
      data_new() {
        // console.log(222, this.form.name)
        quoted_list_new({
          name: this.form.name
        }).then(data => {
          // console.log(data)
          this.quoted_list_find()
        })
      },
      data_update(data) {
        console.log(data)
        this.scopeRow = data
        this.form = {
          name: data.quoted_list_name
        }
        this.dialogFormVisible2 = true
      },
      data_delete(data) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          quoted_list_delete({ id: data.id }).then(data => {
            this.quoted_list_find()
          })
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
        // console.log(data)
      },
      data_fine(data) {
        console.log(data)
      }
    }
  }
</script>

<style scoped>
    .quoted_list_image {
        width: 200px;
        height: 150px;
    }
</style>
