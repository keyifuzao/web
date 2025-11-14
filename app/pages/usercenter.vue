<template>
    <Header></Header>
    <main class="usrBox">
        <div class="usrMenu">
            <ul>
                <li v-for="item in usrMenu" @click="itemIndex=item.idx" :class="{active:itemIndex===item.idx}">{{ item.title }}</li>
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
<style scoped lang="scss">
$fontSize: 0.12rem;
$bgColorA: rgba(235,155,0,1);
$bgColorB: rgba(235,235,235,1);
.usrBox {
    margin: 0 auto;
    display: flex;
    width: $fontSize*75;
    height: $fontSize*36;
    border-radius: $fontSize;
    .usrMenu {
        margin-right: $fontSize*0.5;
        padding: $fontSize 0;
        width: $fontSize*12;
        height: $fontSize*36;
        border-radius: $fontSize;
        background-color: $bgColorB;
        box-sizing: border-box;
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            li {
                width: $fontSize*12;
                height: $fontSize*3;
                line-height: $fontSize*3;
                font-size: $fontSize*0.8;
                text-align: center;
                cursor: pointer;
                &.active {
                    background-color: $bgColorA;
                }
                &:hover {
                    background-color: $bgColorA;
                }
            }
        }
    }
   .usrDisplay {
        margin-left: $fontSize*0.5;
        flex: 1;
        background-color: $bgColorB;
        border-radius: $fontSize;
    }
}


</style>