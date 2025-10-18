<template>
    <Header></Header>
    <main class="usrBox">
        <div class="usrMenu">
            <ul>
                <li v-for="item in 15">开发中</li>
            </ul>
        </div>
        <div class="usrInfo">
            <h1>用户中心</h1>
            <form >
                <label for="username">用户名:</label>
                <input type="text" id="username" name="username" v-model="usrNm" required placeholder="请输入用户名">
                <br />
                <label for="email">邮箱:</label>
                <input type="email" id="email" name="email" required></input>
                <br />
                <label for="phone">手机号:</label>
                <input type="tel" id="phone" name="phone" required></input>
                <br />
                <label for="gender">性别:</label>
                <input type="radio" id="male" name="gender" value="male" required>
                <label class="genderBox" for="male">男</label>
                <input type="radio" id="female" name="gender" value="female" required>
                <label class="genderBox" for="female">女</label>
                <br />
                <label for="birthday">生日:</label>
                <input type="date" id="birthday" name="birthday" required></input>
                <br />
                <label for="city">城市:</label>
                <select id="city" name="city" required>
                    <option value="">请选择</option>
                    <option value="beijing">北京</option>
                    <option value="shanghai">上海</option>
                    <option value="guangzhou">广州</option>
                    <option value="shenzhen">深圳</option>
                </select>
                <br />
                <div class="btnBox">
                    <button type="submit">预览</button>
                    <button type="submit">提交</button>
                </div>
            </form>
        </div>
        <div class="usrDisplay">
            <img src="../assets/img/userimg.jpg" alt="userimg">
            <p>昵称:keyifuzao</p>
            <p>城市:北京</p>
            <p>生日:1993-03-15</p>
            <p>邮箱:157550216@qq.com</p>
        </div>
    </main>
    <Footer></Footer>
</template>
<script setup lang="ts"> 
    const usrNm = ref('');
</script>
<style scoped>
    @import url('../assets/css/usercenter.css');

</style>