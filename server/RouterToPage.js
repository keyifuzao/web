import Router from '@koa/router';
import { JsonWebToken, DataVerify } from './VerifyTools.js'


class LoginRouter {
    constructor() {
        this.router = new Router({ prefix: '/login' });
        this.tokenTool = new JsonWebToken('fuzao_secret_key', '1h');
        this.dataVerify = new DataVerify();
        this.login();
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
    constructor() { }
    async upEssay() {
        this.router.patch('/publish', async (ctx, next) => {
            await next();
            ctx.body = { code: 1, message: '上传成功' }
        })
    }
    async getEssay() {
        this.router.get('/get', async (ctx, next) => {
            await next();
            ctx.body = { code: 1, message: '获取成功' }
        })
    }
    async patchEssay() {
        this.router.patch('/modify', async (ctx, next) => {
            await next();
            ctx.body = { code: 1, message: '修改成功' }
        })
    }
    async delEssay() {
        this.router.delete('/del', async (ctx, next) => {
            await next();
            ctx.body = { code: 1, message: '删除成功' }
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