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
            <div class="inputGroup">
                <input type="text" placeholder="请输入标题" v-model="titleShow"/>
                <input type="date" v-model="dateShow"/>
            </div>
            <div class="btn">
                <button @click="saveData()" >获取</button>
                <button @click="showData()" >返回</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useHomeStore } from '#imports'
    const homeStore = useHomeStore()
    const titleShow = ref<string>("我们已经结婚")
    const toggleShow = ref<boolean>(false)
    const Hours = ref<string>("")
    const Days = ref<string>("")
    const dateShow = ref<string>("2025-08-29")
    const saveData = () => {
        homeStore.setDays(dateShow.value)
    }
    const showData = () => {
        toggleShow.value = !toggleShow.value
        Hours.value = homeStore.widgetsClock.Hours
        Days.value = homeStore.widgetsClock.Days
    }
    onMounted(() => {
        saveData()
        Hours.value = homeStore.widgetsClock.Hours
        Days.value = homeStore.widgetsClock.Days
    })
</script>
<style scoped lang="scss">
    $fontSize: 0.12rem;
   .days {
        padding: $fontSize*0.8;
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        font-family: 'Times New Roman', Times, serif;
        box-sizing: border-box;
        h2 {
            padding: 0;
            margin: 0;
            font-size: $fontSize*0.8;
            color: rgb(100, 100, 100);
        }
        p {
            color: rgb(100, 100, 100);
            font-size: $fontSize*0.8;
            margin: $fontSize*0.4 0;
            padding: 0;
        }
        span {
            font-size: $fontSize*4;
            font-weight: bolder;
            cursor: pointer;
            b {
                font-size: $fontSize;
            }
        }
    }
    .input {
        padding: $fontSize*0.8;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        font-family: 'Times New Roman', Times, serif;
        box-sizing: border-box;
        h2 {
            padding: 0;
            margin: 0;
            font-size: $fontSize*0.8;
            color: rgb(100, 100, 100);
        }
        .inputGroup {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            input {
                width:$fontSize*8;
                margin-bottom: $fontSize*0.6;
                border: none;
            }
        }
        .btn {
            button {
                margin: $fontSize*0.5;
                height: $fontSize*1.2;
                font-size: $fontSize*0.6;
                border-radius: $fontSize*0.5;
                border: none;
                background-color: rgba(200, 200,200,1);
                cursor: pointer;
            }
        }
    }
    /* .days h2 {
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
    } */

</style>