<template>
  <div class="midBox">
    <ul>
      <li v-for="(item, index) in acticalMGMT" :key="item.essayId">
        <div class="titleBox">
          <h2>{{item.title}}</h2>
          <p>{{item.author}} | {{item.publishtime}}</p>
        </div>
        <div class="contentBox">
          <p>{{item.content}}</p>
          <div class="handleBox">
            <button>编辑</button>
            <button>删除</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
  const acticalMGMT = [
    {essayId:101, title: '这里是测试标题1',author: 'zhangsan', publishtime: '2022-01-01', content: '这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1这里是测试内容1'},
    {essayId:102, title: '这里是测试标题2',author: 'lisi', publishtime: '2022-01-02', content: '这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2这里是测试内容2'},
    {essayId:103, title: '这里是测试标题3',author: 'wangwu', publishtime: '2022-01-03', content: '这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3这里是测试内容3'},
    {essayId:104, title: '这里是测试标题4',author: 'zhaoliu', publishtime: '2022-01-04', content: '这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4这里是测试内容4'},
    {essayId:105, title: '这里是测试标题5',author: 'qianqi', publishtime: '2022-01-05', content: '这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5这里是测试内容5'},
    {essayId:106, title: '这里是测试标题6',author: 'baozi', publishtime: '2022-01-06', content: '这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6这里是测试内容6'},
    {essayId:107, title: '这里是测试标题7',author: 'chenliu', publishtime: '2022-01-07', content: '这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7这里是测试内容7'},
    {essayId:108, title: '这里是测试标题8',author: 'zhoujie', publishtime: '2022-01-08', content: '这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8这里是测试内容8'},
    {essayId:109, title: '这里是测试标题9',author: 'liushao', publishtime: '2022-01-09', content: '这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9这里是测试内容9'},
    {essayId:110, title: '这里是测试标题10',author: 'xiaowei', publishtime: '2022-01-10', content: '这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10这里是测试内容10'}
    ]
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
  .midBox ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 510px;
    height: 720px;
    transition: all 0.3s ease-in-out;
    overflow-y: hidden;
  }
  .midBox ul:hover {
    overflow-y: scroll;
    transition: all 0.3s ease-in-out;
  }
  .midBox li {
    margin-bottom: 10px;
    width: 100%;
    height: 100px;
  }
  .midBox .titleBox {
    height: 40px;
    display:flex;
    justify-content:flex-start;
    align-items: baseline;
  }
  .midBox .titleBox h2 {
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
    height: 60px;
    display: flex;
    justify-content:flex-start;
    align-items: center;
  }
  .midBox .contentBox p {
    display:block;
    width: 380px;
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