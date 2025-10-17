<!-- 这个是home页面时钟的组件 -->
 <template>
    <div >
        <h2>时钟clock</h2>
        <span>{{clock}}</span><br/>
        <p>{{week}}</p>
        <p>{{year}}年{{month}}月{{day}}日</p>
    </div>
 </template>
 <style scoped>
    div h2 {
        display: block;
        font-family: 'Times New Roman', Times, serif;
        margin: 0 auto;
        font-size: 16px;
        font-weight:lighter;
        text-align: center;
    }
    div span {
        display: block;
        margin: 20px auto;
        font-family: 'Times New Roman', Times, serif;
        font-size: 60px;
        font-weight: bold;
        color: rgb(50, 50, 50);
        text-align: center;
    }
    div p {
        display: block;
        margin: 0 auto;
        font-family: 'Times New Roman', Times, serif;
        font-size: 18px;
        font-weight: bold;
        color: rgb(50, 50, 50);
        text-align: center;
    }
</style>
 <script setup lang="ts">
    const clock = ref('00:00:00');
    const week = ref('星期一');
    const year = ref('2025');
    const month = ref('10');
    const day = ref('01');
    const getTimer=()=>{
        const date = new Date();
        clock.value = `${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}:${date.getSeconds() < 10 ? '0' : ''}${date.getSeconds()}`;
        week.value = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()]as string;
        year.value = (date.getFullYear()).toString();
        month.value = (date.getMonth() + 1).toString();
        day.value = date.getDate().toString();
    }

    getTimer();
    onMounted(() => {
        setInterval(() => {
            getTimer();
        },1000)
    })
</script>