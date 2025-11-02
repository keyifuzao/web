<template>
    <div class="login-page">
        <div class="login-info"></div>
        <div class="login-container">
            <span class="login-title">欢迎使用本系统</span>
            <form @submit.prevent="login()">
                <label>用户名:</label>
                <input type="text"  v-model="loginName" placeholder="请输入用户名"><br>
                <label>密码:</label>
                <input type="password"  v-model="loginPassword" placeholder="请输入密码"><br>
                <button type="submit" >登录</button>
                <p>忘记密码？<router-link to="/error">找回密码</router-link></p> 
                <p>你还没有账号？<span @click="handleRegisterToggle">注册</span></p>
            </form>
        </div>
    </div>
    <ModelBox v-if="registerToggle" @childboxtoggle="hideRegister">
        <template #header>
            <h2>加入我们</h2>
        </template>
        <template #body>
            <form class="register-form" @submit.prevent="register()" >
                <div class="form-group">
                    <label for="name">用户名:</label>
                    <input type="text" id="name" v-model.trim="registerName" placeholder="请输入用户名"/><br/>
                    <label for="email">邮  箱:</label>
                    <input type="email" id="email" v-model.trim="registerEmail" placeholder="请输入邮箱"/><br/>
                    <label for="password">密  码:</label>
                    <input type="password" id="password" v-model.trim="registerPassword" placeholder="请输入密码"/><br/>
                    <label for="confirm_password">确认密码:</label>
                    <input type="password" id="confirm_password" v-model="registerConfirmPassword" placeholder="请再次输入密码"/><br/>
                </div>
                <div class="form-toggle">
                    <p>{{ registerMsg }}</p>
                    <button  type="submit" >确认</button>
                    <button @click="registerToggle = false">关闭</button>
                </div>
            </form>
        </template>
        <template #footer>
        </template>
    </ModelBox>
</template>
<style scoped>
    @import url('~/assets/css/login.css');
</style>
<script setup lang="ts">
    import { LoginPage } from '~/utils/utilsUserPages';
    const loginPage = new LoginPage();
    const loginName = ref('');
    const loginPassword = ref('');
    const login =() => loginPage.__login(loginName.value, loginPassword.value)
    const registerToggle = ref(false);
    const handleRegisterToggle = () => registerToggle.value = !registerToggle.value;
    const hideRegister = (data: boolean) => registerToggle.value = data;
    
    const registerName = ref('');
    const registerEmail = ref('');
    const registerPassword = ref('');
    const registerConfirmPassword = ref('');
    const register = async() => {
        await loginPage.__register(registerName.value, registerEmail.value, registerPassword.value, registerConfirmPassword.value)
        registerToggle.value = false;
    }
    const registerMsg = computed(()=> loginPage.checkRegisterInfo(registerName.value, registerEmail.value, registerPassword.value, registerConfirmPassword.value).message)
</script>