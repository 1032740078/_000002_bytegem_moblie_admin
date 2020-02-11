<template>
    <div class="table announcement-body">
        <div class="demo-image__preview">
            <img :src="url" alt="" class="an-image">
        </div>
        <input name="file" type="file" id="file"  />
        <el-alert
                v-if="alertShow"
                title="警告"
                type="warning"
                description="请选择文件再上传"
                show-icon>
        </el-alert>
        <div>
            <el-button @click="updateImage()">上传并修改图片</el-button>
        </div>

    </div>
</template>
<script>
    import {home_image_find,home_image_update} from '../../api/api.js'
    import http from 'axios'
    export default {
        data() {
            return {
              id:'',
              home_image_url:'',
              url: '',
              uploadurl: '',
              dialogTableVisible:false,
              alertShow:false,
            }
        },
        computed: {

        },
        methods: {
          updateImage(){
            console.log('提交按钮');
            let formData = new FormData();
            // formData.append('title', $('#username').val());
            console.log(document.getElementById('file').files[0])
            if(document.getElementById('file').files[0]===undefined){
              this.alertShow=true
              setTimeout(()=>{
                this.alertShow=false
              },3000)
              return
            }
            formData.append('image', document.getElementById('file').files[0]);
            console.log(formData);
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            };  //添加请求头
            http.post('/api/v1/upload', formData,config).then( (res)=> {
              console.log(res)
              home_image_update({
                id:this.id,
                home_image_url:res.data.url
              }).then(data=>{
                // document.getElementById('file').files[0]=undefined
                this.url=process.env.API_SERVER_ADDR+'/public/uploads/'+res.data.url
                console.log(data)
              })
              // this.dialogTableVisible = true
            })

          },
        },
        created() {
          this.uploadurl=process.env.API_SERVER_ADDR+'/api/v1/upload'
          console.log(process.env.API_SERVER_ADDR)
          home_image_find().then(data=>{
            console.log(data)
            console.log(process.env.API_SERVER_ADDR)
            this.id=data.home_image_url.id
            this.url=process.env.API_SERVER_ADDR+'/public/uploads/'+data.home_image_url.home_image_url
          })
        }
    }
</script>
<style scoped>
    .announcement-body {
        padding-top: 30px;
    }

    .search-Box {
        padding-bottom: 10px;
        min-width: 260px;
        max-width: 280px;
    }

    .head-img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
    }

    .salarylist-left {
        min-width: 90px;
        max-width: 90px;
        text-align: right;
        padding-right: 10px;
    }

    .salarylist {
        padding: 10px;
    }
    .an-image{
        width: 300px;
        height: 100%;
        border-style: solid;
        border-width: 1px;
        border-color: red;
    }
</style>
