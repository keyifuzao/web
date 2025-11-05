import Router from '@koa/router';
import { JsonWebToken, DataVerify } from './VerifyTools.js'


class LoginRouter {
    constructor() {
        this.router = new Router({ prefix: '/login' });
        this.tokenTool = new JsonWebToken('fuzao_secret_key', '1h');
        this.dataVerify = new DataVerify();
        this.login();
        this.loadChecked()
    }
    async login() {
        this.router.post('/', async (ctx, next) => {
            await next();
            const { uuid, username, password } = ctx.request.body;
            const id = uuid?uuid:username?username:null;
            if (!id || !password) {
                ctx.status = 400;
                ctx.body = { code: 0, message: '缺少用户名或密码', data: null };
                return;
            }else{
                const { code, message, data }= await this.dataVerify.VeriftyLogin(id, password)
                if(data){
                    const token = this.tokenTool.CreateToken(data.uuid, password)
                    const Dbs = { uuid:data.uuid, username:data.username, token}
                    ctx.status = 200;
                    ctx.body = { code: 1, message, data:Dbs };
                }else{
                    ctx.status = 401;
                    ctx.body = { code: 0, message, data:null };
                }
            }
        })
    }
    async loadChecked(){
        this.router.get('/check', async (ctx, next) => {
            await next();
            const localtoken = ctx.request.headers['authorization'].split(' ')[1];
            if (!localtoken) {
                ctx.status = 401;
                ctx.body = { code: 0, message: '请先登录'};
            }else{
                try{
                    this.tokenTool.VerifyToken(localtoken)
                    ctx.status = 200;
                    ctx.body = { code: 1, message: 'token有效'};
                }catch(err){
                    ctx.status = 401;
                    ctx.body = { code: 0, message: err};
                }
            }
        })
    }
}

class RegisterRouter {
    constructor() {
        this.router = new Router({ prefix: '/register' });
        this.dataVerify = new DataVerify();
        this.register()
    }
    async register() {
        this.router.post('/', async (ctx, next) => {
            await next();
            const { username, password, email } = ctx.request.body;
            const { code, message } = await this.dataVerify.VeriftyRegister({ username, password, email })
            if (code) {
                ctx.status = 200;
                ctx.body = { code, message};
            } else {
                ctx.status = 400;
                ctx.body = { code, message};
            }
        })
    }
}

