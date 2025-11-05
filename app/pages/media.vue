<template>
    <Header></Header>
    <main class="media_box">
        <div class="webGLShow">
            <div class="webGLShow_button">
                <button>播放</button>
                <button>暂停</button>
                <button>加载</button>
            </div>
            <div class="webGLShow_content">
                这里是展示区域，等待开发
            </div>
        </div>
    </main>
    <Footer></Footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
    .media_box {
        display: flex;
        margin: 20px auto;
        width: 1800px;
        height: 800px;
    }
    .media_box .webGLShow {
        margin: 10px;
        width: 1780px;
        height: 780px;
        border-radius: 30px;
        background-color: rgb(230, 230, 230);
    }
    .media_box .webGLShow .webGLShow_button {
        display: flex;
        justify-content: left;
        align-items: center;
        width: 100%;
        height: 60px;
    }
    .media_box .webGLShow .webGLShow_button button {
        margin: 15px;
        width: 100px;
        height: 30px;
        border-radius: 15px;
        cursor: pointer;
    }
    .media_box .webGLShow .webGLShow_content {
        margin: auto;
        width: 1740px;
        height: 700px;
        background: rgb(150, 150, 150);
    }
</style>