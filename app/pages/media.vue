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

<style scoped lang="scss">
    $fontSize: 0.12rem;
    $color: rgb(235, 235, 235);
    $bgColor: rgb(235, 235, 235);
    $bgColorB: rgb(200, 200, 200);
    $bcColorC: rgb(255, 135, 0);
    .media_box {
        margin: 0 auto;
        display: flex;
        width: $fontSize*75;
        height: $fontSize*36;
        border-radius: $fontSize;
        background-color: $bgColor
    }
</style>