<template>
    <div class="centerUserBox">
        <div class="centerUserInfo">
            <form class="usrInfoForm" @submit.prevent="submitInfo">
                <div class="uuidBox">
                    <label for="uuid">UUID:</label>
                    <input disabled="false" type="text" id="uuid" name="uuid"  v-model="uuidInfo"></input>
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
                    <label for="male">男</label>
                    <input type="radio" id="female" name="gender" value="0" required v-model="genders"></input>
                    <label for="female">女</label>
                </div>
                <div class="ageBox">
                    <label for="birthday">生日:</label>
                    <input type="date" id="birthday" name="birthday" required placeholder="请选择生日" v-model="birthDay"></input>
                </div>
                <div class="cityBox">
                    <label for="city">城市:</label>
                    <select id="city" name="city" required v-model="cityInfo">
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
                    <input disabled="true" type="text" v-model="roleShow"></input>
                </div>
                <div class="signatureBox">
                    <label for="signature">签名:</label>
                    <textarea id="signature" name="signature" placeholder="请输入签名" v-model="signatureInfo" maxlength="20"></textarea>
                </div>
                <div class="btnBox">
                    <button type="button" :class="{'active': toggleUserCard }" @click="previewInfo" >{{ toggleUserCard ? '关闭' : '获取数据' }}</button>
                    <button  type="submit">保存提交</button>
                </div>
            </form>
        </div>
        <div class="previewBox">
            <img :class="{'active': toggleUserCard }" src="../assets/img/userimg.jpg" alt="userimg" >
            <div class="previewInfoBase" v-if="!toggleUserCard">
                <span class="title" >{{ userName ? userName : '' }}</span>
                <p class="signature" >{{ signatureInfo ? signatureInfo : '' }}</p>
            </div>
            <div class="previewInfoMore" v-if="toggleUserCard">
                <span>{{userName}}</span>
                <span>{{ cityInfo}}&nbsp &nbsp{{birthDayToAge }}岁</span>
                <span>{{ eMail}}</span>
                <span>{{ updateTimeShow }}</span>
                <span>{{ createTimeShow}}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { UserCenterPage } from '../utils/utilsUserPages'

    const userCenterPage = new UserCenterPage()
    const uuidInfo = ref<number>()
    const userName = ref('')
    const eMail = ref('')
    const phoneNumer = ref<number>()
    const genders = ref<number>()
    const birthDay =ref('')
    const cityInfo = ref('')
    const roleVal = ref<number>()
    const signatureInfo = ref('')
    const updateTime = ref<string>()
    const createTime = ref<string>()
    const roleShow = computed(() =>  roleVal.value ? '管理员' : '普通用户'  )
    const toggleUserCard = ref(false)
    const birthDayToAge = computed(() =>  userCenterPage.__birthToAge(birthDay.value)  )
    const updateTimeShow = computed(()=> {if (updateTime.value) {return Math.floor((new Date().getTime() - new Date(updateTime.value).getTime())/1000/60/60)+'小时前更新了数据'}})
    const createTimeShow = computed(()=> {if (createTime.value) {return '陪伴您'+Math.floor((new Date().getTime() - new Date(createTime.value).getTime())/1000/60/60)+'小时了'}})
    const previewInfo = async () => {
        toggleUserCard.value = !toggleUserCard.value
        if (toggleUserCard.value) {
            const res = await userCenterPage.__previewUserInfo()
            if(!res)return null
            syncUserInfoToPage(res.uuid, res.username, res.email, res.birthday, res.tel, res.gender, res.city, res.role, res.signature, res.update_time, res.create_time)
        }
    }
    const syncUserInfoToPage = (uuid: number, username: string, email: string, birthday: string, tel: number, gender: number, city: string, role: number, signature: string, update_time: string, create_time: string) => {
        uuidInfo.value = uuid;userName.value = username;eMail.value = email;birthDay.value  = birthday
        cityInfo.value = city;genders.value = gender;phoneNumer.value = tel;roleVal.value = role
        signatureInfo.value = signature;updateTime.value = update_time;createTime.value = create_time
    }
    const submitInfo = async() => {
        const data = {
            uuid: uuidInfo.value as number,
            username: userName.value,
            email: eMail.value,
            birthday: birthDay.value,
            tel: phoneNumer.value as number,
            gender: genders.value as number,
            city: cityInfo.value,
            signature: signatureInfo.value,
        }
        await userCenterPage.__patchUserInfo(data)
    }
    onMounted(async () => {
        const res = await userCenterPage.__previewUserInfo()
        if(!res)return null
        syncUserInfoToPage(res.uuid, res.username, res.email, res.birthday, res.tel, res.gender, res.city, res.role, res.signature, res.update_time, res.create_time)
    })
