<template>
    <div class="login-box">
        <div class="login-bg">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
                     class="demo-ruleForm login-container">
                <h3 class="title">系统登录</h3>
                <el-form-item prop="account">
                    <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>
                <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
                <el-form-item style="width:100%;">
                    <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
                    </el-button>
                    <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
                </el-form-item>
            </el-form>
        </div>
        <div class="login-bottom">
            技术支持：广州字节宝软件科技有限公司
        </div>
    </div>

</template>

<script>
    import axios from 'axios';
    import {requestLogin} from '../api/api';
    //import NProgress from 'nprogress'
    export default {
        data() {
            return {
                logining: false,
                ruleForm2: {
                    account: 'robin_zgs',
                    checkPass: '123456'
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    checkPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        methods: {
            handleSubmit2(ev) {
                let _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        let loginParams = {username: this.ruleForm2.account, password: this.ruleForm2.checkPass};
                        requestLogin(loginParams).then(data => {
                            let {message, body} = data;

                            /**=================== 存储用户信息 ======================**/
                            localStorage.setItem('token', body.token)
                            localStorage.setItem('role', body.role)
                            localStorage.setItem('userId', body.userId)
                            // localStorage.setItem('users_organization_id', body.users_organization_id)
                            localStorage.setItem('username', this.ruleForm2.account)
                            this.$store.commit('UP_TOKEN', body.token)
                            this.$store.commit('UP_userId', body.userId)
                            this.$store.commit('UP_role', body.role)
                            // this.$store.commit('UP_users_organization_id', body.users_organization_id)
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + body.token;
                            axios.defaults.headers.common['userid'] = body.userId;
                            axios.defaults.headers.common['username'] = this.ruleForm2.account;
                            // axios.defaults.headers.common['orgid'] = body.users_organization_id;
                            /*switch (true) {
                                //总公司跳转
                                case body.role === 6:
                                    this.$router.push({path: '/echarts'});//登陆成功后跳转到
                                    break
                                //企业跳转
                                case body.role === 5:
                                    this.$router.push({path: '/businessData'});//登陆成功后跳转到
                                    break
                                //业务员跳转
                                case body.role === 4:
                                    this.$router.push({path: '/salesmanData'});//登陆成功后跳转到
                                    break
                                //代理跳转
                                case body.role === 3:
                                    this.$router.push({path: '/agencyData'});//登陆成功后跳转到
                                    break
                            }*/
                          this.$router.push({path: '/'})
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
    .login-box{
        height: 100%;
        width: 100%;
    }
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        border-radius: 2px;
        background-clip: padding-box;
        margin: 0 auto;
        width: 400px;
        margin-top: 14%;
        padding: 35px 35px 15px 35px;
        background: rgba(255,255,255,1);
        border: 1px solid #eaeaea;
        /*box-shadow: 0 0 25px #cac6c6;*/
        box-sizing:border-box;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
    .login-bg{
        width: 100%;
        height: calc(100% - 36px);
        overflow: hidden;
        background: url("../../static/images/login-bg.jpg") no-repeat;
        background-size: 100% 100%;
        background-attachment:fixed;

    }
    .login-bottom{
        height: 36px;
        line-height: 36px;
        color: #fff;
        text-align: center;
        font-size: 12px;
        width: 100%;
        background-color: #333;
    }
</style>
