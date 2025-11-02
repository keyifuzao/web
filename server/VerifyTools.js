import jwt from 'jsonwebtoken';
import { Main }  from './OperationMainDB.js';
import { OperationUserDB, UserModel } from './OperationUserDB.js';
import { OperationEssayDB, EssayModel } from './OperationEssayDB.js';

// token 类
class JsonWebToken {
    constructor(secret, hours) {
        this.secret = secret;
        this.hours = hours;
    }
    // 生成token
    CreateToken = (uuid, password) => jwt.sign({uuid, password}, this.secret, { expiresIn: this.hours })
    // 验证token
    VerifyToken = (token) => jwt.verify(token, this.secret);
}
class DataVerify {
    constructor() {
        this.uMain = null
        this.tokenTool = new JsonWebToken('fuzao_secret_key', '1h');
        this.initUserModel();
        this.initEssayModel();
    }
    //以下是初始化的相关操作
    initUserModel(){
        const UModel = new UserModel();
        const uSchema = UModel.__userSchema;
        const uModel = UModel.__userModel;
        const opUserDB = new OperationUserDB(uSchema, uModel);
        this.uMain = new Main(opUserDB);
    }
    initEssayModel(){
        const EModel = new EssayModel();
        const eSchema = EModel.__essaySchema;
        const eModel = EModel.__essayModel;
        const opEssayDB = new OperationEssayDB(eSchema, eModel);
        this.eMain = new Main(opEssayDB);
    }

    //以下是用户的相关操作
    async VeriftyLogin(id=null,password=null){
        let obj
        if (typeof id === 'number'){
            obj = { uuid: id , username: null}
        }else if (typeof id === 'string'){
            obj = { uuid: null , username: id}
        }
        const res = await this.uMain.__find(obj)
        if(res.data){
            return password === res.data.password ? { code: 1, message: '登录成功', data: res.data } : { code: 0, message: '密码错误', data: null };
        }else{
            return { code: 0, message: '无效用户名', data: null };
        }
    }
    async VeriftyRegister(data){
        const obj = { uuid: null , username: data.username}
        const res = await this.uMain.__find(obj)
        if(res.data){
            console.log('用户名已存在')
            return { code: 0, message: '用户名已存在'};
        }else{
            const uuid = await this.uMain.__makeID({ uuid: -1 })
            data.create_time = new Date()
            data.uuid = uuid
            const insertRes = await this.uMain.__insert(data)
            console.log('用户名还没有被注册')
            return insertRes.code === 1? { code: 1, message: '注册成功'} : { code: 0, message: '注册失败'};
        }
    }
    async VeriftyUserGet(token){
        const resChecked = await this.CheckedToken(token)
        if(resChecked.code === 1){
            console.log('token验证成功')
            const res = await this.uMain.__find({uuid:resChecked.data.uuid})
            return res.data? { code: res.code, message: res.message, data: res.data } : { code: 0, message: '请求异常', data: null };
        }else{
            return { code: 0, message: '无效token', data: null };
        }
    }
    async VeriftyUserPatch (token, data){
        const resChecked = await this.CheckedToken(token)
        if(resChecked.code === 1){
            console.log('token验证成功')
            data.update_time = new Date()
            const res = await this.uMain.__update(data.uuid, data)
            return { code:res.code, message: res.message }
        }else{
            return { code: 0, message: '无效token'};
        }
    }
    async VeriftyUserDel (token, uuid){
        const resChecked = await this.CheckedToken(token)
        if(resChecked.code === 1){
            console.log('token验证成功')
            const res = await this.uMain.__delete(parseInt(uuid))
            return res.code === 1? { code:res.code, message: res.message } : { code: 0, message: '请求异常'};
        }else{
            return { code: 0, message: '无效token'};
        }
    }
    //以下是文章的相关操作
    async VeriftyEssayGet(token, essayId){
        const resChecked = await this.CheckedToken(token)
        if(resChecked.code === 1){
            console.log('token验证成功')
            const res = await this.eMain.__find({essayId: parseInt(essayId)})
            return res.data? { code: res.code, message: res.message, data: res.data } : { code: 0, message: '请求异常', data: null };
        }else{
            return { code: 0, message: '无效token', data: null };
        }
    }
    async VeriftyEssayUp (token ,data) {
        const resChecked = await this.CheckedToken(token)
        if(resChecked.code === 1){
            console.log('token验证成功')
            data.essayId = await this.eMain.__makeID({ essayId: -1 })
            data.create_time = new Date()
            const res = await this.eMain.__insert(data)
            return res.code === 1? { code:res.code, message: res.message } : { code: 0, message: '请求异常'};
        }else{
            return { code: 0, message: '无效token'};
        }
    }
    async VeriftyEssayPatch (token ,data){
        const resChecked = await this.CheckedToken(token)
        if(resChecked.code === 1){
            console.log('token验证成功')
            data.update_time = new Date()
            const res = await this.eMain.__update(data.essayId, data)
            return res.code === 1? { code:res.code, message: res.message } : { code: 0, message: '请求异常'};
        }else{
            return { code: 0, message: '无效token'};
        }
    }
    async VeriftyEssayDel (token ,essayId){
        const resChecked = await this.CheckedToken(token)
        if(resChecked.code === 1){
            console.log('token验证成功')
            const res = await this.eMain.__delete(essayId)
            return res.code === 1? { code:res.code, message: res.message } : { code: 0, message: '请求异常'};
        }else{
            return { code: 0, message: '无效token'};
        }
    }
    async CheckedToken(token){
        const tokenRes = this.tokenTool.VerifyToken(token);
        if(tokenRes){
            const now = new Date()
            const exp = new Date(tokenRes.exp * 1000)
            const diffTime = exp - now;
            const uuid = tokenRes.uuid;
            if(diffTime > 0){
                const res = await this.uMain.__find({uuid})
                return res.data? { code: 1, message: '验证成功', data: res.data }: { code: 0, message: '请求异常', data: null };
            }else{
                return { code: 0, message: '登录超时', data: null };
            }
        }else{
            return { code: 0, message: '无效token', data: null };
        }
    }
}
export { JsonWebToken, DataVerify };
//secret为密钥，hours为过期时间，这里设置1h
//参数说明
// const secret = 'fuzao_secret_key';
// const hours = '1h';
// const tokenWork = new JsonWebToken('fuzao_secret_key', '1h');
// const token = tokenWork.CreateToken(100001, '123456');
// console.log(token);
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoxMDAwMDEsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNzYxNzk5NzE1LCJleHAiOjE3NjE4MDMzMTV9.fS2WPzjZum_dJmv3nYsYgSyWAWGUaCnj3pwm3qUmDWs'
// const tokenRes = tokenWork.VerifyToken(token);
// console.log(tokenRes);
// const Dbs = { uuid: 100001, username: 'zhangguorong', password: '123456' }
// const dataVerify = new DataVerify();

// dataVerify.VeriftyLogin(100001, '12343356').then(res => console.log(res))
// dataVerify.CheckedToken(token).then(res => console.log(res))
// const Dbs = { uuid: 100002, username: 'zhangsasdhk', password: '123456' }
// dataVerify.CreateUUID().then(res => console.log(res))
// dataVerify.InsertUser(Dbs).then(res => console.log(res))