class essayApiRouter {
    router = new Router({ prefix: '/api/essay' });
    constructor() {
        this.dataVerify = new DataVerify();
        this.upEssay()
        this.getEssay()
        this.getEssayList()
        this.getEssayBy()
        this.patchEssay()
        this.delEssay()
    }
    async upEssay() {
        this.router.patch('/publish', async (ctx, next) => {
            await next();
            const data = ctx.request.body;
            const localtoken = ctx.request.headers['authorization'].split(' ')[1];
            if (!localtoken) {
                ctx.status = 401;
                ctx.body = { code: 0, message: '请先登录', data: null };
            }
            const { code, message } = await this.dataVerify.VeriftyEssayUp(localtoken, data)
            if (code) {
                ctx.status = 200;
                ctx.body = { code, message };
            } else {
                ctx.status = 401;
                ctx.body = { code, message };
            }
        })
    }
    async getEssay() {
        this.router.get('/get', async (ctx, next) => {
            await next();
            const { essayId } = ctx.request.query;
            const localtoken = ctx.request.headers['authorization'].split(' ')[1];
            if (!localtoken) {
                ctx.status = 401;
                ctx.body = { code: 0, message: '请先登录', data: null };
            }
            const { code, message, data } = await this.dataVerify.VeriftyEssayGet(localtoken, essayId)
            if (code) {
                ctx.status = 200;
                ctx.body = { code, message, data };
            } else {
                ctx.status = 401;
                ctx.body = { code, message, data: null };
            }
        })
    }
    async getEssayList(){
        this.router.get('/list', async (ctx, next) => {
            await next();
            const { pageSize, pageNum } = ctx.request.query;
            const localtoken = ctx.request.headers['authorization'].split(' ')[1];
            if (!localtoken) {
                ctx.status = 401;
                ctx.body = { code: 0, message: '请先登录', data: null };
            }
            const { code, message, data } = await this.dataVerify.VeriftyEssayGetList(localtoken, pageSize, pageNum)
            if (code) {
                ctx.status = 200;
                ctx.body = { code, message, data };
            } else {
                ctx.status = 401;
                ctx.body = { code, message, data: null };
            }
        })
    }
    async getEssayBy(){
        this.router.get('/type', async (ctx, next) => {
            await next();
            const { type, pageSize, pageNum } = ctx.request.query;
            const localtoken = ctx.request.headers['authorization'].split(' ')[1];
            if (!localtoken) {
                ctx.status = 401;
                ctx.body = { code: 0, message: '请先登录', data: null };
            }
            const { code, message, data } = await this.dataVerify.VeriftyEssayBy(localtoken, type, pageSize, pageNum)
            if (code) {
                ctx.status = 200;
                ctx.body = { code, message, data };
            } else {
                ctx.status = 401;
                ctx.body = { code, message, data: null };
            }
        })
    }
    async patchEssay() {
        this.router.patch('/modify', async (ctx, next) => {
            await next();
            const data = ctx.request.body;
            const localtoken = ctx.request.headers['authorization'].split(' ')[1];
            if (!localtoken) {
                ctx.status = 401;
                ctx.body = { code: 0, message: '请先登录', data: null };
            }
            const { code, message } = await this.dataVerify.VeriftyEssayPatch(localtoken, data)
            if (code) {
                ctx.status = 200;
                ctx.body = { code, message };
            } else {
                ctx.status = 401;
                ctx.body = { code, message };
            }
        })
    }
    async delEssay() {
        this.router.delete('/del', async (ctx, next) => {
            await next();
            const { essayId } = ctx.request.query;
            console.log(essayId)
            const localtoken = ctx.request.headers['authorization'].split(' ')[1];
            if (!localtoken) {
                ctx.status = 401;
                ctx.body = { code: 0, message: '请先登录', data: null };
            }
            const { code, message } = await this.dataVerify.VeriftyEssayDel(localtoken, essayId)
            if (code) {
                ctx.status = 200;
                ctx.body = { code, message };
            } else {
                ctx.status = 401;
                ctx.body = { code, message };
            }
        })
    }

}

class userApiRouter {
    router = new Router({ prefix: '/api/user' });
    constructor() {
        this.dataVerify = new DataVerify();
        this.getUser()
        this.patchUser()
        this.delUser()
    }
    async patchUser() {
        this.router.patch('/modify', async (ctx, next) => {
            await next();
            const data  = ctx.request.body;
            const localtoken = ctx.request.headers['authorization'].split(' ')[1];
            if (!localtoken) {
                ctx.status = 401;
                ctx.body = { code: 0, message: '请先登录', data: null };
            }
            const { code, message } = await this.dataVerify.VeriftyUserPatch(localtoken, data)
            if (code) {
                ctx.status = 200;
                ctx.body = { code, message };
            } else {
                ctx.status = 401;
                ctx.body = { code, message };
            }
        })
    }
    async getUser() {
        this.router.get('/get', async (ctx, next) => {
            await next();
            const localtoken = ctx.request.headers['authorization'].split(' ')[1];
            if (!localtoken) {
                ctx.status = 401;
                ctx.body = { code: 0, message: '请先登录', data: null };
            }
            const { code, message, data } = await this.dataVerify.VeriftyUserGet(localtoken)
            if (code) {
                ctx.status = 200;
                ctx.body = { code, message, data };
            } else {
                ctx.status = 401;
                ctx.body = { code, message, data: null };
            }
        })
    }

    async delUser() {
        this.router.delete('/del', async (ctx, next) => {
            await next();
            const localtoken = ctx.request.headers['authorization'].split(' ')[1];
            if (!localtoken) {
                ctx.status = 401;
                ctx.body = { code: 0, message: '请先登录', data: null };
            }
            const { uuid } = ctx.request.query;
            const { code, message } = await this.dataVerify.VeriftyUserDel(localtoken, uuid)
            if (code) {
                ctx.status = 200;
                ctx.body = { code, message };
            } else {
                ctx.status = 401;
                ctx.body = { code, message };
            }
        })
    }
}

export { LoginRouter, RegisterRouter, essayApiRouter, userApiRouter };