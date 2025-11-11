import { useHomeStore } from '../stores/homeStore'
import * as lyricCTX from '~/assets/js/lyric';

//home页面音乐播放器
class MusicPlayer {
    //播放器元数据
    audio: Ref<HTMLAudioElement | undefined>
    playToggle: Ref<boolean> = ref(false)
    mutedToggle: Ref<boolean> = ref(false)
    loopToggle: Ref<boolean> = ref(false)
    musicIndex: Ref<number> = ref(0)
    durationTimer: Ref<number> = ref(0)
    currentTimer: Ref<number> = ref(0)
    //歌词元数据
    lyricDatas: string = ''
    musicList: Array<{ title: string, artist: string, musicSrc: string, imgSrc: string, durationtime: number, lyrics: string }> = lyricCTX.lyric
    musicSrc: Ref<string> = ref('')
    artist: Ref<string> = ref('')
    title: Ref<string> = ref('')
    imgSrc: Ref<string> = ref('')
    lyricShow: Ref<Array<string>> = ref([])
    constructor(
        audio: Ref<HTMLAudioElement | undefined>
    ) {
        this.audio = audio
    }
    //歌词数据处理
    lyricDataHandle() {
        const lyricDBS = this.lyricDatas.split('\n').map(i => {
            const db = i.trim().match(/^\[(.*?)\](.*)/)
            if (db && db[1]) {
                let timeparts = db[1].split(':')
                let timer = Math.floor(parseInt(timeparts[0] ? timeparts[0] : '0') * 60 + parseInt(timeparts[1] ? timeparts[1] : '0'))
                if (timer || timer === 0) {
                    return { timer, txt: db[2] ? db[2].trim() : '' }
                }
            }
        }).filter(i => i !== undefined)
        return lyricDBS
    }
    //格式化时间～
    formatTime(time: number) {
        const minute = Math.floor(time / 60)
        const second = Math.floor(time % 60)
        return `${minute}:${second < 10 ? '0' + second : second}`
    }
    //初始化播放器
    initPlayer(index: number = 0) {
        if (this.musicList[index] && this.audio.value) {
            this.musicSrc.value = this.musicList[index].musicSrc
            this.artist.value = this.musicList[index].artist
            this.title.value = this.musicList[index].title
            this.imgSrc.value = this.musicList[index].imgSrc
            this.durationTimer.value = this.musicList[index].durationtime
            this.lyricDatas = this.musicList[index].lyrics
            this.audio.value.load()
        }
    }
    //重置播放器
    resetPlayer() {
        this.playToggle.value = false
        this.audio.value!.autoplay = true
        this.play_stop()
    }
    //播放/暂停播放器～
    play_stop() {
        this.playToggle.value = !this.playToggle.value
        if (this.playToggle.value) {
            this.audio.value!.play()
        } else {
            this.audio.value!.pause()
        }
    }
    //上一首
    prev() {
        if (this.musicIndex.value - 1 >= 0) {
            this.musicIndex.value -= 1
            this.initPlayer(this.musicIndex.value)
            this.resetPlayer()
        }
    }
    //下一首
    next() {
        if (this.musicIndex.value + 1 < this.musicList.length) {
            this.musicIndex.value += 1
            this.initPlayer(this.musicIndex.value)
            this.resetPlayer()
        }
    }
    //音乐列表中进行选择并跳转音乐
    jump(index: number) {
        this.initPlayer(index)
        this.resetPlayer()
        this.musicIndex.value = index
    }

    //播放器循环播放
    loop() {
        this.loopToggle.value = !this.loopToggle.value
        this.audio.value!.loop = this.loopToggle.value
        this.audio.value!.autoplay = !this.loopToggle
    }

    //播放器静音
    mute() {
        this.mutedToggle.value = !this.mutedToggle.value
        this.audio.value!.muted = this.mutedToggle.value
    }

    //根据进度条时间调整播放位置
    seekToTime() {
        this.audio.value!.currentTime = this.currentTimer.value
    }

    //自动播放下一首
    autoPlayNext() {
        if (this.audio.value!.ended) {
            if (this.musicIndex.value + 1 < this.musicList.length) {
                this.musicIndex.value += 1
                this.initPlayer(this.musicIndex.value)
                this.resetPlayer()
            } else {
                this.musicIndex.value = 0
                this.initPlayer(this.musicIndex.value)
                this.resetPlayer()
            }
        }
    }

    //进度条更新
    updateProgress() {
        this.currentTimer.value = this.audio.value!.currentTime
    }

    //歌词更新
    updateLyric() {
        const datas = this.lyricDataHandle()
        let updateLyric = datas.filter(item => item.timer <= this.currentTimer.value).sort((a, b) => b.timer - a.timer)
        if (updateLyric.length) {
            this.lyricShow.value = [
                updateLyric[1] ? updateLyric[1].txt : '',
                updateLyric[0] ? updateLyric[0].txt : '',
            ]
        }
    }
}

//home页面时间计数管理
class TimeCounter {
    homeStore = useHomeStore()
    //以下为倒计时参数
    touchedToggle = ref<boolean>(false)
    startToggle = ref<boolean>(false)
    timeLeft = ref<number>(30)

    constructor() {
    }
    //以下为倒计时方法
    start() {
        this.homeStore.widgetsTimer.timeLeft = this.timeLeft.value
        this.homeStore.startCounter
        this.homeStore.widgetsTimer.starttoggle=this.startToggle.value = true
        this.homeStore.widgetsTimer.touchedtoggle=this.touchedToggle.value = false
    }
    stop() {
        this.homeStore.stopCounter
        this.startToggle.value = false
    }
}

export default {TimeCounter, MusicPlayer}