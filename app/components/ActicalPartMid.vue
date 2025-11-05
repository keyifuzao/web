<template>
  <div class="midBox">
    <div class="topBtn">
      <span>当前位置: 首页 > 文章列表</span>
      <span>第{{ page }}页</span>
      <button @click="page>1?page--:page;refreshEssayList()">上一页</button>
      <button @click="page++;refreshEssayList()">下一页</button>
      <button @click="refreshEssayList()">刷新</button>
    </div>
    <ul>
      <li v-for="item in essayList" :key="item.essayId">
        <div class="titleBox">
          <h2>{{item.title}}</h2>
          <p>{{item.author}} | {{item.create_time}} | {{item.essayId}}</p>
        </div>
        <div class="contentBox">
          <p v-html="item.content"></p>
          <div class="handleBox">
            <button @click="editEssayItem(item)">编辑</button>
            <button @click="removeEssay(item.essayId)">删除</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  import { EssayListShow } from '#imports';
  import { useEssayStore } from '#imports';
  const essayListShow = new EssayListShow();
  const essayStore = useEssayStore();
  const essayList = ref<[{uuid: number, essayId: number,type: string, title: string, content: string, author: string, create_time: string, update_time: string}]>();
  const page = ref(1);
  const refreshEssayList = async() => {
    const res = await essayListShow.__getEssayList(6, page.value);
    essayList.value = res as [{uuid: number, essayId: number,type: string, title: string, content: string, author: string, create_time: string, update_time: string}];
    localStorage.setItem('essayList', JSON.stringify(res));
  }
  const editEssayItem = (item: {uuid: number, essayId: number,type: string, title: string, content: string, author: string, create_time: string, update_time: string}) => {
    essayStore.setEssayData(item);
  }
  const removeEssay = async(essayId: number) => {
    await essayListShow.delEssay(essayId);
    await refreshEssayList();
  }
  onMounted(() => {
    const localEssayList = localStorage.getItem('essayList');
    if (localEssayList) {
      essayList.value = JSON.parse(localEssayList) as [{uuid: number, essayId: number,type: string, title: string, content: string, author: string, create_time: string, update_time: string}];
    }
  })
</script>
<style scoped>
  .midBox {
    margin: 10px;
    padding: 20px;
    width: 510px;
    height: 740px;
    background-color: rgb(235, 235, 235);
    border-radius: 30px;
  }
  .midBox .topBtn {
    display: flex;
    margin: 10px auto;
    justify-content: space-between;
    align-items: center;
  }
  .midBox .topBtn span {
    font-size: 16px;
    color: rgb(100, 100, 100);
  }
  .midBox .topBtn button {
    width: 60px;
    height: 30px;
    border: none;
    border-radius: 15px;
    background-color: rgb(200, 200, 200);
    color: rgb(0, 0, 0);
    cursor: pointer;
  }
  .midBox ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 510px;
    height: 680px;
    transition: all 0.3s ease-in-out;
    overflow-y: hidden;
  }
  .midBox ul:hover {
    transition: all 0.3s ease-in-out;
  }
  .midBox li {
    margin-bottom: 10px;
    width: 100%;
    height: 105px;
  }
  .midBox .titleBox {
    height: 40px;
    display:flex;
    justify-content:flex-start;
    align-items: baseline;
  }
  .midBox .titleBox h2 {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }
  .midBox .titleBox p {
    margin: 0;
    margin-left: 30px;
    font-size: 14px;
    color: rgb(100, 100, 100);
  }
  .midBox .contentBox {
    height: 70px;
    display: flex;
    justify-content:flex-start;
    align-items: center;
  }
  .midBox .contentBox p {
    display:block;
    width: 400px;
    margin: 0;
    height: 58px;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;

  }
  .midBox .handleBox {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100px;
    height: 50px;
  }
  .midBox .handleBox button {
    margin: 5px;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 20px;
    background-color: rgb(200, 200, 200);
    color: rgb(0, 0, 0);
    cursor: pointer;
  }
  

</style>