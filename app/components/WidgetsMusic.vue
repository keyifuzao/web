<!-- 这是/home页面的音乐组件 -->
<template>
    <div class="musicWidget">
        <div class="musicPic" >
            <div class="container" :class="{'active': listtoggle}">
            <img :src="imgSrc" alt="music" v-show="!listtoggle" />
            <div class="musicList" v-show="listtoggle">
                <ul>
                    <li v-for="(item, index) in musicList" @click="player.jump(index)" :class="{'active': musicIndex === index}" >{{ item.title }}</li>
                </ul>
            </div>
        </div>
        </div>
        <div class="musicMain">
            <div class="musicInfo">
                <h3 class="musicTitle">{{ title }}</h3>
                <span >{{ artist }}</span>&nbsp;&nbsp;&nbsp;
                <span >总时长:{{ player.formatTime(durationtimer) }}</span>&nbsp;&nbsp;&nbsp;
                <span >已用时:{{ player.formatTime(currenttimer) }}</span>
            </div>    
            <div class="musicBtn">
                <button id="prevBtn" @click="player.prev"><</button>
                <button id="playBtn" @click="player.play_stop" :class="{'active': playertoggle}" >{{ playertoggle ? '暂停' : '播放' }}</button>
                <button id="nextBtn" @click="player.next" >></button>
                <button id="muteBtn" @click="player.mute" :class="{'active': mutedtoggle}" >{{ mutedtoggle ? '音' : '静' }}</button>
                <button id="loopBtn" @click="player.loop" :class="{'active': looptoggle}" >{{ looptoggle ? '循' : '单' }}</button>
                <button id="listBtn" @click="listtoggle = !listtoggle" :class="{'active': listtoggle}" >{{ listtoggle ? '图' : '表'}}</button>
            </div>
            <audio ref="musicPlayer" :src="musicSrc" @timeupdate="player.updateProgress"></audio>
            <div class="musicProgress">
                <input type="range" min="0" :max="durationtimer" v-model="currenttimer" @input="player.seekToTime"/>
                <p >{{ lyricshow[0] }}</p>
                <p class="active">{{ lyricshow[1] }}</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import MusicPlayer from '~/utils/utilsHomePage';
    const musicPlayer = ref<HTMLAudioElement | undefined>();  //音乐播放器
    const player = new MusicPlayer.MusicPlayer(musicPlayer)
    const musicSrc = player.musicSrc;  //音乐地址
    const playertoggle = player.playToggle;  //播放器开关状态
    const mutedtoggle = player.mutedToggle;  //静音开关状态
    const looptoggle = player.loopToggle;  //循环播放状态
    const listtoggle = ref<boolean>(false);  //播放列表状态
    const durationtimer = player.durationTimer;  //总时长
    const currenttimer = player.currentTimer;  //当前时间

    const lyricshow = player.lyricShow  //歌词数据
    const musicList = player.musicList;  //播放列表
    const artist = player.artist;  //歌手名
    const title = player.title;  //歌曲名
    const imgSrc = player.imgSrc;  //歌曲图片
    const musicIndex = player.musicIndex;  //歌曲索引

    onMounted(() => {
        player.initPlayer()
    })

    //监听音乐播放器状态
    watch(currenttimer,() => {
        player.updateLyric()  //更新歌词
        player.autoPlayNext()  //自动播放下一首
    })

</script>

<style scoped>
    .musicWidget {
        display: flex;
        width: 740px;
        height: 253px;
        background-color: rgb(235, 235, 235);
        margin-top: 10px;
        border-radius: 20px;
    }
    .musicPic {
        perspective: 1000px;
        margin: 10px;
        width: 230px;
        height: 230px;
        border-radius: 20px;
    }

    .musicPic .container {
        position: relative;
        width: 100%;
        height: 100%;
        transition: transform 1s;
        transform-style: preserve-3d;
    }

    .musicPic .container.active {
        transform: rotateY(180deg);
    }

    .musicPic .musicList{
        position: absolute;
        backface-visibility: hidden;
        transform: rotateY(180deg);
        background-color: rgba(255, 135, 0,0.5);
        border-radius: 20px;
        width: 100%;
        height: 100%;


    }
    .musicPic .musicList ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    .musicPic .musicList ul li {
        margin: 5px 20px;
        font-size:medium;
        cursor: pointer;
    }
    .musicPic .musicList ul li:hover {
        background-color: rgba(255, 215, 150, 0.4);
    }
    .musicPic .musicList ul li.active {
        color: rgb(255, 215, 0);
        font-size:x-large;
        font-weight: bold;
        transition: all 0.5s ease-out;  
    }
    .musicPic img {
        position: absolute;
        backface-visibility: hidden;
        width: 100%;
        height: 100%;
        border-radius: 20px;
    }
    .musicPic img:hover {
        transform: scale(1.1);
        transition: all 1s ease-out;  
    }

    .musicMain {
        margin-top: 20px;
        width: 480px;
        height: 200px;

        border-radius: 20px;
    }
    .musicMain .musicInfo {
        display: flex;
        align-items: baseline;
    }
    .musicMain .musicInfo .musicTitle {
        margin: 0 30px;
        line-height: 30px;
        font-size: 30px;
        font-weight: bold;
        color: #494949;
    }
    .musicMain .musicInfo span{
        font-size: 16px;
        color: #7e7e7e;
    }
    .musicMain .musicBtn {
        margin: 10px auto;
        height: 70px;
    }
    .musicMain .musicBtn button {
        align-items: baseline;
        margin: 5px 0px 5px 20px;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background-color: rgba(220, 220, 220, 0.8);
        border: rgb(100, 100, 100) 1px solid;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
    }
    .musicMain .musicBtn button:hover {
        transform: scale(1.2);
        transition: all 0.5s ease-out;  
    }
    .musicMain .musicBtn button.active {
        background-color: rgba(255, 135, 0,0.5);
        transform: scale(1.2);
    }
    #muteBtn,#loopBtn,#listBtn {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        font-size: 15px;
        
    }
    .musicMain .musicProgress {
        margin: auto 20px;
        width: 440px;
    }
    .musicMain .musicProgress input[type="range"] {

        width: 100%;
        border-radius: 5px;
        opacity: 0.8;
        cursor: pointer;
    }
    .musicMain .musicProgress input[type="range"]:hover {
        transform: scale(1.1);
        transition: all 0.2s ease-out;
        opacity: 1;
    }
    .musicMain .musicProgress p {

        margin: 3px 0;
        font-size: 18px;
        text-align: center;
        color:rgb(150 150, 150);
    }

    .musicMain .musicProgress p.active{
        transform: scale(1.25);
        font-weight: bold;
        transition: all 1s ease-out;
        color:rgb(100, 100, 100);
    }
</style>
