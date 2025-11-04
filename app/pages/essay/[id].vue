<template>
    <Header></Header>
    <div class="essayShow">
        <div class="titleBox">
            <h2>网友吐槽山姆APP界面盒马化, 前阿里高管接手引会员担忧</h2>
        </div>
        <div class="contentInfo">
            <span>编号:1001</span>
            <span>作者: Fuzao</span>
            <span>发布日期: 2022-01-01</span>
            <p>来源：鲁中晨报【#网友吐槽山姆变得像盒马#:APP产品图换成高饱和美图】#山姆的阿里味儿越来越重了#
近日,不少网友在小红书发文吐槽,自从前阿里高管接手山姆业务后,山姆变得越来越像盒马了:APP高饱和精修图、商品详情页放做好的菜、支付宝碰一下付款…..
有网友吐槽称，马上就能凑满减、先用后付、免密支付、跳转老东家淘宝了。
也有网友表示，喜欢山姆就是因为简单、界面清楚、不需要凑单，如果继续阿里化下去，就不打算续会员卡了。还有人分享退卡流程，帮助需要退卡的人。
10月27日,沃尔玛中国宣布,前阿里巴巴高管刘鹏加入沃尔玛中国并担任山姆会员店业态总裁。
你认为前阿里高管会“毁了”山姆，还是给山姆带来新的辉煌呢？
#山姆变得像盒马#（搜狐财经）</p>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup lang="ts">
import Footer from '~/components/Footer.vue';
import Header from '~/components/Header.vue';


</script>
<style scoped>
    .essayShow {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px auto;
        width: 1800px;
        height: 100%;
    }
    .essayShow .titleBox {
        margin: 10px;
        width:1780px;
        height: 100px;
        border-radius: 30px;
        background-color: rgb(235, 235, 235);
    }
    .essayShow .titleBox h2 {
        display: block;
        margin: 20px;
        text-align: center;
        font-size: 36px;
        font-weight: bold;
    }
    .essayShow .contentInfo {
        margin: 10px;
        width: 1780px;
        min-height: 600px;
        height: 100px;
        border-radius: 30px;
        text-align: center;
        background-color: rgb(235, 235, 235);
    }
    .essayShow .contentInfo p {
        display: block;
        margin: 20px;
        font-size: 20px;
        line-height: 28px;
        text-align: left;
    }

</style>