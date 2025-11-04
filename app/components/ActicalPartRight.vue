<template>
  <div class="leftBox">
    <div class="editTool">
      <div class="editTitle">
        <select name="titleItem" id="titleItem" v-model="selectedTitle" @change="TitleSize">
          <option value="h2">一级标题</option>
          <option value="h3">二级标题</option>
          <option value="h4">三级标题</option>
          <option value="h5">四级标题</option>
          <option value="h6">五级标题</option>
        </select>
        <select name="fontSize" id="fontSize" v-model="selectedFontSize" @change="FontSize">
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
        <button @click="Bold"><b>B</b></button>
        <button @click="Italic"><i>I</i></button>
        <button @click="Underline"><u>U</u></button>
        <button @click="Strikethrough"><s>S</s></button>
        <button @click="Undo" ><</button>
        <button @click="Redo" >></button>
        <button @click="FontColor" :style="`color:${selectedColor}`">A</button>
        <select name="color" id="color" style="width: 30px;" v-model="selectedColor">
          <option value="red">红色</option>
          <option value="blue">蓝色</option>
          <option value="green">绿色</option>
          <option value="yellow">黄色</option>
          <option value="black">黑色</option>
          <option value="white">白色</option>
        </select>
        <button @click="FontBgc" :style="`background-color: ${selectedBgCcolor}`">G</button>
        <select name="bgcColor" id="bgcColor" style="width: 30px;" v-model="selectedBgCcolor">
          <option value="red">红色</option>
          <option value="blue">蓝色</option>
          <option value="green">绿色</option>
          <option value="yellow">黄色</option>
          <option value="black">黑色</option>
          <option value="white" selected>白色</option>
        </select>
        <button @click="RemoveFormat" >F</button>
      </div>
      <div class="editBox">
        <h1 placeholder="请输入标题" :contenteditable="previewEditor" data-placeholder="请输入标题" maxlength="20" @input="inputTitle">{{ titleTo }}</h1>
        <div class="editContent" v-on:keyup="(e)=>e.preventDefault"  v-on:keydown.self="inputSmbol" :contenteditable="previewEditor" v-html="htmlContent" 
          @input.prevent="inputEssay" data-placeholder="请输入内容" :style="`font-size:${previewFontSize}px;`" >
        </div>
      </div>
      <div class="buttonBox">
        <select name="type" id="type" v-model="typeSelect">
          <option value="tech">技术</option>
          <option value="life">生活</option>
        </select>
        <button @click="previewEditor=!previewEditor">{{ previewEditor? '文档预览' : '文档编辑' }}</button>
        <button @click="PatchAndPublishData">保存并发布</button>
        <button @click="NewFileAndPublishData">发布为新文档</button>
        <input type="range" min="12" max="30" step="2" v-model="previewFontSize"></input>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { EssayEditor } from '../utils/utilsEssayPage'
  import { useAlertStore } from '#imports'
  const alertStore = useAlertStore()
  const selection = () => window.getSelection() as Selection
  const range = () => selection().getRangeAt(0) as Range
  const essayEditor = new EssayEditor()
  const selectedColor = ref('red')
  const selectedBgCcolor = ref('yellow')
  const selectedFontSize = ref(22)
  const selectedTitle = ref('h2')
  const previewEditor = ref<boolean>(false)
  const previewFontSize = ref(18)
  const htmlContent = ref('')
  const typeSelect = ref('tech')
  let titleTo = ref('')
  let titlefrom = ''
  const inputTitle = (event: InputEvent) => {
    titlefrom = (event.target as HTMLInputElement).innerText
  }
  const inputSmbol = (event: KeyboardEvent) => essayEditor.inputSmbol(event, range(), selection())
  const inputEssay = (event: InputEvent) => essayEditor.inputEssay(event)
  const Bold = () => essayEditor.renderFontTag('b', range())
  const Italic = () => essayEditor.renderFontTag('i', range())
  const Underline = () => essayEditor.renderFontTag('u', range())
  const Strikethrough = () => essayEditor.renderFontTag('s', range())
  const FontColor = () => essayEditor.renderFontStyle(selectedColor.value, range()).fontColor()
  const FontBgc = () => essayEditor.renderFontStyle(selectedBgCcolor.value, range()).fontBgc()
  const RemoveFormat = () => essayEditor.removeFormat(range(), selection())
  const Undo = () => htmlContent.value = essayEditor.undoContent() as string
  const Redo = () => htmlContent.value = essayEditor.redoContent() as string
  const PatchAndPublishData = () => {
    essayEditor.publishEssay(titlefrom, typeSelect.value)
  }
  const NewFileAndPublishData = () => {

  }
  const LoadLocalData = () => {
    const { htmlCTX,titleCTX } = essayEditor.loadLocalData() as { htmlCTX: string, titleCTX: string }
    htmlContent.value = htmlCTX
    titleTo.value = titleCTX
  }
  const FontSize = () => {
    essayEditor.renderFontStyle(selectedFontSize.value.toString(), range()).fontSize()
  }
  const TitleSize = () => {
    essayEditor.renderFontTag(selectedTitle.value, range())
  }
  
  // onMounted(() => {
  //   LoadLocalData()
  // })
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
    justify-content:space-between;
    width: 640px;
    height: 50px;
    background: rgb(235, 235, 235);
    border-radius: 20px;
  }
  .leftBox .editTool .buttonBox select {
    margin: 10px;
    width: 100px;
    height: 30px;
    border-radius: 15px;
    cursor: pointer;
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
    margin:0 20px;
    width: 100px;
  }
</style>