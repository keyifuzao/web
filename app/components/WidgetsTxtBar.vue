<!-- 这个是home文章的组件 -->
<template>
    <div class="txt-bar">
        <ul>
            <li v-for="(item, index) in acticalList" :key="item.title" v-show="index < 6">
                <div>
                    <h2 class="txt-bar-title">{{item.title}}</h2>
                    <b><i>{{ item.author }}</i> {{item.time}}</b>
                </div>
                <p>{{ item.desc }}</p>
            </li>
        </ul>
    </div>
</template>
<style scoped>
    .txt-bar {
        width: 565px;
        height: 516px;
        background-color: rgb(235, 235, 235);
        margin-top: 10px;
        border-radius: 20px;
    }
    .txt-bar ul {
        list-style: none;
        margin: 0 auto;
        padding: 0;
        width: 540px;
        height: 500px;
    }
    .txt-bar ul li {
        border-radius: 10px;
        cursor: pointer;
    }
    .txt-bar ul li:hover{
        background-color: rgba(255, 135, 0,0.3);
        transform: scale(1.05);
        transition: all 0.5s ease-out;  
    }

    .txt-bar ul li div{
        margin: 0;
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;

    }
    .txt-bar ul li div h2 {
        flex:2;
        width: 200px;
        font-size: 20px;
        font-weight: bold;
        color: rgb(30, 30, 30);
        margin: 5px auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .txt-bar ul li div b {
        flex:1;
        width: 200px;
        font-size: 14px;
        color: #666;
        text-align: right;
        margin: 5px auto;
    }   

    .txt-bar ul li p{
        display:block;
        width: 100%;
        height: 45px;
        margin: 5px auto;
        font-size: 16px;
        line-height: 24px;
        color: #808080;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
<script setup>
// 这里是文章组件的js代码
    const acticalList = [
        { title: '测试文章标题1', author: '张三', time: '2022-10-01', desc: '这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述' },
        { title: '测试文章标题2', author: '李四', time: '2022-10-02', desc: '这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述' },
        { title: '测试文章标题3', author: '王五', time: '2022-10-03', desc: '这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述' },
        { title: '测试文章标题4', author: '赵六', time: '2022-10-04', desc: '这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述' },
        { title: '测试文章标题5', author: '孙七', time: '2022-10-05', desc: '这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述' },
        { title: '测试文章标题6', author: '周八', time: '2022-10-06', desc: '这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述,这是一个文章的描述' },
        { title: '测试文章标题7', author: '吴九', time: '2022-10-07', desc: '这是一个文章的描述,这是一个文章的描述' },
        { title: '测试文章标题8', author: '郑十', time: '2022-10-08', desc: '这是一个文章的描述,这是一个文章的描述' },
        { title: '测试文章标题9', author: '冯十一', time: '2022-10-09', desc: '这是一个文章的描述,这是一个文章的描述' },
        ]
</script>