<!-- 全局模态框组件
用于显示全局的模态框，比如登录、注册、修改密码等 -->
<template>
    <transition name="model-box-fade">
        <div class="model-box" @click.self="boxhide">
            <div class="model-box-header">
                <slot name="header"></slot>
            </div>
            <div class="model-box-body">
                <slot name="body"></slot>
            </div>
            <div class="model-box-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
    const emit = defineEmits(['childboxtoggle'])
    const boxhide = () => {
        emit('childboxtoggle', false)
    }


</script>

<style scoped>
    .model-box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

    }

   .model-box-header {
        width: 600px;
        height: 50px;
        background-color:rgba(235,235,235,0.8);
        border-radius: 30px 30px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

   .model-box-body {
        width: 600px;
        height: 400px;
        background-color: rgba(235,235,235,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
    }

   .model-box-footer {
        width: 600px;
        height: 50px;
        background-color:rgba(235,235,235,0.8);
        border-radius: 0 0 30px 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .model-box-fade-enter-active, .model-box-fade-leave-active {
        transition: opacity 0.5s;
    }

   .model-box-fade-enter, .model-box-fade-leave-to {
        opacity: 0;
   }
</style>