</script>
<style scoped lang="scss">
    $fontSize: 0.12rem;
    $color: rgb(235, 235, 235);
    $bgColor: rgb(235, 235, 235);
    $bgColorB: rgb(200, 200, 200);
    $bcColorC: rgb(255, 135, 0);
    .centerUserBox {
        display: flex;
        justify-content: space-between;
        width: $fontSize * 40.5;
        height: $fontSize * 36;
        .centerUserInfo {
            flex: 0 0 $fontSize*20;
            border-radius: $fontSize;
            background-color: $bgColor;
            padding: $fontSize 0;
            font-size: $fontSize * 0.8;
            .usrInfoForm {
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                div {
                  display: flex;
                  margin: $fontSize * 0.3;
                  width: $fontSize *16; 
                  height: $fontSize *2; 
                    label {
                        flex:0 0 $fontSize * 4;
                        line-height: $fontSize * 2;
                        text-align: left;
                        display: inline-block;
                    }
                    input, select{
                        flex:1;
                        margin: $fontSize * 0.25;
                        height: $fontSize * 1.5;
                        border: none;
                        border-radius: $fontSize * 0.75;
                    }
                }
                .genderBox {
                    #male, #female {
                        margin: $fontSize *0.6;
                        width: $fontSize * 0.8;
                        height: $fontSize * 0.8;
                    }
                }
                .signatureBox {
                    height: $fontSize * 4;
                    textarea {
                        width: $fontSize * 12;
                        height: $fontSize * 4;
                        border: none;
                        border-radius: $fontSize * 0.8;
                    }
                }
                .btnBox {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: $fontSize 0;
                    width: $fontSize * 16;
                    height: $fontSize * 6;
                    button {
                        margin: $fontSize * 0.3;
                        width: $fontSize * 16;
                        height: $fontSize * 2;
                        border: none;
                        border-radius: $fontSize ;
                        background-color: $bgColorB;
                        cursor: pointer;
                        &:hover {
                             background-color:$bcColorC
                        }
                        &.active {
                            transform: scale(1.1);
                            transition: all 0.5s ease-in-out;
                            color: $color;
                            background-color: $bcColorC;
                        }
                    }
                }
            }
        }
        .previewBox {
            flex:0 0 $fontSize*20;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            border-radius: $fontSize;
            font-size: $fontSize * 0.8;
            background-color: $bgColor;
            img {
                width: $fontSize * 14;
                height: $fontSize * 14;
                border-radius: $fontSize * 7;
                transition: all 0.5s ease-in-out;
                &.active {
                    width: $fontSize * 12;
                    height: $fontSize * 12;
                    border-radius: $fontSize * 6;
                    transform:translateY(- $fontSize * 4);
                    transition: all 0.5s ease-in-out;
                }
            }
            .previewInfoBase {
                flex: 0 0 $fontSize*12;
                padding: $fontSize;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .title {
                    font-size: $fontSize * 1.5;
                    font-weight: bolder;
                    text-align: center;
                }
                .signature {
                    font-size: $fontSize * 0.8;
                    font-weight: lighter;
                    text-align: center;
                }
            
            }
            .previewInfoMore {
                flex: 0 0 $fontSize*12;
                padding: $fontSize;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                span {
                    margin: $fontSize * 0.4;
                    font-size: $fontSize ;
                    text-align: center;
                    &:nth-child(4), &:nth-child(5) {
                        font-size: $fontSize * 0.9;
                        font-weight: lighter;
                    }
                }
            }
        }
    }
    // .previewBox {
    //     width: 500px;
    //     height: 780px;
    //     border-radius: 30px;
    //     background-color: rgb(235, 235, 235);;
    // }
    // .previewBox img {
    //     margin: 150px 80px 30px 80px;
    //     width: 340px;
    //     height: 340px;
    //     border-radius: 50%;
    //     transition: all 0.5s ease-in-out;
    // }
    // .previewBox img:hover {
    //     transform: scale(1.1);
    //     transition: all 0.5s ease-in-out;
    // }
    // .previewBox img.active {
    //     margin: 100px;
    //     width: 300px;
    //     height: 300px;
    //     transform:translateY(-5px);
    //     transition: all 0.5s ease-in-out;
    // }
    // .previewBox .title {
    //     display: block;
    //     margin: 30px 50px;
    //     font-size: 36px;
    //     font-weight:bold;
    //     text-align: center;
    // }
    // .previewBox .signature {
    //     display: block;
    //     margin: 30px 50px;
    //     font-size: 20px;
    //     font-weight:lighter;
    //     text-align: center;
    // }
    // .previewBox .previewInfo span {
    //     display: block;
    //     margin: 10px;
    //     font-size: 24px;
    //     font-weight:lighter;
    //     text-align: center;
    // }
</style>