<template>
    <Header></Header>
    <div class="essayShow">
        <div class="titleBox">
            <h2>{{ getEssayContent?.title || '标题不存在' }}</h2>
        </div>
        <div class="contentInfo">
            <span>文章ID:{{getEssayContent?.essayId || 'undefined'}}</span>&emsp;&emsp;&emsp;
            <span>作者:{{ getEssayContent?.author || 'undefined' }}</span>&emsp;&emsp;&emsp;
            <span>创建日期:{{ getEssayContent?.create_time || 'undefined' }}</span>&emsp;&emsp;&emsp;
            <p v-html="htmlContent"></p>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup lang="ts">
    import Footer from '~/components/Footer.vue';
    import Header from '~/components/Header.vue';
    const router = useRoute();
    const htmlContent = computed(() => {
        return getEssayContent.value?.content || '内容不存在'
    })
    const essayId = router.params.id as string
    const getEssayContent:Ref<{uuid: string, essayId: number,type: string, title: string, content: string, author: string, create_time: string, update_time: string} | null> = computed(() => {
        const techEssay = localStorage.getItem('techList')? JSON.parse(localStorage.getItem('techList') as string) : []
        const lifeEssay = localStorage.getItem('lifeList') ? JSON.parse(localStorage.getItem('lifeList') as string) : []
        let essayObj = [ ...techEssay,...lifeEssay ]
        const essayRes = essayObj.filter(item => item.essayId === parseInt(essayId))
        return essayRes[0]
    })

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