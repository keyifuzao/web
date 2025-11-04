import { cookiesTools } from "./utilsCookiesTools"
import { UtilsWebRequests } from "#imports";
import { useAccountStore } from "../stores/accountStore";
import { useAlertStore } from "#imports";

class EssayEditor {
  cookiesTools;
  acticalDataValue: { uuid: number, essayId: number,type: string, title: string, content: string, author: string};
  history: string[];
  historyIndex: number;
  webRequests; accountStore; token; alertStore
  constructor() {
    this.cookiesTools = new cookiesTools()
    this.alertStore = useAlertStore()
    this.acticalDataValue = { uuid: 100001, essayId: 1001, type: '', title: '', content: '', author: ''}
    this.history = [];
    this.historyIndex = -1
    this.accountStore = useAccountStore()
    this.token = this.__getToken()
    this.webRequests = new UtilsWebRequests(this.token)
  }
  __getToken() {
    const tokenRes = this.cookiesTools.getCookie('token', 'fuzao_secret_key')
    const tokenInfo = tokenRes ? tokenRes.token : null
    return this.accountStore.token ? this.accountStore.token : tokenInfo
  }
  //监听键盘按键，输入回车时插入br标签
  inputSmbol(event: KeyboardEvent, range: Range, selection: Selection) {
    if (event.key === 'Enter') {
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
  //监听内容输入事件，响应式更新编辑器并显示内容
  inputEssay(event: InputEvent) {
    const html = `${(event.target as HTMLElement).innerHTML}<br/>`
    this.recordHistory(html)
  }
  //记录操作历史
  recordHistory(data: string) {
    this.history = this.history.slice(0, this.historyIndex + 1)
    this.history.push(data)
    this.historyIndex++
  }
  //渲染字体样式,利用extractContents从range中裁剪内容，创造tag标签并插入到range中
  renderFontStyle(style: string, range: Range) {
    const fontColor = () => {
      this.renderFontTag('span', range)
      const spanNodeColor = range.cloneContents().querySelector('span')
      if (spanNodeColor) {
        spanNodeColor.style.color = style
        range.deleteContents()
        range.insertNode(spanNodeColor)
      }
    }
    const fontBgc = () => {
      this.renderFontTag('span', range)
      const spanNodeBgc = range.cloneContents().querySelector('span')
      if (spanNodeBgc) {
        spanNodeBgc.style.backgroundColor = style
        range.deleteContents()
        range.insertNode(spanNodeBgc)
      }
    }
    const fontSize = () => {
      this.renderFontTag('span', range)
      const spanNodeSize = range.cloneContents().querySelector('span')
      if (spanNodeSize) {
        spanNodeSize.style.fontSize = style + 'px'
        range.deleteContents()
        range.insertNode(spanNodeSize)
      }
    }
    return { fontColor, fontBgc, fontSize }

  }
  //渲染字体标签
  renderFontTag(tag: string, range: Range) {
    if (range.startOffset === range.endOffset) return
    const selectedText = range.extractContents()
    const newElement = document.createElement(tag)
    newElement.appendChild(selectedText)
    range.insertNode(newElement)
  }
  //移除指定标签的格式
  removeFormat(range: Range, selection: Selection) {
    if (range.startOffset === range.endOffset) return
    const textNode = document.createTextNode(range.toString())
    range.deleteContents()
    range.insertNode(textNode)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  //撤销操作
  undoContent() {
    if (this.historyIndex > 0) {
      this.historyIndex--
      return this.history[this.historyIndex] as string
    }
  }
  //重做操作
  redoContent() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++
      return this.history[this.historyIndex] as string
    }
  }
  //将文本内容储存在cookies中
  savelocalData(title: string, type: string) {
    const { username, uuid } = this.cookiesTools.getCookie('token', 'fuzao_secret_key') as { username: string, uuid: number }
    this.acticalDataValue.uuid = uuid
    this.acticalDataValue.title = title
    this.acticalDataValue.type = type
    this.acticalDataValue.author = username
    this.acticalDataValue.content = this.history[this.history.length - 1] as string
    localStorage.setItem('acticalData', JSON.stringify(this.acticalDataValue))
  }
  //从本地加载文本内容
  loadLocalData() {
    const localData = localStorage.getItem('acticalData')
    if (localData) {
      this.acticalDataValue = JSON.parse(localData)
      const htmlCTX = this.acticalDataValue.content || ''
      const titleCTX = this.acticalDataValue.title || ''
      return { htmlCTX, titleCTX }
    }
  }
  async publishEssay(title: string, type: string) {
    this.savelocalData(title, type)
    const res =await this.webRequests.patchEssay(this.acticalDataValue)
    this.alertStore.showAlert(res.data.message, 'info')
    this.history = []
    this.historyIndex = -1
  }
}

class EssayListShow {
  accountStore; webRequests; cookiesTools; token
  constructor() {
    this.accountStore = useAccountStore()
    this.cookiesTools = new cookiesTools()
    this.token = this.__getToken()
    this.webRequests = new UtilsWebRequests(this.token)
  }
  __getToken() {
    const tokenRes = this.cookiesTools.getCookie('token', 'fuzao_secret_key')
    const tokenInfo = tokenRes ? tokenRes.token : null
    return this.accountStore.token ? this.accountStore.token : tokenInfo
  }

  async __getEssayList() {
    try {const { data:{data}} = await this.webRequests.getEssayList()
      return data
    }catch (error) {
      console.log("测试点2",error)
    }
  }
}
export { EssayEditor, EssayListShow }
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