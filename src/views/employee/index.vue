<template>
    <div>
        <img :src="'/static/images/employee.jpg'" alt="" class="employee_image">
        <el-button
                size="mini"
                @click="showForm(0,{})">
            新建员工
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
                    prop="employee_name"
                    label="姓名"
            >
            </el-table-column>
<!--            <el-table-column-->
<!--                    prop="employee_avatar"-->
<!--                    label="头像"-->
<!--            >-->
<!--            </el-table-column>-->
            <el-table-column
                    prop="employee_position"
                    label="职位"
            >
            </el-table-column>
            <el-table-column
                    prop="employee_phone_Number"
                    label="手机号"
            >
            </el-table-column>
            <el-table-column
                    prop="employee_wechat_Number"
                    label="微信号"
            >
            </el-table-column>
            <el-table-column
                    prop="employee_email"
                    label="邮箱"
            >
            </el-table-column>
            <el-table-column
                    prop="employee_qq_Number"
                    label="qq号"
            >
            </el-table-column>
            <el-table-column
                    width="200"
                    label="操作"
            >
                <template slot-scope="scope">
                    <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
                    <el-button
                            size="mini"
                            @click="data_fine(scope.row)">
                        查看案例
                    </el-button>
                    |
                    <el-button
                            size="mini"
                            @click="showForm(1,scope.row)">
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
        <el-dialog title="案例" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="头像" :label-width="formLabelWidth">
                    <div class="demo-image__preview">
                        <img :src="url" alt="" class="an-image">
                    </div>
                    <input name="file" type="file" id="file"/>
                    <div>
                        <el-button @click="updateImage()">上传图片</el-button>
                    </div>
                    <!--                    <el-input v-model="form.image" auto-complete="off"></el-input>-->
                </el-form-item>
                <el-form-item label="名字" :label-width="formLabelWidth">
                    <el-input v-model="form.employee_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="头像" :label-width="formLabelWidth">
                    <el-input v-model="form.employee_avatar" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="职位" :label-width="formLabelWidth">
                    <el-input v-model="form.employee_position" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="form.employee_phone_Number" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="微信号" :label-width="formLabelWidth">
                    <el-input v-model="form.employee_wechat_Number" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.employee_email" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="qq号" :label-width="formLabelWidth">
                    <el-input v-model="form.employee_qq_Number" auto-complete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false;quedingForm()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- Form -->
        <!--        <el-dialog title="修改案例" :visible.sync="dialogFormVisible2">-->
        <!--            <el-form :model="form">-->
        <!--                <el-form-item label="案例名" :label-width="formLabelWidth">-->
        <!--                    <el-input v-model="form.name" auto-complete="off"></el-input>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="案例图片" :label-width="formLabelWidth">-->
        <!--                    <div class="demo-image__preview">-->
        <!--                        <img :src="url" alt="" class="an-image">-->
        <!--                    </div>-->
        <!--                    <input name="file" type="file" id="file"/>-->
        <!--                    <div>-->
        <!--                        <el-button @click="updateImage()">上传图片</el-button>-->
        <!--                    </div>-->
        <!--                    &lt;!&ndash;                    <el-input v-model="form.image" auto-complete="off"></el-input>&ndash;&gt;-->
        <!--                </el-form-item>-->
        <!--                <el-form-item label="案例文本" :label-width="formLabelWidth">-->
        <!--                    &lt;!&ndash;                    <el-input v-model="form.text" auto-complete="off" type="textarea"></el-input>&ndash;&gt;-->
        <!--                    <vue-wangeditor id="editor" v-model="form.text" ref="editor"></vue-wangeditor>-->

        <!--                </el-form-item>-->
        <!--                <el-form-item label="案例价格" :label-width="formLabelWidth">-->
        <!--                    <el-input v-model="form.price" auto-complete="off" type="number"></el-input>-->
        <!--                </el-form-item>-->
        <!--            </el-form>-->
        <!--            <div slot="footer" class="dialog-footer">-->
        <!--                <el-button @click="dialogFormVisible2 = false">取 消</el-button>-->
        <!--                <el-button type="primary" @click="dialogFormVisible2 = false;employee_update()">确 定</el-button>-->
        <!--            </div>-->
        <!--        </el-dialog>-->
    </div>

</template>

