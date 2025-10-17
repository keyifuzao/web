import { defineStore } from 'pinia'


export const useMusicStore = defineStore('music', {
  state: () => ({
    musicSrc: null as string | null,
    playerStatus: null as boolean | null,
    title: null as string | null,
    musicIndex: null as number | null,
    currentTimeStatus: null as number | null,
  }),
    getters: {

    },
    actions: {
      // playMusic(srcItem: string) {
      //   audio.src = srcItem
      //   audio.play()
      // },
  }
})