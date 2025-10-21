<template>
    <div class="centerUserBox">
        <div class="centerUserInfo">
            <form class="usrInfoForm" @submit.prevent="submitInfo">
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
                    <input type="radio" id="male" name="gender" value="1" required v-model="gender"></input>
                    <label class="genderlabel" for="male">男</label>
                    <input type="radio" id="female" name="gender" value="0" required v-model="gender"></input>
                    <label class="genderlabel" for="female">女</label>
                </div>
                <div class="ageBox">
                    <label for="birthday">生日:</label>
                    <input type="date" id="birthday" name="birthday" required placeholder="请选择生日" v-model="birthDay"></input>
                </div>
                <div class="cityBox">
                <label for="city">城市:</label>
                    <select id="city" name="city" required v-model="cityinfo">
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
                    <button type="submit" @click="previewInfo()">更新预览</button>
                    <button type="submit">保存提交</button>
                </div>
            </form>
        </div>
        <div class="previewBox">
            <img src="../assets/img/userimg.jpg" alt="userimg" >
            <div class="previewInfo" v-show="toggleShow">
                <span>昵称:{{userNameShow? userNameShow : '未填写'}}</span>
                <span>城市:{{ cityShow ? cityShow : '未填写'}}</span>
                <span>年龄:{{ageShow ? ageShow : '未填写'}}岁</span>
                <span>邮箱:{{ eMailShow ? eMailShow : '未填写'}}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { setInterval } from 'timers'
import { useAccountStore } from '../stores/accountStore'
    import { UtilsWebRequests } from '../utils/utilsAccount'
    import { setTimeout } from 'timers/promises'

    //输入部分
    const accountStore = useAccountStore()
    const webRequests = new UtilsWebRequests()
    const userName = ref('')
    const eMail = ref('')
    const phoneNumer = ref<number>()  
    const gender = ref<number>()
    const birthDay =ref('')
    const cityinfo = ref('')
    //展示区域
    const toggleShow = ref(true)
    const userNameShow = ref('')
    const eMailShow = ref('')
    const ageShow = ref<number>() 
    const cityShow = ref('')
    //初始化用户信息
    const InitWebUserInfo = (): void => {
        const webUserInfoCookie = webRequests.accountStore.getCookie("userInfo", "fuzao_secret_key")
        if (webUserInfoCookie) {
            const { username, email, age, tel, sex, city, role } = webUserInfoCookie as { username: string, email: string, age: string, tel: number, sex: number, city: string, role: number }
            syncUserInfo(username, email, age, tel, sex, city, role)
        }else {
            const { username, token } = accountStore.getCookie('token', 'fuzao_secret_key') as { username: string, token: string }
            webRequests.getUsrInfo( username, token )
            InitWebUserInfo()
        }
    }
    //同步数据
    const syncUserInfo = (username: string, email: string, age: string, tel: number, sex: number, city: string, role: number) => {
        userName.value = userNameShow.value = username
        eMail.value = eMailShow.value = email
        birthDay.value  = age
        ageShow.value = baithToAge(age)
        cityinfo.value = cityShow.value = city
        gender.value = sex
        phoneNumer.value = tel
    }
    //年龄与生日转换
    const baithToAge = (birthDay: string): number => {
        const birthDate = new Date(birthDay)
        const nowDate = new Date()
        const diffTime = Math.abs(nowDate.getTime() - birthDate.getTime())
        const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        return age
    }
    //数据库数据展示
    const autoShowInfo = () => {

    }
    //信息预览
    const previewInfo = () => {
        toggleShow.value = true
        userNameShow.value = userName.value
        eMailShow.value = eMail.value
        ageShow.value = baithToAge(birthDay.value)
        cityShow.value = cityinfo.value
    }
    //信息提交
    const submitInfo = () => {

    }

    onMounted(() => {
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