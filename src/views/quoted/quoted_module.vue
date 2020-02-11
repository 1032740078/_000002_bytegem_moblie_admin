<template>
    <div>
        <img :src="'/static/images/quoted_module.jpg'" alt="" class="quoted_module_image">
        <el-button
                size="mini"
                @click="showForm(0,{})">
            新建模块
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
                    prop="quoted_module_name"
                    label="分类名"
            >
            </el-table-column>
            <el-table-column

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
                <el-form-item label="案例名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="案例图片" :label-width="formLabelWidth">
                    <div class="demo-image__preview">
                        <img :src="url" alt="" class="an-image">
                    </div>
                    <input name="file" type="file" id="file"/>
                    <div>
                        <el-button @click="updateImage()">上传图片</el-button>
                    </div>
                    <!--                    <el-input v-model="form.image" auto-complete="off"></el-input>-->
                </el-form-item>
                <el-form-item label="案例文本" :label-width="formLabelWidth">
                    <vue-wangeditor id="editor" v-model="editorText" ref="editor"></vue-wangeditor>
                    <!--                    <el-input v-model="form.text" auto-complete="off" type="textarea"></el-input>-->
                </el-form-item>
                <el-form-item label="案例价格" :label-width="formLabelWidth">
                    <el-input v-model="form.price" auto-complete="off" type="number"></el-input>
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
        <!--                <el-button type="primary" @click="dialogFormVisible2 = false;quoted_module_update()">确 定</el-button>-->
        <!--            </div>-->
        <!--        </el-dialog>-->
    </div>

</template>

<script>
  import { quoted_module_new, quoted_module_find, quoted_module_update, quoted_module_delete } from '../../api/api.js'
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
          name: '',
          image: '',
          text: '',
          price: 0,
          quoted_class_id: 0
        },
        formLabelWidth: '120px',
        scopeRow: '',
        url: '',
        text: '',
        editorText: ''
      }
    },
    created() {
      this.case_id = Number(this.$router.currentRoute.params.id)
      // console.log(this.$router.currentRoute.params.id)
      this.quoted_module_find()

    },
    methods: {
      setEditorText(text) {
        console.log(text)
        this.editorText = text
        setTimeout(()=>{
          this.$refs.editor.setHtml(text)
        },1000)

      },
      showForm(state, data) {
        this.state = state
        this.dialogFormVisible = true
        this.setEditorText(data.quoted_module_text)
        switch (true) {
          case state === 0:
            this.form = {
              name: '',
              id: '',
              image: '',
              text: '',
              price: '',
              quoted_class_id: ''
            }
            this.url = ''
            break
          case state === 1:
            this.form = {
              name: data.quoted_module_name,
              id: data.id,
              image: data.quoted_module_image,
              text: data.quoted_module_text,
              price: data.quoted_module_price,
              quoted_class_id: data.quoted_module_class_id
            }
            this.url = process.env.API_SERVER_ADDR + '/public/uploads/' + data.quoted_module_text_image
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
            this.quoted_module_update()
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
          this.form.image = res.data.url

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
        this.quoted_module_find()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.page = val
        this.quoted_module_find()
      },
      quoted_module_find() {
        quoted_module_find({
          page: this.page - 1,
          limit: this.limit,
          quoted_class_id: this.case_id
        }).then(data => {
          // console.log(data.data)
          this.tableData = data.data
          this.total = data.count
        })
      },
      quoted_module_update() {
        this.form.text = this.$refs.editor.getHtml()
        console.log(this.$refs.editor.getHtml())
        quoted_module_update({
          image: this.form.image,//图片
          text: this.form.text,//详情文案（富文本）
          price: this.form.price,//价格
          quoted_class_id: this.case_id,//案例分类 id
          id: this.form.id,
          name: this.form.name
        }).then(data => {
          this.quoted_module_find()
        })
      },
      data_new() {
        this.form.text = this.$refs.editor.getHtml()
        // console.log(222, this.form.name)
        quoted_module_new({
          name: this.form.name,
          quoted_class_id: this.case_id,
          image: this.form.image,
          price: Number(this.form.price),
          text: this.form.text
        }).then(data => {
          // console.log(data)
          this.quoted_module_find()
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

          quoted_module_delete({ id: data.id }).then(data => {
            this.quoted_module_find()
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
    .quoted_module_image {
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
