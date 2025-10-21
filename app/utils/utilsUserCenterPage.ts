// import { UtilsWebRequests } from "../utils/utilsAccount"
// import { useAccountStore } from "../stores/accountStore"
// class UtilsUserInfoPart {
//     webrequests = new UtilsWebRequests()
//     accountStore = useAccountStore()
//     toggleShow = ref<boolean>(false)
//     username = ref<string>('')
//     usertoken = ref<string>('')
//     data = ref<{
//         code: number,
//         message: string,
//         data:{username: string,password: string,email: string,age: string,tel: string,sex: string,city: string,role:string}
//     }>()
//     constructor() {
//     }
//     getUserInfo() {
//         this.toggleShow.value = true
//         this.username.value = this.accountStore.getCookie()!.username
//         this.usertoken.value = this.accountStore.getCookie()!.token
//         this.webrequests.getUsrInfo(this.username.value,this.usertoken.value)
//     }
// }

// export { UtilsUserInfoPart }