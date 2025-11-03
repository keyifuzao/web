<template>
    <transition name="alert-box-fade">
        <div class="alert-box" @click.self="boxhide">
            <div class="alert-box-header">
                <slot name="header"></slot>
            </div>
            <div class="alert-box-body">
                <slot name="body"></slot>
            </div>
            <div class="alert-box-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
    const emit = defineEmits(['alertBoxToggle'])
    const boxhide = () => {
        emit('alertBoxToggle', false)
    }
</script>

<style scoped>
    .alert-box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 150;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .alert-box-header {
        width: 400px;
        height: 50px;
        background-color: rgba(235,235,235,0.8);
        border-radius: 30px 30px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .alert-box-body {
        width: 400px;
        height: 150px;
        background-color:rgba(235,235,235,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .alert-box-footer {
        width: 400px;
        height: 50px;
        background-color: rgba(235,235,235,0.8);
        border-radius: 0 0 30px 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .alert-box-fade-enter-active ,.alert-box-fade-leave-active {
        transition: opacity 0.5s;
    }
   .alert-box-fade-enter ,.alert-box-fade-leave-to {
        opacity: 0;
    }
</style>