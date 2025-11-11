<!-- 全局模态框组件
用于显示全局的模态框，比如登录、注册、修改密码等 -->
<template>
    <transition name="model-box-fade">
        <div class="modelBox" @click.self="boxhide">
            <div class ="modelMain">
                <div id="modelHeader">
                    <slot name="header"></slot>
                </div>
                <div id="modelBody">
                    <slot name="body"></slot>
                </div>
                <div id="modelFooter">
                    <slot name="footer"></slot>
                </div>
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

<style scoped lang="scss">
    @use '../assets/scss/variables' as _varStyle;
    .modelBox{
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
        @each $name, $fontSize in ('xxlarge': 0.12rem ,'xlarge':0.14rem,'large':0.16rem,'medium':0.18rem,'small':0.2rem,'xsmall':0.25rem,'xxsmall':0.3rem) {
            @include _varStyle.responsive($name){
            .modelMain{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: $fontSize * 20;
                height: $fontSize * 15;
                background-color: rgba(235,235,235,0.8);
                border-radius: 30px;
                #modelHeader, #modelFooter{
                    padding: $fontSize * 0.4;
                    font-size: $fontSize * 0.6;
                    text-align: center;
                    width: 100%;
                    height: $fontSize *1.2;

                }
                #modelBody{
                    width: 100%;
                    height: $fontSize * 12.6;
                    font-size: $fontSize * 0.7;
                    
                }
            }
        }
    }
}
</style>