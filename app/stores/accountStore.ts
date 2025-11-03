import { defineStore } from 'pinia'
import { cookiesTools } from '#imports'
const cookies = new cookiesTools()
export const useAccountStore = defineStore('accountStore', {
  state: () => ({
    uuid: null as number | null,
    username: null as string | null,
    token: null as string | null,
  }),
  actions: {
    setTokenData(data: { uuid: number, username: string, token: string }) {
      cookies.setCookie('token', data, 1, 'fuzao_secret_key')
      const { uuid, username, token } = data
      this.uuid = uuid
      this.username = username
      this.token = token
    },
    clearToken() {
      cookies.clearCookie('token')
      this.uuid = null
      this.username = null
      this.token = null
    },
  },
})