import  { defineStore } from 'pinia'
export const useAlertStore = defineStore('alert', {
  state: () => ({
    message: '',
    type: 'info',
    show: false
  }),
  actions: {
    showAlert(message: string, type: string = 'info') {
      this.message = message
      this.type = type
      this.show = true
    },
    hideAlert() {
      this.show = false
    }
  }
})