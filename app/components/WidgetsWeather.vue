<!-- 这个是home页面倒计时的组件 -->
<template>
    <div>
        <div class="weatherFront" v-if="!toggleWeather">
            <h2>天气预报</h2>
            <p>{{ updateTime }}&nbsp;&nbsp;{{ city }}</p>
            <img :src="getWeatherIcon" alt="weatherIcon"
                @click="toggleWeather = !toggleWeather"><br />
            <div class="weatherInfo">
                <p>{{ weatherBaseInfo }}</p>
                <p>{{ weatherAddInfo }}</p>
                <p>{{ weatherWindInfo }}</p>
            </div>
        </div>
        <div class="weatherBack" v-else="toggleWeather">
            <h2>参数设置</h2>
            <div class="weatherParams">
                <div class="weatherInput">
                    <label for="secretKey">密钥：</label>
                    <input type="text" id="secretKey" v-model="secretKey">
                </div>
                <div class="weatherSelectCity">
                    <label for="city">城市：</label>
                    <select id="city" v-model="city" @change="getcityInfo()">
                        <option v-for="item in cityInfo" :value="item.name">{{ item.name }}</option>
                    </select>
                </div>
                <div class="weatherSelectRegion">
                    <label for="region">区划：</label>
                    <select id="region" v-model="region">
                        <option v-for="item in regionInfo" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>
            </div>
            <div class="weatherButtons">
                <button @click="getWeather()">获取天气</button>
                <button @click="toggleWeather = !toggleWeather">返回</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useWebFetchStore } from '#imports';
    const cityInfo = [{name: '北京市', Location_ID: '101010100'},{name: '上海市', Location_ID: '101020100'},{name: '天津市', Location_ID: '101030100'},
        {name: '重庆市', Location_ID: '101040100'},{name: '哈尔滨市', Location_ID: '101050101'},{name: '长春市', Location_ID: '101060101'},
        {name: '沈阳市', Location_ID: '101070101'},{name: '呼和浩特市', Location_ID: '101080101'},{name: '石家庄市', Location_ID: '101090101'},
        {name: '太原市', Location_ID: '101100101'},{name: '西安市', Location_ID: '101110101'},{name: '济南市', Location_ID: '101120101'},
        {name: '青岛市', Location_ID: '101120201'},{name: '乌鲁木齐市', Location_ID: '101130101'},{name: '拉萨市', Location_ID: '101140101'},
        {name: '西宁市', Location_ID: '101150101'},{name: '兰州市', Location_ID: '101160101'},{name: '银川市', Location_ID: '101170101'},
        {name: '郑州市', Location_ID: '101180101'},{name: '南京市', Location_ID: '101190101'},{name: '武汉市', Location_ID: '101200101'},
        {name: '杭州市', Location_ID: '101210101'},{name: '合肥市', Location_ID: '101220101'},{name: '福州市', Location_ID: '101230101'},
        {name: '南昌市', Location_ID: '101240101'},{name: '长沙市', Location_ID: '101250101'},{name: '贵阳市', Location_ID: '101260101'},
        {name: '成都市', Location_ID: '101270101'},{name: '广州市', Location_ID: '101280101'},{name: '昆明市', Location_ID: '101290101'},
        {name: '南宁市', Location_ID: '101300101'},{name: '海口市', Location_ID: '101310101'},{name: '香港', Location_ID: '101320101'},
        {name: '澳门', Location_ID: '101330101'},{name: '台北', Location_ID: '101340101'},
    ]
    const webFetchStore = useWebFetchStore();
    const secretKey = ref('301485d5a35d49a6b42b644122575025');
    const city = ref('郑州市');
    const region = ref('101180109');
    const regionInfo = ref<[{id: string, name: string}]>()
    const toggleWeather = ref(false);
    const updateTime = ref('');
    const weatherIcon = ref('');
    const weatherBaseInfo = ref('');
    const weatherAddInfo = ref('');
    const weatherWindInfo = ref('');
    const getcityInfo = () => {
        webFetchStore.getCityInfo(city.value)
    }
    const getWeather = () => {
        webFetchStore.$patch({
            key: secretKey.value,
            location: region.value
        })
        webFetchStore.fetchHomePageWeather();
    }
    const getWeatherIcon = computed(() => {
        return `../_nuxt/assets/weatherSource/QWeather-Icons-1.8.0/icons/${weatherIcon.value? weatherIcon.value: '100'}.svg`
    })
    const asnycWeatherData= () => {
            let dbs = webFetchStore.homePageWeather as { icon: string, temp: string, text: string, humidity: string, feelsLike: string, windDir: string, wind360: string, windScale: string, windSpeed: string } | null
            if(dbs){
                weatherIcon.value = dbs.icon
                weatherBaseInfo.value = `${dbs.temp}°C ${dbs.text}`
                weatherAddInfo.value = `湿度${dbs.humidity}% 体感${dbs.feelsLike}°C`
                weatherWindInfo.value = `风向${dbs.windDir}${dbs.wind360}° 风力${dbs.windScale}级 风速${dbs.windSpeed}km/h`
            }
        }
    const webInit = async() => {
        if(webFetchStore.region){
            regionInfo.value = webFetchStore.region as [{name:string, id:string}]
        }else{
            await webFetchStore.getCityInfo('郑州市');  
        }
        if(webFetchStore.homePageWeather){
            asnycWeatherData();
            updateTime.value = '更新于' + new Date(webFetchStore.updateTime).toLocaleString().split(' ')[1] as string
        }else{
            await webFetchStore.fetchHomePageWeather();          
        }
    }
    watch(webFetchStore.$state, (newVal) => {
        updateTime.value = '更新于' + new Date(newVal.updateTime).toLocaleString().split(' ')[1] as string
        asnycWeatherData();
        regionInfo.value = newVal.region as [{name:string, id:string}]

    })
    onMounted(() => {
        webInit();
    })

