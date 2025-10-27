<template>
  <div class="leftBox">
    <div class="editTool">
        <div class="editTitle" >
          <select>
            <option value="1">12号</option>
            <option value="2">14号</option>
            <option value="3">16号</option>
            <option value="4">18号</option>
            <option value="5">20号</option>
            <option value="6">22号</option>
          </select>
          <button @click="execCommand('bold')">B</button>
          <button @click="execCommand('italic')">I</button>
          <button @click="execCommand('underline')">U</button>
          <button @click="execCommand('strikethrough')">S</button>
          <button @click="execCommand('fontColor','red')">A</button>
          <button @click="">G</button>
          <button @click="execCommand('removeFormat')">D</button>
        </div>
        <div class="editBox">
          <h1 placeholder="请输入标题" contenteditable="true" data-placeholder="请输入标题"></h1>
          <div  class="editContent" contenteditable="true" v-html="htmlContent" @paste="handlePaste($event)" @input="recordHistory" data-placeholder="请输入内容" >
          </div>
        </div>
        <div class="buttonBox">
          <button @click="">预览</button>
          <button @click="">发布</button>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
//展示内容
  const content = ref('')
  //输入内容的html
  const htmlContent = ref('')
  //记录操作历史
  const history = ref<string[]>([])
  //记录操作历史的索引
  const historyIndex = ref(-1)
  //初始化选区
  const selectionObj = () => {
    const selection = window.getSelection() as Selection
    if (!selection.rangeCount) return
    const range = selection.getRangeAt(0)
    return {selection, range}
  }
    //记录操作历史
  const recordHistory = () => {
    const html = htmlContent.value
    history.value = history.value.slice(0, historyIndex.value + 1)
    history.value.push(html)
    historyIndex.value++
  }
  //粘贴事件
  const handlePaste = async (event: ClipboardEvent) => {
    event.preventDefault()
    try{
      const items = event.clipboardData?.items as DataTransferItemList
      let html = ''
      for (let i = 0; i < items.length; i++){
        if(items[i]?.type === 'text/html'){
          html = await new Promise((resolve) => {
            items[i]?.getAsString(resolve)
          })
          break
        }
      }
      console.log(html)
      if (!html){
        const text = await navigator.clipboard.readText()
        html = text.replace(/\\n/g, '<br>')
      }
      htmlContent.value = html
    }catch(error){
      console.log(error)
    }
  }
  const execCommand = (command:string, value?:string) => {
    const {range} = selectionObj() as {range:Range}
    switch (command) {
      case 'bold':
        renderFont('b')
        break
      case 'italic':
        renderFont('i')
        break
      case 'underline':
        renderFont('u')
        break
      case 'strikethrough':
        renderFont('del')
        break
      case 'fontColor':
        insertFragmentHTML(`<span style="color:${value}">${range.toString()}</span>` )
        break
      case 'removeFormat':
        removeFormat('span')
        break
    }
  }
  //受到指令，利用extractContents从range中裁剪内容，创造tag标签并插入到range中
  const renderFont = (tag:string) => {
  const {range} = selectionObj() as {range:Range}
    if (range.startOffset === range.endOffset) return
    const selectedText = range.extractContents()
    const newElement = document.createElement(tag)
    newElement.appendChild(selectedText)
    range.insertNode(newElement)
  }
  //将html字符串转换为fragment，插入到range中
  const insertFragmentHTML = (fragmentHtml:string  ) => {
    const {selection,range} = selectionObj() as {selection:Selection,range:Range}
    if (range.startOffset === range.endOffset) return
    range.deleteContents()
    const temp = document.createElement('div')
    temp.innerHTML = fragmentHtml
    const frag = document.createDocumentFragment()
    while (temp.firstChild) {
      frag.appendChild(temp.firstChild)
    }
    range.insertNode(frag)
    selection.removeAllRanges()
    selection.addRange(range)
  }
// //移除指定标签的格式
  const removeFormat = (tag:string) => {
    const {selection,range } = selectionObj() as {selection:Selection,range:Range}
    if (range.startOffset === range.endOffset) return
      const textNode = document.createTextNode(range.toString())
      range.deleteContents()
      range.insertNode(textNode)
      range.collapse(false)
      selection.removeAllRanges()
      selection.addRange(range)
    }


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
    outline: none;
  }
  .leftBox .editTool .editTitle select {
    margin: 10px;
    width: 100px;
    height: 30px;
    border-radius: 15px;
    cursor: pointer;
  }
  .leftBox .editTool .editTitle button {
    margin: 10px;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    cursor: pointer;
  }
  .leftBox .editTool .editTitle button:hover {
    transform: scale(1.1);
    transition: all 0.5s;
  }
  .leftBox .editTool .editBox {
    margin: 10px 0;
    width: 580px;
    height: 600px;
    padding: 30px;
    font-size: 18px;
    border-radius: 20px;
    background:rgb(235, 235, 235);
    transition: all 1s;
  }
  .leftBox .editTool .editBox h1 {
    margin: 0;
    padding: 0;
    height: 40px;
    line-height: 40px;
    outline: none;
    transition: all 0.5s;
    border-bottom: 1px solid rgb(150, 150, 150);
  }
  .leftBox .editTool .editBox h1:empty::before {
    content: attr(data-placeholder);
    cursor: text;
    color: rgb(150, 150, 150);
  }
  .leftBox .editTool .editBox h1:focus::before {
    transition: all 0.5s;
  }
  .leftBox .editTool .editBox .editContent {
    margin: 20px 0;
    height: 540px;
    outline: none;
    overflow-y: auto;
    transition: all 0.5s;

  }
  .leftBox .editTool .editBox .editContent:empty::before {
    content: attr(data-placeholder);
    cursor: text;
    color: rgb(150, 150, 150);
  }
  .leftBox .editTool .editBox .editContent:hover::before {
    transition: all 0.5s;
  }
  
  .leftBox .editTool .buttonBox {
    display: flex;
    justify-content: center;
    width: 640px;
    height: 50px;
    background:rgb(235, 235, 235);
    border-radius: 20px;
  }
  .leftBox .editTool .buttonBox button {
    margin: 10px;
    width: 100px;
    height: 30px;
    border-radius: 15px;
    cursor: pointer;
  }
  .leftBox .editTool .buttonBox button:hover {
    transform: scale(1.1);
    transition: all 0.5s;
  }
</style>