<script>
  import { employee_new, employee_find, employee_update, employee_delete } from '../../api/api.js'
  import { home_image_update } from '../../api/api'
  import http from 'axios'
  import vueWangeditor from 'vue-wangeditor'

  export default {
    components: {
      vueWangeditor
    },
    data() {
      return {
        state: 0,//0新建,1更新
        case_id: '',
        page: 1,
        limit: 10,
        total: 10,
        tableData: [],
        dialogFormVisible: false,
        dialogFormVisible2: false,
        form: {
          id: '',
          employee_name: '',
          employee_avatar: '',
          employee_position: '',
          employee_phone_Number: '',
          employee_wechat_Number: '',
          employee_email: '',
          employee_qq_Number: '',
        },
        formLabelWidth: '120px',
        scopeRow: '',
        url: '',
        text: ''
      }
    },
    created() {
      this.case_id = Number(this.$router.currentRoute.params.id)
      // console.log(this.$router.currentRoute.params.id)
      this.employee_find()

    },
    methods: {
      showForm(state, data) {
        this.state = state
        this.dialogFormVisible = true

        switch (true) {
          case state === 0:
            this.form = {
              id: '',
              employee_name: '',
              employee_avatar: '',
              employee_position: '',
              employee_phone_Number: '',
              employee_wechat_Number: '',
              employee_email: '',
              employee_qq_Number: '',
            }
            this.url = ''
            break
          case state === 1:
            this.form = {
              id: data.id,
              employee_name: data.employee_name,//名字
              employee_avatar: data.employee_avatar,//头像
              employee_position: data.employee_position,//职位
              employee_phone_Number: data.employee_phone_Number,//手机号
              employee_wechat_Number: data.employee_wechat_Number,//微信号
              employee_email: data.employee_email,//邮箱
              employee_qq_Number: data.employee_qq_Number//qq号
            }
            this.url = process.env.API_SERVER_ADDR + '/public/uploads/' + data.employee_image
            // this.data_update(data)
            break
        }
      },
      quedingForm() {
        switch (true) {
          case this.state === 0:
            this.data_new()
            break
          case this.state === 1:
            this.employee_update()
            break
        }
      },
      updateImage() {
        console.log('提交按钮')
        let formData = new FormData()
        // formData.append('title', $('#username').val());
        console.log(document.getElementById('file').files[0])
        if (document.getElementById('file').files[0] === undefined) {
          this.alertShow = true
          setTimeout(() => {
            this.alertShow = false
          }, 3000)
          return
        }
        formData.append('image', document.getElementById('file').files[0])
        console.log(formData)
        let config = {
          headers: { 'Content-Type': 'multipart/form-data' }
        }  //添加请求头
        http.post('/api/v1/upload', formData, config).then((res) => {
          console.log(res)
          this.form.employee_avatar = res.data.url

          // home_image_update({
          //   id:this.id,
          //   home_image_url:res.data.url
          // }).then(data=>{
          //   // document.getElementById('file').files[0]=undefined
          this.url = process.env.API_SERVER_ADDR + '/public/uploads/' + res.data.url
          //   console.log(data)
          // })
          // this.dialogTableVisible = true
        })

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.limit = val
        this.employee_find()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.page = val
        this.employee_find()
      },
      employee_find() {
        employee_find({
          page: this.page - 1,
          limit: this.limit,
          // quoted_class_id: this.case_id
        }).then(data => {
          // console.log(data.data)
          this.tableData = data.data
          this.total = data.count
        })
      },
      employee_update() {
        // this.form.text = this.$refs.editor.getHtml()
        // console.log(this.$refs.editor.getHtml())
        employee_update({
          id: this.form.id,
          employee_name: this.form.employee_name,//名字
          employee_avatar: this.form.employee_avatar,//头像
          employee_position: this.form.employee_position,//职位
          employee_phone_Number: this.form.employee_phone_Number,//手机号
          employee_wechat_Number: this.form.employee_wechat_Number,//微信号
          employee_email: this.form.employee_email,//邮箱
          employee_qq_Number: this.form.employee_qq_Number//qq号
        }).then(data => {
          this.employee_find()
        })
      },
      data_new() {
        // console.log(222, this.form.name)
        employee_new({
          employee_name: this.form.employee_name,//名字
          employee_avatar: this.form.employee_avatar,//头像
          employee_position: this.form.employee_position,//职位
          employee_phone_Number: this.form.employee_phone_Number,//手机号
          employee_wechat_Number: this.form.employee_wechat_Number,//微信号
          employee_email: this.form.employee_email,//邮箱
          employee_qq_Number: this.form.employee_qq_Number//qq号
        }).then(data => {
          // console.log(data)
          this.employee_find()
        })
      },
      data_update() {
        // this.form.text =
        // this.dialogFormVisible = true
        // console.log(data)
        // this.scopeRow = data

        // this.dialogFormVisible2 = true
      },
      data_delete(data) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          employee_delete({ id: data.id }).then(data => {
            this.employee_find()
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
        this.showForm(1, data)
      }
    }
  }
</script>

<style scoped>
    .employee_image {
        width: 200px;
        height: 150px;
    }

    .an-image {
        width: 100px;
        height: 100%;
        border-style: solid;
        border-width: 1px;
        border-color: red;
    }
</style>
<style>
    /*@media screen and (max-width: 1366px)*/
    .el-dialog--small {
        width: 90% !important;
        min-width: 500px !important;
    }
</style>
