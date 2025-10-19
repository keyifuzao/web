<template>
    <div class="centerUserBox">
        <div class="centerUserInfo">
            <form class="usrInfoForm" @submit.prevent="SubmitForm">
                <div class="usernameBox">
                    <label for="username">用户名:</label>
                    <input type="text" id="username" name="username"  required placeholder="请输入用户名" v-model="userName"></input>
                </div>
                <div class="passwordBox">
                    <label for="email">邮箱:</label>
                    <input type="email" id="email" name="email" required placeholder="请输入邮箱" v-model="eMail"></input>
                </div>
                <div class="telBox">
                    <label for="phone">手机号:</label>
                    <input type="tel" id="phone" name="phone" placeholder="请输入手机号" v-model="phoneNumer"></input>
                </div>
                <div class="genderBox">
                    <label for="gender">性别:</label>
                    <input type="radio" id="male" name="gender" value="male" required v-model="gender"></input>
                    <label class="genderlabel" for="male">男</label>
                    <input type="radio" id="female" name="gender" value="female" required v-model="gender"></input>
                    <label class="genderlabel" for="female">女</label>
                </div>
                <div class="ageBox">
                    <label for="birthday">生日:</label>
                    <input type="date" id="birthday" name="birthday" required placeholder="请选择生日" v-model="birthDay"></input>
                </div>
                <div class="cityBox">
                <label for="city">城市:</label>
                    <select id="city" name="city" required v-model="city">
                        <option value="">请选择</option>
                        <option value="北京">北京</option>
                        <option value="上海">上海</option>
                        <option value="广州">广州</option>
                        <option value="深圳">深圳</option>
                        <option value="杭州">杭州</option>
                        <option value="南京">南京</option>
                        <option value="成都">成都</option>
                        <option value="武汉">武汉</option>
                        <option value="西安">西安</option>
                        <option value="苏州">苏州</option>
                        <option value="郑州">郑州</option>
                        <option value="天津">天津</option>
                        <option value="长沙">长沙</option>
                        <option value="南昌">南昌</option>
                    </select>
                </div>
                <div class="btnBox">
                    <button type="submit" @click="previewInfo">预览</button>
                    <button type="submit">提交</button>
                </div>
            </form>
        </div>
        <div class="previewBox">
            <img src="../assets/img/userimg.jpg" alt="userimg" >
            <div class="previewInfo" v-show="toggleShow">
                <span>昵称:{{userNameShow}}</span>
                <span>城市:{{ cityShow }}</span>
                <span>生日:{{birthDayShow}}</span>
                <span>邮箱:{{ eMailShow }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { on } from 'events'
import { UtilsCookieTools } from '../utils/utilsAccount'
    const cookieTools = new UtilsCookieTools()
    const userName = ref('')
    const eMail = ref('')
    const phoneNumer = ref('')
    const gender = ref('')
    const birthDay = ref('')
    const city = ref('')
    const toggleShow = ref(false)
    const CookieUserName = cookieTools.GetCookies('userInfo', 'fuzao_secret') || null
    let userNameShow = "未定义"
    let eMailShow = "未定义"
    let birthDayShow = "未定义"
    let cityShow = "未定义"

    const previewInfo = () => {
        toggleShow.value = false
        userNameShow = userName.value
        eMailShow = eMail.value
        birthDayShow = birthDay.value
        cityShow = city.value
        toggleShow.value = true
    }
    const SubmitForm = () => {
        console.log(userName.value, eMail.value, phoneNumer.value, gender.value, birthDay.value, city.value)
    }
    // 页面加载完成后初始化用户信息
    const initUserInfo = () => {
        if (CookieUserName) {
            getNetUsrInfo(CookieUserName)
            userNameShow = CookieUserName
            toggleShow.value = true
        }
    }
    const getNetUsrInfo = (username: string) => {
        
    }
    onMounted(() => {
        initUserInfo()
    })

</script>
<style scoped>
    .centerUserBox {
        display: flex;
        justify-content:space-between;
        width: 1010px;
        margin: 10px auto;
    }
    .centerUserInfo {
        width: 500px;
        height: 780px;
        border-radius: 30px;
        background-color:rgb(235, 235, 235);
    }
    .centerUserInfo .usrInfoForm {
        margin-top: 70px;
    }
    .centerUserInfo .usrInfoForm div{
        margin: 20px;
        height: 40px;
    }
    .centerUserInfo .usrInfoForm div label {
        display: inline-block;
        width: 80px;
        font-size: 20px;
        text-align: center;
    }
    .centerUserInfo .usrInfoForm div input {
        width: 300px;
        height: 40px;
        border: none;
        border-radius: 10px;
        font-size: 20px;
    }
    .centerUserInfo .usrInfoForm .genderBox input {
        width: 20px;
        height: 20px;

    }
    .centerUserInfo .usrInfoForm .cityBox select {
        width: 300px;
        height: 40px;
        border: none;
        border-radius: 10px;
        font-size: 20px;
        background-color: rgb(255, 255, 255)
    }
    .centerUserInfo .usrInfoForm .btnBox {
        margin: 200px 0 0 0;
        width: 500px;
        height: 140px;

    }
    .centerUserInfo .usrInfoForm .btnBox button {
        margin: 10px 50px;
        width: 400px;
        height: 40px;
        border: none;
        border-radius: 10px;
        font-size: 20px;
        background-color: rgb(200, 200, 200);
        color: white;
        cursor: pointer;
    }
    .centerUserInfo .usrInfoForm .btnBox button:hover {
        background-color: rgb(255, 135, 0);
    }
    .previewBox {
        width: 500px;
        height: 780px;
        border-radius: 30px;
        background-color: rgb(235, 235, 235);;
    }
    .previewBox img {
        margin: 100px;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        transition: all 0.5s ease-in-out;
    }
    .previewBox img:hover {
        transform: scale(1.1);
        transition: all 0.5s ease-in-out;
    }
    .previewBox .previewInfo span {
        display: block;
        margin: 10px;
        font-size: 24px;
        font-weight:lighter;
        text-align: center;
    }
</style>