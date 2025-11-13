<template>
    <div class="loginPage">
        <div class="loginMain">
            <div class="loginInfo">信息栏</div>
            <div class="loginContainer">
                <span id="loginTitle">欢迎使用本系统</span>
                <form @submit.prevent="login()">
                    <div id="usrName">
                        <label>用户名:</label>
                        <input type="text" v-model="loginName" placeholder="请输入用户名">
                    </div>
                    <div id="usrPassword">
                        <label>密码:</label>
                        <input type="password" v-model="loginPassword" placeholder="请输入密码" autocomplete="off">
                    </div>
                    <button type="submit">登录</button>
                    <div id="usrOption">
                        <p>忘记密码？<router-link to="/error">找回密码</router-link></p>
                        <p>你还没有账号？<span @click="handleRegisterToggle">注册</span></p>
                    </div>
                </form>
            </div>
        </div>
        <ModelBox v-if="registerToggle" @childboxtoggle="hideRegister">
            <template #header>
                <h2 id="registerTitle">加入我们</h2>
            </template>
            <template #body>
                <form class="registerForm" @submit.prevent="register()">
                    <div id="userName">
                        <label for="name">用户名:</label>
                        <input type="text" id="name" v-model.trim="registerName" placeholder="请输入用户名" />
                    </div>
                    <div id="userEmail">
                        <label for="email">邮 箱:</label>
                        <input type="email" id="email" v-model.trim="registerEmail" placeholder="请输入邮箱" />
                    </div>
                    <div id="userPassword">
                        <label for="password">密 码:</label>
                        <input type="password" id="password" v-model.trim="registerPassword" placeholder="请输入密码" />
                    </div>
                    <div id="userConfirm">
                        <label for="confirm_password">确认密码:</label>
                        <input type="password" id="confirm_password" v-model="registerConfirmPassword" placeholder="请再次输入密码" />
                    </div>
                    <div class="formToggle">
                        <p>{{ registerMsg }}</p>
                        <div id ="registerBtn">
                            <button type="submit">确认</button>
                            <button @click="registerToggle = false">关闭</button>
                        </div>
                    </div>
                </form>
            </template>
            <template #footer>
            </template>
        </ModelBox>
    </div>
</template>
<style scoped lang="scss">
@use '../assets/scss/variables' as _varStyle;
@use '../assets/scss/loginStyle' as _loginStyle;

$bgColor: red;
$containerBgColor: rgba(235, 235, 235, 0.6);
$radius: 30px;
$color: rgb(10, 10, 10);
$fortSize: 0.11rem;
.loginPage {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    .loginMain {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;
        height: 95%;
        border-radius: $radius;
        background: rgba(235, 235, 235, 1) url('../assets/img/loginbackgroundimg.jpg') center/cover no-repeat;
        opacity: 0.8;
        @each $name, $params in ('xxlarge': 1 ,'xlarge':1.2,'large':1.4,'medium':1.6,'small':1.8,'xsmall':2.5,'xxsmall':3) {
            @include _varStyle.responsive($name) {
                @if $name == 'small' or $name == 'xsmall' {
                    @include _loginStyle.loginStyleSE ($name, $fortSize * $params, $color, $containerBgColor, $radius); 
                }@else if $name == 'xxsmall' {
                    .loginInfo {
                        opacity: 0;
                    }
                    .loginContainer {
                        opacity: 0;
                    }
                }@else {
                    @include _loginStyle.loginStyle ($name, $fortSize * $params, $color, $containerBgColor, $radius); 
                }
            }
        }
    }
    #registerTitle {
        //其他配置在maxbox中，这里不用设置，继承
        margin: 0;
        padding: 0;
    }
    .registerForm {
        display: flex;
        flex-direction: column;
        align-items: center;
        #userName, #userEmail, #userPassword, #userConfirm {
            width: 80%;
            margin: 2% 0;
            label {
                display: inline-block;
                width: 30%;
                height: 1.6em;
                margin-right: 0.5em;
                text-align: right;
                color:$color;
            }
            input {
                width: 60%;
                height: 1.6em;
                border: none;
                outline: none;
                border-radius: 0.8em;
                background-color: rgba(235, 235, 235, 0.8);
                &:focus {
                    background-color: rgba(255, 255, 255, 1);
                }
            }
        }
        .formToggle {
            margin-top: $fortSize * 0.6;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p {
                margin: 0.5em auto;
                padding: 0;
                color: rgb(100, 100, 100);
                font-size: 0.8em;
            }
            #registerBtn button{
                width: 8em;
                height: 1.6em;
                margin: 1em;
                padding: 0.2em;
                border-radius: 0.8em;
                border: none;
                cursor: pointer;
                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }

}
</style>
<script setup lang="ts">
import { LoginPage } from '~/utils/utilsUserPages';
const loginPage = new LoginPage();
const loginName = ref('');
const loginPassword = ref('');
const login = () => loginPage.__login(loginName.value, loginPassword.value)
const registerToggle = ref(false);
const handleRegisterToggle = () => registerToggle.value = !registerToggle.value;
const hideRegister = (data: boolean) => registerToggle.value = data;

const registerName = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const registerConfirmPassword = ref('');
const register = async () => {
    await loginPage.__register(registerName.value, registerEmail.value, registerPassword.value, registerConfirmPassword.value)
    registerToggle.value = false;
}
const registerMsg = computed(() => loginPage.checkRegisterInfo(registerName.value, registerEmail.value, registerPassword.value, registerConfirmPassword.value).message)
</script>