<!-- 这个是home页面纪念日的组件 -->
 <template>
    <div>
        <div class="days" v-show="!toggleShow">
            <h2>纪念日</h2>
            <p>{{ titleShow }}</p>
            <span @click="toggleShow = !toggleShow">{{ Days }}<b>天</b></span><br/>
            <p>{{ Hours }}<b>小时</b></p><br/>
        </div>
        <div class="input" v-show="toggleShow">
            <h2>参数设置</h2>
            <input type="text" placeholder="请输入标题" v-model="titleShow"/><br />
            <input type="date" v-model="dateShow"/><br />
            <button @click="timeCounter.saveDate" >获取</button>
        </div>
    </div>
</template>
<style scoped>
    .days h2 {
        display: block;
        font-family: 'Times New Roman', Times, serif;
        margin: 0 auto;
        font-size: 16px;
        font-weight:lighter;
        text-align: center;
    }
    .days span {
        display: block;
        margin: 0 auto;
        font-family: 'Times New Roman', Times, serif;
        font-size: 100px;
        font-weight: bold;
        color: rgb(50, 50, 50);
        text-align: center;
        cursor: pointer;
    }
    .days p {
        margin: 10px auto;
        font-family: 'Times New Roman', Times, serif;
        font-size: 20px;
        font-weight: bold;
        color: rgb(50, 50, 50);
        text-align: center;
    }
    .days p b, .days span b {
        font-size: 16px;
    }

    .input {
        padding: 20px;
        text-align: center;
        margin-top: 20px;
    }
    .input h2 {
        margin: 0 auto;
        font-family: 'Times New Roman', Times, serif;
        font-size: 20px;
        font-weight:lighter;
    }
    .input input {
        width: 200px;
        height: 30px;
        margin-top: 20px;
        border-radius: 15px;
        border: 1px solid #ccc;
    }
    .input button {
        width: 80px;
        height: 30px;
        margin-top: 20px;
        margin-right: 10px;
        border-radius: 15px;
        border: none;
        background-color: rgb(255, 135, 0);
        color: white;
        font-size: 16px;
        font-weight: lighter;
        cursor: pointer;
    }
    .input button:hover {
        background-color: rgb(255, 165, 0);
        transform: scale(1.1);
        transition: all 0.3s ease-out;
    }

</style>
<script setup lang="ts">
    import TimeCounter from '~/utils/utilsHomePage';
    const timeCounter = new TimeCounter.TimeCounter();
    const Days = timeCounter.Days;
    const Hours = timeCounter.Hours;
    const titleShow = timeCounter.titleShow;
    const dateShow = timeCounter.dateShow;
    const toggleShow = timeCounter.toggleShow;
    timeCounter.initDays();

</script>