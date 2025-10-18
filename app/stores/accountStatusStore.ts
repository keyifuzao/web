import { defineStore } from 'pinia'
import CryptoJS from 'crypto-js'

export const useAccountStatusStore = defineStore('accountStatus', {
  state: () => ({
    code: 0 as number,
    userName: '' as string,
  }),
  getters: {
  },
  actions: {

  }
})


