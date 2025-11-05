import { defineStore } from 'pinia'

export const useEssayStore = defineStore('essay', {
  state: () => ({
    uuid: null as number | null,
    essayId : null as number | null,
    type: null as string | null,
    title: null as string | null,
    content : null as string | null,
    author: null as string | null,
    create_time: null as string | null,
    update_time: null as string | null,
  }),
  actions: {
    setEssayData(data:{uuid:number, essayId:number, type:string, title:string, content:string, author:string, create_time:string, update_time:string}) {
      this.uuid = data.uuid
      this.essayId = data.essayId
      this.type = data.type
      this.title = data.title
      this.content = data.content
      this.author = data.author
      this.create_time = data.create_time
      this.update_time = data.update_time
      localStorage.setItem('essayData', JSON.stringify(data))
    },
    resetEssayData() {
      this.uuid = null
      this.essayId = null
      this.type = null
      this.title = null
      this.content = null
      this.author = null
      localStorage.removeItem('essayData')
    }
  },
})  