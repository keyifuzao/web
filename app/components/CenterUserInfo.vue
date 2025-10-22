<template>
    <div class="centerUserBox">
        <div class="centerUserInfo">
            <form class="usrInfoForm" @submit.prevent="submitInfo">
                <div class="uuidBox">
                    <label for="uuid">UUID:</label>
                    <input disabled="false" type="text" id="uuid" name="uuid"  v-model="UUID"></input>
                </div>
                <div class="usernameBox">
                    <label for="username">用户名:</label>
                    <input  type="text" id="username" name="username"  required placeholder="请输入用户名" v-model="userName"></input>
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
                    <input type="radio" id="male" name="gender" value="1" required v-model="genders"></input>
                    <label class="genderlabel" for="male">男</label>
                    <input type="radio" id="female" name="gender" value="0" required v-model="genders"></input>
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
                <div class="rolebox">
                    <label for="role">权限:</label>
                    <input disabled="true" type="text" v-model="Role"></input>
                </div>
                <div class="btnBox">
                    <button type="button" :class="{'active': toggleShow}" @click="previewInfo" >{{ toggleShow ? '关闭' : '更新数据' }}</button>
                    <button  type="submit">保存提交</button>
                </div>
            </form>
        </div>
        <div class="previewBox">
            <img :class="{'active': toggleShow}" src="../assets/img/userimg.jpg" alt="userimg" >
            <span class="title" v-if="!toggleShow">{{ userNameShow? userNameShow : '' }}</span>
            <div class="previewInfo" v-if="toggleShow">
                <span>昵称:{{userNameShow? userNameShow : 'User'}}</span>
                <span>城市:{{ cityShow ? cityShow : 'Beijing'}}</span>
                <span>年龄:{{ageShow ? ageShow : '20'}}岁</span>
                <span>邮箱:{{ eMailShow ? eMailShow : 'User@email.com'}}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useAccountStore } from '../stores/accountStore'
    import { UtilsWebRequests } from '../utils/utilsAccount'

    //输入部分
    const accountStore = useAccountStore()
    const webRequests = new UtilsWebRequests()
    const UUID = ref<number>(100001)
    const userName = ref('')
    const eMail = ref('')
    const phoneNumer = ref<number>(10001)  
    const genders = ref<number>(0)
    const birthDay =ref('')
    const cityinfo = ref('')
    const roleVal = ref<number>(0)
    const Role = computed(() =>  roleVal.value? '管理员' : '普通用户'  ) 
    //展示区域
    const toggleShow = ref(false)
    const userNameShow = ref('')
    const eMailShow = ref('')
    const ageShow = ref<number>() 
    const cityShow = ref('')
    //初始化用户信息
    const preRequestInfo = async () => {
        const { username, token } = accountStore.getCookie('token', 'fuzao_secret_key') as { username: string, token: string }
        await webRequests.getUsrInfo( username, token )
        preShowUserInfo()
    }
    const preShowUserInfo = () => {
        const { uuid,username, email, birthday, tel, gender, city, role } = accountStore.$state.userInfoData
        syncUserInfoToPage(uuid,username, email, birthday, tel, gender, city, role)
    }
    const InitWebUserInfo = (): void => {
        const webUserInfoCookie = accountStore.getCookie("userInfo", "fuzao_secret_key")
        if (webUserInfoCookie) {
            const { uuid,username, email, birthday, tel, gender, city, role } = webUserInfoCookie as { uuid: number, username: string, email: string, birthday: string, tel: number, gender: number, city: string, role: number }
            syncUserInfoToPage(uuid,username, email, birthday, tel, gender, city, role)
        }else {
            preRequestInfo()
            InitWebUserInfo()
        }
    }
    //同步数据
    const syncUserInfoToPage = (uuid: number, username: string, email: string, birthday: string, tel: number, gender: number, city: string, role: number) => {
        UUID.value = uuid
        userName.value = userNameShow.value = username
        eMail.value = eMailShow.value = email
        birthDay.value  = birthday
        ageShow.value = baithToAge(birthday)
        cityinfo.value = cityShow.value = city
        genders.value = gender
        phoneNumer.value = tel
        roleVal.value = role
    }
    //年龄与生日转换
    const baithToAge = (birthDay: string): number => {
        const birthDate = new Date(birthDay)
        const nowDate = new Date()
        const diffTime = Math.abs(nowDate.getTime() - birthDate.getTime())
        const age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        return age
    }
    //信息预览
    const previewInfo = () => {
        if (!toggleShow.value) {
            preShowUserInfo()
            toggleShow.value = true
        }else{
            toggleShow.value = false
        }
    }
    const syncStoreToWeb = () => {
        const { uuid,username, email, birthday, tel, gender, city, role } = accountStore.$state.userInfoData
        accountStore.setCookie("userInfo", { uuid,username, email, birthday, tel, gender, city, role },1, "fuzao_secret_key")
    }
    //信息提交
    const submitInfo = () => {
        const { token } = accountStore.getCookie('token', 'fuzao_secret_key') as { username: string, token: string }
        webRequests.updateUsrInfo(
            userName.value,
            token,
            eMail.value,
            birthDay.value,
            phoneNumer.value,
            genders.value,
            cityinfo.value,
            roleVal.value
        )
        syncStoreToWeb()
    }

    onMounted(() => {
        preRequestInfo()
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
        margin-top: 30px;
    }
    .centerUserInfo .usrInfoForm div{
        margin: 15px;
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
        margin: 120px 0 0 0;
        width: 500px;
        height: 140px;

    }
    .centerUserInfo .usrInfoForm .btnBox button {
        margin: 10px 50px;
        width: 400px;
        height: 50px;
        border: none;
        border-radius: 25px;
        font-size: 20px;
        background-color: rgb(200, 200, 200);
        color: rgb(50 , 50, 50);
        cursor: pointer;
        transition: all 0.5s ease-in-out;
    }
    .centerUserInfo .usrInfoForm .btnBox button:hover {
        background-color: rgb(255, 135, 0);
    }
    .centerUserInfo .usrInfoForm .btnBox button.active {
        transform: scale(1.1);
        transition: all 0.5s ease-in-out;
        color: white;
        background-color: rgb(255 , 135, 0);
    }
    .previewBox {
        width: 500px;
        height: 780px;
        border-radius: 30px;
        background-color: rgb(235, 235, 235);;
    }
    .previewBox img {
        margin: 120px 50px 50px 50px;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        transition: all 0.5s ease-in-out;
    }
    .previewBox img:hover {
        transform: scale(1.1);
        transition: all 0.5s ease-in-out;
    }
    .previewBox img.active {
        margin: 80px 100px;
        width: 300px;
        height: 300px;
        transform:translateY(-30px);
        transition: all 0.5s ease-in-out;
    }
    .previewBox .title {
        display: block;
        margin: 50px;
        font-size: 36px;
        font-weight:bold;
        text-align: center;
    }
    .previewBox .previewInfo span {
        display: block;
        margin: 10px;
        font-size: 24px;
        font-weight:lighter;
        text-align: center;
    }
</style>