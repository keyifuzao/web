import { defineStore } from "pinia";

export const useTimerStore = defineStore('timer', {
  state: () => ({
    //首页图片滚播
    homePictime:7,
    picTimerId: null as number | any,
    //首页中间及右侧
    homeMidtime: 12,
    homeWebTooltime: 12,
    color:'',
    intervalId: null as number | any ,
    //工具页面
    toolstime:0,
    toolTimerID:null as number | any,
    toolcolor:'',
    //时间相关
    clock:'',
    day:'',
    week:'',
    month:'',
    year:''
  }),
  actions: {
    //通用定时器
    startTimer() {
      this.intervalId = setInterval(() => {
        this.homeMidtime++;
        this.homeWebTooltime++;
        this.color = `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${parseFloat(Math.random().toFixed(1))*0.5+0.5})`
      }, 3000);
    },
    stopTimer() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    },
    //首页图片轮播定时器
    startPicTimer() {
      this.picTimerId = setInterval(() => {
        this.homePictime ++;
      }, 2000);
    },
    stopPicTimer() {
      clearInterval(this.picTimerId);
      this.picTimerId = null;
    },
    getRandomtime(){
      this.toolTimerID = setInterval(() => {
        this.toolstime = Math.floor(Math.random()*22);
        this.toolcolor = `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${parseFloat(Math.random().toFixed(1))*0.5+0.5})`
      }, 2000);
    },
    stoptoolTimer() {
      clearInterval(this.toolTimerID);
      this.toolTimerID = null;
    },
  },
  getters: {
    getClockTimer(){
      setInterval(() => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let week = date.getDay();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        this.clock = `${hour<10?'0'+hour:hour}:${minute<10?'0'+minute:minute}:${second<10?'0'+second:second}`;
        this.day = day.toString();
        this.week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][week] as string;
        this.month = month.toString();
        this.year = year.toString();
        }, 1000);
    }
  }
});