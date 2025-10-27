/**
 * 现代富文本编辑器实现
 * 完全替代execCommand功能
 */
class ModernTextEditor {
    container:HTMLElement
    history:string[]
    historyIndex:number
  constructor(containerId:string) {
    this.container = document.getElementById(containerId) as HTMLElement;
    this.container.contentEditable=''
    this.history = [];
    this.historyIndex = -1;
    this.setup();
  }
//初始化状态
  setup() {
    // 监听输入变化用于撤销重做
    this.container.addEventListener('input', () => {
      this.recordState();
    });
    
    // 处理粘贴事件
    this.container.addEventListener('paste', (e) => {
      e.preventDefault();
      this.handlePaste(e);
    });
  }

  recordState() {
    // 保存当前状态到历史记录
    const html = this.container.innerHTML;
    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(html);
    this.historyIndex++;
  }

  async handlePaste($event:ClipboardEvent) {
    try {
      const items = ($event.clipboardData as DataTransfer || window.ClipboardEvent.prototype.clipboardData as DataTransfer).items;
      let html = '';
      
      // 优先获取HTML内容
      for (let i = 0; i < items.length; i++) {
        if (items[i]! .type === 'text/html') {
          html = await new Promise(resolve => {
            items[i]!.getAsString(resolve);
          });
          break;
        }
      }
      if (!html) {
        // 回退到纯文本
        const text = await navigator.clipboard.readText();
        html = text.replace(/\\n/g, '<br>');
      }
      this.insertHTML(html);
    } catch (error) {
      console.error('粘贴处理失败:', error);
    }
  }

  exec(command: string, value? : string | null) {
    const supportedCommands = {
      bold: () => this.toggleFormat('b'),
      italic: () => this.toggleFormat('i'),
      underline: () => this.toggleFormat('u'),
      strikethrough: () => this.toggleFormat('s'),
      insertHTML: () => this.insertHTML(value as string),
      undo: () => this.undo(),
      redo: () => this.redo(),
      // 其他命令...
    };
    if (supportedCommands[command as keyof typeof supportedCommands]) {
      supportedCommands[command as keyof typeof supportedCommands]();
      return true;
    }
    return false;
  }

  toggleFormat(tagName: string) {
    const selection = window.getSelection() as Selection;
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    if (!selectedText) return;

    const existingElement = this.findParentTag(range.startContainer, tagName);
    
    if (existingElement) {
      // 移除格式
      const textNode = document.createTextNode(existingElement.textContent as string);
      existingElement.parentNode!.replaceChild(textNode, existingElement);
      range.selectNodeContents(textNode);
    } else {
      // 添加格式
      const element = document.createElement(tagName);
      range.surroundContents(element);
    }
    
    selection.removeAllRanges();
    selection.addRange(range);
  }

  findParentTag(node: Node, tagName: string) {
    while (node && node !== this.container) {
      if (node.nodeName.toLowerCase() === tagName.toLowerCase()) {
        return node;
      }
      node = node.parentNode as Node;
    }
    return null;
  }

  insertHTML(html: string) {
    const selection = window.getSelection() as Selection;
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();
    
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    const frag = document.createDocumentFragment();
    while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
    }
    
    range.insertNode(frag);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // 移动光标到插入内容之后
    const newRange = document.createRange();
    newRange.setStartAfter(frag.lastChild || frag);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.container.innerHTML = this.history[this.historyIndex] as string;
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.container.innerHTML = this.history[this.historyIndex] as string;
    }
  }
}

export { ModernTextEditor }
// 使用示例
// const editor = new ModernTextEditor('editor');
// editor.exec('bold','');  // 加粗选中文本
// editor.exec('insertHTML', '<span style="color:red">红色文本</span>');
