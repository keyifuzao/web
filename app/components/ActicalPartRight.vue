<template>
  <div class="leftBox">
    <div class="editTool">
      <div class="editTitle">
        <select name="titleItem" id="titleItem" v-model="selectedTitle">
          <option value="h2">一级标题</option>
          <option value="h3">二级标题</option>
          <option value="h4">三级标题</option>
          <option value="h5">四级标题</option>
          <option value="h6">五级标题</option>
        </select>
        <select name="fontSize" id="fontSize" v-model="selectedFontSize">
          <option value="12">12号</option>
          <option value="14">14号</option>
          <option value="16">16号</option>
          <option value="18">18号</option>
          <option value="20">20号</option>
          <option value="22">22号</option>
          <option value="24">24号</option>
          <option value="26">26号</option>
          <option value="28">28号</option>
          <option value="30">30号</option>
        </select>
        <button @click="execBase('bold')"><b>B</b></button>
        <button @click="execBase('italic')"><i>I</i></button>
        <button @click="execBase('underline')"><u>U</u></button>
        <button @click="execBase('strikethrough')"><s>S</s></button>
        <button @click="undo" ><</button>
        <button @click="redo" >></button>
        <button @click="execAD('fontColor',selectedColor)" :style="`color:${selectedColor}`">A</button>
        <select name="color" id="color" style="width: 30px;" v-model="selectedColor">
          <option value="red">红色</option>
          <option value="blue">蓝色</option>
          <option value="green">绿色</option>
          <option value="yellow">黄色</option>
          <option value="black">黑色</option>
          <option value="white">白色</option>
        </select>
        <button @click="execAD('backgroundColor',selectedBgCcolor)" :style="`background-color: ${selectedBgCcolor}`">G</button>
        <select name="bgcColor" id="bgcColor" style="width: 30px;" v-model="selectedBgCcolor">
          <option value="red">红色</option>
          <option value="blue">蓝色</option>
          <option value="green">绿色</option>
          <option value="yellow">黄色</option>
          <option value="black">黑色</option>
          <option value="white" selected>白色</option>
        </select>
        <button @click="removeFormat" >F</button>
      </div>
      <div class="editBox">
        <h1 placeholder="请输入标题" :contenteditable="previewEditor" data-placeholder="请输入标题" maxlength="20" @input="titleComputed">{{ titleInfo }}</h1>
        <div class="editContent" v-on:keyup="(e)=>e.preventDefault"  v-on:keydown.self="inputSmbol" :contenteditable="previewEditor" v-html="htmlContent" @blur="saveData"
          @input.prevent="handleInput" data-placeholder="请输入内容" :style="`font-size:${previewFontSize}px;`" >
        </div>
      </div>
      <div class="buttonBox">
        <button @click="saveTempData">保存</button>
        <button @click="previewEditor=!previewEditor">{{ previewEditor? '编辑' : '预览' }}</button>
        <button @click="">发布</button>
        <input type="range" min="12" max="30" step="2" v-model="previewFontSize"></input>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useAccountStore } from '../stores/accountStore'
  //输入内容的html
  const accountStore = useAccountStore()
  const selectedColor = ref('red')
  const selectedBgCcolor = ref('yellow')
  const selectedFontSize = ref(22)
  const selectedTitle = ref('')
  const previewFontSize = ref(18)
  const htmlContent = ref('')
  const previewEditor = ref<boolean>(true)
  let titleInfo = ref('')
  let acticalDataValue = {
    uuid: 100001,data:{tid:200001 , title: 'h2', author:"keyifuzao",content: '请输入内容',saveTime: new Date().toLocaleString()}
  }
  const saveData = () => {
    htmlContent.value = history[history.length - 1] as string
  }
  watch(selectedFontSize, (newVal) => {
    execAD('fontSize', newVal.toString())
  })
  watch(selectedTitle ,(newVal)=>{
    execBase(newVal)
  })
  const inputSmbol = (event: KeyboardEvent) => {
      const {range,selection} = selectionObj() as {range:Range,selection:Selection}
    if(event.key === 'Enter'){
      event.preventDefault()
      const br = document.createElement('br')
      range.deleteContents()
      range.insertNode(br)
      range.setStartAfter(br)
      range.setEndAfter(br)
      selection.removeAllRanges()
      selection.addRange(range)
    }
  }
  const titleComputed = (event: InputEvent) => {
    titleInfo.value = (event.target as HTMLInputElement).innerText
  }
  //记录操作历史
  let history: string[] = []
  //记录操作历史的索引
  let historyIndex: number = -1
  //初始化选区
  let toggleStyleBtn: boolean = false
  const selectionObj = () => {
    const selection = window.getSelection() as Selection
    if (!selection.rangeCount) return
    const range = selection.getRangeAt(0)
    return { selection, range }
  }
  //输入事件
  const handleInput = (event: InputEvent) => {
    const html = `${(event.target as HTMLElement).innerHTML}<br/>`
    recordHistory(html)
  }
  //记录操作历史
  const recordHistory = (data: string) => {
    history = history.slice(0, historyIndex + 1)
    history.push(data)
    historyIndex++
  }
  const execBase = (command: string) => {
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
      case 'h2':
        renderFont('h2')
        break
      case 'h3':
        renderFont('h3')
        break
      case 'h4':
        renderFont('h4')
        break
      case 'h5':
        renderFont('h5')
        break
      case 'h6':
        renderFont('h6')
        break
      case 'fontSize':
        execAD('fontSize', selectedFontSize.value.toString())
        break
      case 'fontColor':
        execAD('fontColor', selectedColor.value)
        break
      case 'backgroundColor':
        execAD('backgroundColor', selectedBgCcolor.value)
    }
  }
  const execAD = (command: string, value: string) => {
    const { range } = selectionObj() as { range: Range }
    switch (command) {
      case 'fontColor':
        renderFont('span')
        const spanNodeColor = range.cloneContents().querySelector('span')
        if (spanNodeColor) {
          spanNodeColor.style.color = value
          range.deleteContents()
          range.insertNode(spanNodeColor)
        }
        break
      case 'backgroundColor':
        renderFont('span')
        const spanNodeBgColor = range.cloneContents().querySelector('span')
        if (spanNodeBgColor) {
          spanNodeBgColor.style.backgroundColor = value
          range.deleteContents()
          range.insertNode(spanNodeBgColor)
        }
        break
      case 'fontSize':
        renderFont('span')
        const spanNodeSize = range.cloneContents().querySelector('span')
        if (spanNodeSize) {
          spanNodeSize.style.fontSize = `${value}px`
          range.deleteContents()
          range.insertNode(spanNodeSize)
        }
        break
    }
  }
  //受到指令，利用extractContents从range中裁剪内容，创造tag标签并插入到range中
  const renderFont = (tag: string) => {
    const { range } = selectionObj() as { range: Range }
    if (range.startOffset === range.endOffset) return
    const selectedText = range.extractContents()
    const newElement = document.createElement(tag)
    newElement.appendChild(selectedText)
    range.insertNode(newElement)
  }
  //将html字符串转换为fragment，插入到range中 此处不再使用
  // const insertFragmentHTML = (fragmentHtml: string) => {
  //   const { selection, range } = selectionObj() as { selection: Selection, range: Range }
  //   if (range.startOffset === range.endOffset) return
  //   range.deleteContents()
  //   const temp = document.createElement('div')
  //   temp.innerHTML = fragmentHtml
  //   const frag = document.createDocumentFragment()
  //   while (temp.firstChild) {
  //     frag.appendChild(temp.firstChild)
  //   }
  //   range.insertNode(frag)
  //   selection.removeAllRanges()
  //   selection.addRange(range)
  // }
  // //移除指定标签的格式
  const removeFormat = () => {
    const { selection, range } = selectionObj() as { selection: Selection, range: Range }
    if (range.startOffset === range.endOffset) return
    const textNode = document.createTextNode(range.toString())
    range.deleteContents()
    range.insertNode(textNode)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  const undo = () => {
    if (historyIndex > 0) {
      historyIndex--
      htmlContent.value = history[historyIndex] as string
    }
  }
  const redo = () => {
    if (historyIndex < history.length - 1) {
      historyIndex++
      htmlContent.value = history[historyIndex] as string
    }
  }
  const saveTempData = () => {
    acticalDataValue.uuid = (accountStore.getCookie('userInfo','fuzao_secret_key') as {uuid:number}).uuid
    acticalDataValue.data.tid ++
    acticalDataValue.data.title = titleInfo.value
    acticalDataValue.data.author = (accountStore.getCookie('userInfo','fuzao_secret_key') as {username:string}).username
    acticalDataValue.data.content = history[history.length - 1] as string
    acticalDataValue.data.saveTime = new Date().toLocaleString()
  }
  const saveLocalData = () => {
    localStorage.setItem('acticalData', JSON.stringify(acticalDataValue))
  }
  const loadLocalData = () => {
    const localData = localStorage.getItem('acticalData')
    if (localData) {
      acticalDataValue = JSON.parse(localData)
      htmlContent.value = acticalDataValue.data.content
      titleInfo.value = acticalDataValue.data.title
    }
  }
  //加载本地数据
  onMounted(() => {
    loadLocalData()
  })
  //保存本地数据
  onBeforeUnmount(() => {
    saveLocalData()
  })
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
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: rgb(235, 235, 235);
    border-radius: 20px;
    outline: none;
  }

  .leftBox .editTool .editTitle select {
    margin: 10px 5px;
    width: 80px;
    height: 30px;
    border-radius: 15px;
    cursor: pointer;
  }

  .leftBox .editTool .editTitle button {
    margin: 10px 5px;
    width: 30px;
    height: 30px;
    font-size: 16px;
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
    background: rgb(235, 235, 235);
    transition: all 1s;
  }

  .leftBox .editTool .editBox h1 {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    outline: none;
    transition: all 0.5s;
    border-bottom: 1px solid rgb(150, 150, 150);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
    justify-content:right;
    width: 640px;
    height: 50px;
    background: rgb(235, 235, 235);
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
  .leftBox .editTool .buttonBox input[type="range"] {
    margin:0 50px 0 10px;
    width: 100px;
  }
</style>