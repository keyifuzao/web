<template>
  <div class="leftBox">
    <div class="essayBox">
      <div class="techBox">
        <div class="techTitle">
          <h2>web技术</h2>
          <button @click="getEssayByTech">刷新</button>
        </div>
        <ul>
          <li v-for="item in techList"><NuxtLink :to="`/essay/${ item.essayId }`" >{{ item.title }}</NuxtLink></li>
        </ul>
      </div>
      <div class="lifeBox">
        <div class="lifeTitle">
          <h2>生活记录</h2>
          <button @click="getEssayByLife">刷新</button>
        </div>
        <ul>
          <li v-for="item in lifeList"><NuxtLink to="#">{{ item.title }}</NuxtLink></li>
        </ul>
      </div>
    </div>
    <div class="EchartBox">
      <h2>数据统计</h2>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { NuxtLink } from '#components';
  import { EssayListShow} from '#imports';
  const essayListShow = new EssayListShow();
  const techList = ref<[{uuid: number, essayId: number,type: string, title: string, content: string, author: string, create_time: string, update_time: string}]>();
  const lifeList = ref<[{uuid: number, essayId: number,type: string, title: string, content: string, author: string, create_time: string, update_time: string}]>();
  const getEssayByTech = async () => {
    const res = await essayListShow.__getEssayBy('tech', 12, 1)
    techList.value = res as [{uuid: number, essayId: number,type: string, title: string, content: string, author: string, create_time: string, update_time: string}]
    localStorage.setItem('techList', JSON.stringify(techList.value))
  }
  const getEssayByLife = async () => {
    const res = await essayListShow.__getEssayBy('life', 12, 1)
    lifeList.value = res as [{uuid: number, essayId: number,type: string, title: string, content: string, author: string, create_time: string, update_time: string}]
    localStorage.setItem('lifeList', JSON.stringify(lifeList.value))
  }
  onMounted(() => {
    const techListStr = localStorage.getItem('techList')
    if(techListStr){
      techList.value = JSON.parse(techListStr)
    }else{
      getEssayByTech()
    }
    const lifeListStr = localStorage.getItem('lifeList')
    if(lifeListStr){
      lifeList.value = JSON.parse(lifeListStr)
    }else{
      getEssayByLife()
    }
  })
</script>
<style scoped>
  .leftBox {
    margin: 10px;
    width: 550px;
    height: 780px;
    border-radius: 30px;
  }
  .leftBox .essayBox {
    display: flex;
    width: 100%;
    height: 385px;
    border-radius: 30px;
  }
  .leftBox .essayBox .techBox{    
    width: 270px;
    height: 100%;
    border-radius: 20px;
    background-color:rgb(235,235,235);
  }
  .leftBox .essayBox .techBox .techTitle,.leftBox .essayBox .lifeBox .lifeTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color:rgb(220,220,220);
    border-radius: 20px 20px 0 0;
    font-weight: bold;
  }
  .leftBox .essayBox .techBox .techTitle h2,.leftBox .essayBox .lifeBox .lifeTitle h2 {
    margin: 0;
    padding: 0 10px;
  }
  .leftBox .essayBox .techBox .techTitle button,.leftBox .essayBox .lifeBox .lifeTitle button {
    margin: 0 10px;
    background-color:rgb(220,220,220);
    border: none;
    cursor: pointer;
  }
  .leftBox .essayBox .techBox ul, .leftBox .essayBox .lifeBox ul {
    margin: 0;
    padding: 10px;
    list-style: none;
    height: 330px;
    font-size: 18px;
    overflow: hidden;
    overflow-y: none;
  }
  .leftBox .essayBox .techBox ul li a, .leftBox .essayBox .lifeBox ul li a{
    text-decoration: none;
    color: rgb(100, 100, 100);
  }
  .leftBox .essayBox .lifeBox {
    margin-left: 10px;
    width: 270px;
    height: 100%;
    border-radius: 20px;
    background-color:rgb(235,235,235);
  }
  .leftBox .EchartBox {
    margin-top: 10px;
    width: 100%;
    height: 385px;
    background-color:rgb(235,235,235);
    border-radius: 30px;
  }
</style>