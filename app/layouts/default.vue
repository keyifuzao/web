<template>
    <div class="default-layout">
        <NuxtPage />
        <MessageAlert v-if="messageAlert" @alertBoxToggle="hideAlert">
            <template #header>
                <h3>提示</h3>
            </template>
            <template #body>
                <span class="alertMsg">{{ message }}</span>
            </template>
            <template #footer>
                <button class="alert-btn" @click="messageAlertClose">关闭</button>
            </template>
        </MessageAlert>
    </div>
</template>
<style scoped>
.default-layout {
    width: 100vw;
    height: 100vh;
}
.alertMsg {
    font-size: 20px;
}
.alert-btn {
    width: 100px;
    height: 30px;
    background-color:rgb(220, 220, 220);
    border-radius: 15px;
    cursor: pointer;
}

</style>
<script setup lang="ts">
    import { NuxtPage } from '#components';
    import { useAlertStore } from '#imports';
    const alertStore = useAlertStore();
    const messageAlert = ref(false);
    const message = ref('');
    const messageAlertClose = () => {
        alertStore.hideAlert();
        messageAlert.value = false;
    }
    const hideAlert = (data: boolean) => {
        alertStore.hideAlert();
        messageAlert.value = data;
    }
    watch(alertStore.$state, (newVal) => {
        newVal.show && (message.value = newVal.message, messageAlert.value = true);
    });
</script>