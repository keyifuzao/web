import axios from "axios";

class UtilsLoginOrRegister {
    constructor(){
    }
    async login(username: string, password: string){
        const res:{data:{code: number, message: string, data: {uuid: number, username: string, token: string} | null }} = await axios.post('http://localhost:3600/login', {username, password},{withCredentials: true, headers: {'Content-Type': 'application/json'}})
        return res
    }
    async register(username: string, password: string, email: string){
        const res:{data:{code: number, message: string}} = await axios.post('http://localhost:3600/register', {username, password, email},{withCredentials: true, headers: {'Content-Type': 'application/json'}})
        return res
    }
}
class UtilsWebRequests {
    AxiosService: any
    constructor(token: string) {
        this.AxiosService = axios.create({
            baseURL: 'http://localhost:3600/api',
            withCredentials: false,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }
    async getUser(){
        const res = await this.AxiosService.get('/user/get')
        return res
    }
    async patchUser(data: {uuid: number, username: string, email: string, birthday: string, tel: number, gender: number, city: string, signature: string}){
        const res:{data:{code: number, message: string}} = await this.AxiosService.patch('/user/modify', data)
        return res
    }
    async delUser(uuid: number){
        const res:{code: number, message: string} = await this.AxiosService.delete('/user/delete', { params: { uuid } })
        return res
    }
    async getEssayList(pageSize: number, pageNum: number){
        const res:{data:{code: number, message: string, data: object[]}} = await this.AxiosService.get('/essay/list', { params: { pageSize, pageNum } })
        return res
    }
    async getEssayBy(type: string, pageSize: number, pageNum: number){
        const res:{data:{code: number, message: string, data: object[]}} = await this.AxiosService.get('/essay/type', { params: { type, pageSize, pageNum } })
        return res
    }
    async patchEssay(data:{uuid:number, essayId: number, type: string, title: string, content: string, author: string}){
        const res:{data:{code: number, message: string}} = await this.AxiosService.patch('/essay/modify', data)
        return res
    }
    async upEssay(data:{uuid:number, essayId: number, type: string, title: string, content: string, author: string}){
        const res:{data:{code: number, message: string}} = await this.AxiosService.patch('/essay/publish', data)
        return res
    }
    async delEssay(essayId: number){
        const res:{data:{code: number, message: string}} = await this.AxiosService.delete('/essay/del', { params: { essayId } })
        return res
    }
}

export { UtilsLoginOrRegister, UtilsWebRequests }