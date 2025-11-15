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

<style scoped lang="scss">
    $fontSize: 0.12rem;
    $colorA:rgb(255, 215, 0);
    $ColorB: rgb(100, 100, 100);
    $colorC: rgb(50, 50, 50);
    $bgColor: rgb(235, 235, 235);
    $bgColorB: rgb(200, 200, 200);
    $selectColor: rgb(235, 155, 0);
    $showColor: rgb(235, 100, 0);
    .musicWidget {
        display: flex;
        justify-content: space-between;
        margin-top: $fontSize *0.5;
        width:$fontSize * 32;
        height: $fontSize * 11.5;
        background-color: $bgColor;
        border-radius: $fontSize * 0.8;
        .musicPic {
            perspective: 1000px;
            margin: $fontSize *0.75;
            width: $fontSize * 10;
            height: $fontSize * 10;
            .container {
                position: relative;
                width: 100%;
                height: 100%;
                border-radius: $fontSize * 0.8;
                transition: transform 1s;
                transform-style: preserve-3d;
                &.active {
                    transform: rotateY(180deg);
                }
            }
            .musicList {
                position: absolute;
                backface-visibility: hidden;
                transform: rotateY(180deg);
                background-color: $selectColor;
                border-radius: $fontSize * 0.8;
                width: 100%;
                height: 100%;
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    li {
                        margin: $fontSize * 0.2 $fontSize * 0.5;
                        font-size:$fontSize * 0.6;
                        cursor: pointer;
                        &:hover {
                            background-color: $showColor;
                        }
                        &.active {
                            color: $colorA;
                            font-size:$fontSize;
                            font-weight: bold;
                            transition: all 0.5s ease-out;  
                        }
                    }
                }
            }
            img {
                position: absolute;
                backface-visibility: hidden;
                width: 100%;
                height: 100%;
                border-radius: $fontSize * 0.8;
                &:hover {
                    transform: scale(1.1);
                    transition: all 1s ease-out; 
                }
            }
        }
        .musicMain {
            margin: $fontSize * 0.75;
            width: $fontSize * 19;
            border-radius: $fontSize * 0.8;
            .musicInfo {
                display: flex;
                align-items: baseline;
                justify-content: space-between;
                height: $fontSize * 3;
                .musicTitle {
                    flex:0 0 $fontSize * 6.5;
                    margin: 0;
                    font-size: $fontSize * 1.2;
                    line-height: $fontSize * 3;
                }
                span {
                    flex: auto;
                    font-size: $fontSize * 0.7;
                    color: $ColorB;
                }
            }
            .musicBtn {
                display: flex;
                justify-content: space-between;
                align-items: center;
                button {
                    width: $fontSize * 1.6 ;
                    height: $fontSize * 1.6 ;
                    border-radius: $fontSize * 0.8;
                    font-size: $fontSize * 0.8;
                    cursor: pointer;
                    transition: all 0.5s ease-out;
                    border: none;
                    outline: none;
                    background-color:$bgColorB ;
                    &#playBtn {
                        width: $fontSize * 2.6 ;
                        height: $fontSize * 2.6 ;
                        border-radius: $fontSize * 1.3
                    }
                    &:hover {
                        transform: scale(1.2);
                        transition: all 0.5s ease-out; 
                    }
                    &.active {
                        background-color: $selectColor;
                        transform: scale(1.2);
                        transition: all 0.5s ease-out;
                    }
                }
            }
            .musicProgress {
                margin: $fontSize * 0.4 0;
                input{
                    // appearance: none;
                    width: 100%;
                    height: $fontSize * 0.3;
                    margin: $fontSize * 0.2 0;
                    opacity: 0.6;
                    outline: none;
                    border: none;
                    cursor: pointer;
                    &:hover {
                        transform: scale(1.05);
                        transition: all 0.5s ease-in-out;
                        opacity: 1;
                    }
                }
                p {
                    margin: $fontSize * 0.3 0;
                    font-size: $fontSize * 0.8;
                    text-align: center;
                    color: $ColorB;
                    text-shadow: 0 0 1px $colorC;
                    &.active {
                        transform: scale(1.2);
                        font-weight: bold;
                        transition: all 1s ease-out;
                        color: $colorC;
                    }
                }
            }
        }
    }
</style>
