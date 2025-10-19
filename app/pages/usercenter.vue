<template>
    <Header></Header>
    <main class="usrBox">
        <div class="usrMenu">
            <ul>
                <li v-for="item in usrMenu" @click="itemIndex=item.idx">{{ item.title }}</li>
            </ul>
        </div>
        <div class="usrInfo">
            <CenterUserInfo v-if="itemIndex===1"></CenterUserInfo>
            <CenterUserStyle v-if="itemIndex===2"></CenterUserStyle>
            <CenterUserResource v-if="itemIndex===3"></CenterUserResource>
        </div>
        <div class="usrDisplay">
        </div>
    </main>
    <Footer></Footer>
</template>
<script setup lang="ts"> 
    const usrMenu = [
        {title: '用户管理' ,idx:1},
        {title: '样式设置' ,idx:2},
        {title: '资源管理' ,idx:3}
    ]
    const itemIndex = ref(1)
</script>
<style scoped>
    @import url('../assets/css/usercenter.css');

</style>