</script>
<style scoped lang="scss">
    $fontSize: 0.12rem;
    .weatherFront{
        padding: $fontSize*0.8;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Times New Roman', Times, serif;
        box-sizing: border-box;
        h2 {
            padding: 0;
            margin: 0;
            font-size: $fontSize*0.8;
            color: rgb(100, 100, 100);
        }
        p {
            margin: $fontSize*0.2;
            font-size: $fontSize*0.6;
            color: rgb(100, 100, 100);
        }
        img {
            margin: 0;
            width:$fontSize*4;
            height:$fontSize*4;
            cursor: pointer;
        }
        .weatherInfo {
            font-size: $fontSize*0.8;
            color: rgb(100, 100, 100);
            p {
                margin: $fontSize*0.2;
                text-align: center;
            }
        }
    }
    .weatherBack {
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
        .weatherParams {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .weatherInput {
                display: flex;
                align-items: center;
                label {
                    display: inline-block;
                    font-size: $fontSize*0.6;
                }
                input {
                    margin: $fontSize*0.5;
                    padding: $fontSize*0.5;
                    width: $fontSize*6;
                    height: $fontSize;
                    font-size: $fontSize*0.6;
                    border-radius: $fontSize*0.5;
                    border: none;
                    outline: none;
                    box-sizing: border-box;
                }
            }
            .weatherSelectCity {
                display: flex;
                align-items: center;
                label {
                    display: inline-block;
                    font-size: $fontSize*0.6;
                }
                select {
                    margin: $fontSize*0.5;
                    padding: $fontSize*0.5;
                    width: $fontSize*6;
                    height: $fontSize;
                    font-size: $fontSize*0.6;
                    background-color: rgb(255,255,255);
                    border-radius: $fontSize*0.5;
                    border: none;
                    outline: none;
                    box-sizing: border-box;
                }
            }
           .weatherSelectRegion {
                display: flex;
                align-items: center;
                label {
                    display: inline-block;
                    font-size: $fontSize*0.6;
                }
                select {
                    margin: $fontSize*0.5;
                    padding: $fontSize*0.5;
                    width: $fontSize*6;
                    height: $fontSize;
                    font-size: $fontSize*0.6;
                    background-color: rgb(255,255,255);
                    border-radius: $fontSize*0.5;
                    border: none;
                    outline: none;
                    box-sizing: border-box;
                }
            }
        }
        .weatherButtons {
            display: flex;
            align-items: center;
            justify-content: center;
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
</style>