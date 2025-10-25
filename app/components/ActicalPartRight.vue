<template>
  <div class="leftBox">
    <div class="editTool">
        <div class="editTitle" >
          <button @click="fontBold">加粗</button>
          <button @click="judgePosition">斜体</button>
          <button @click="">下划线</button>
          <button @click="">删除线</button>
          <button @click="">字体颜色</button>
          <button @click="">背景颜色</button>
          <button @click="">清除所有</button>
        </div>
        <div class="editContent" contenteditable="true" v-html="htmlContent" @focus="" @blur="" @input="getContent($event)" @mouseup="seletionInfo">
        </div>
        <div class="buttonBox">{{ content }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  const content = ref('')
  const htmlContent = ref('')
  const font_weight = [0,0,0,0,0,1,1,1,1,0,1,0,1,0,0,0,0]
  //获取文本框内容
  const getContent = (event:Event) => {
    let htmlWriteEvent = event.target as HTMLElement
    content.value = htmlWriteEvent.innerText
  }
  //获得选取内容
  const selectObj = () => {
    const selectObj = window.getSelection()
    if(selectObj){
      return selectObj.getRangeAt(0) 
    }
      return {} as Range
  }
  const seletionInfo = () => {
    const range = selectObj()
    const startContainer = range.startContainer
    const endContainer = range.endContainer
    const startOffset = range.startOffset
    const endOffset = range.endOffset
    const selectStr = range.toString()
    return {startOffset,selectStr}
  }
  const judgePosition = () => {
    const range = selectObj()
    const startContainer = range.startContainer
    const startOffset = range.startOffset
    if(startContainer.parentNode){
      let allNodes = startContainer.parentNode.childNodes
      for(let i=0;i<allNodes.length;i++){
        console.log(allNodes[i]?.textContent?.length)
      }
    }
  }
  //originalStr 是原始字符串，newStr 是要替换的字符串，startIndex 是要替换的字符串的起始位置，fontStyle 是替换字符串的样式
  const replaceStrTool = (originalStr: string, newStr: string, startIndex: number,fontStyle:string) => {
    let res =originalStr.split('').map((strPart,index)=>index === startIndex ? `<${fontStyle}>${newStr}</${fontStyle}>` : strPart)
    res.splice(startIndex+1,newStr.length-1)
    return res.join('');
  }
  const fontBold = () => {
    const {startOffset,selectStr} = seletionInfo()
    const range = selectObj()
    console.log(startOffset,selectStr)
    let newTxt = replaceStrTool(content.value,selectStr,startOffset,'b')
    htmlContent.value = newTxt
  }
  const clearBold = () => {
    htmlContent.value
  }

    // //callback 是加粗、斜体、下划线、删除线的回调函数，nodeName 是要操作的节点名称
    // const getContent = (cb:(range:Range,dealStyle:string)=>void,dealStyle:string) => {
    //   const range = initFontTools()
    //   range.setStart(range.startContainer, range.startOffset)
    //   range.setEnd(range.endContainer, range.endOffset)
    //   const content = range.cloneContents()
    //   if(content.childNodes.length === 1){
    //     cb(range, dealStyle)
    //   }else if ( content.childNodes.length >= 2 ){
    //     if(range.endContainer.parentNode?.nodeName === dealStyle.toUpperCase()){
    //       let preDb = range.toString() + range.endContainer.textContent?.substring(range.endOffset)
    //       console.log(range.startContainer.previousSibling?.nodeName)
    //     }
    //   }
    // }
    // const dealTxt = (htmlWrite:string,dealStyle:string) => {
    //   let preContent=`<${dealStyle}>${htmlWrite}</${dealStyle}>`
    //   htmlContent.value = preContent
    // } 
    // // b/i/u/s 标签的操作  dealStyle 是要操作的标签名称
    // const fontDeal = (range:Range,dealStyle:string) => {
    //   const newNode = document.createElement(dealStyle)
    //   range.surroundContents(newNode)
    // }

</script>
<style scoped>
  .leftBox {
    margin: 10px;
    width: 640px;
    height: 780px;
    border-radius: 30px;
  }
  .leftBox .editTool {
    width: 640px;
    height: 720px;
    border-radius: 10px;
  }
  .leftBox .editTool .editTitle {
    width: 640px;
    height : 50px;
    line-height: 50px;
    text-align: center;
    background:rgb(235, 235, 235);
    border-radius: 20px;
  }
  .leftBox .editTool .editContent {
    margin: 10px 0;
    width: 580px;
    height: 600px;
    padding: 30px;
    font-size: 18px;
    border-radius: 20px;
    outline: none;
    background:rgb(235, 235, 235);
    overflow-y: auto;
    transition: all 1s;
  }
  .leftBox .editTool .editContent:focus {
    outline: none;
    background:rgb(235, 235, 235);
    transition: all 1s;
  }
  .leftBox .editTool .buttonBox {
    width: 640px;
    height: 50px;
    background:rgb(235, 235, 235);
    border-radius: 20px;
  }
</style>