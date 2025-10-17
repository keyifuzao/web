import Router from '@koa/router';
import { JsonWebToken, OperationDB, LoginVerify } from './UseWebTools.js'

class LoginRouter {
    router = new Router({ prefix: '/login' });
    jsonWebToken = new JsonWebToken();
    operationDB = new OperationDB();
    loginVerify = new LoginVerify();
    constructor() {
        this.login();
    }
    async login() {
        this.router.post('/', async (ctx, next) => {
            await next();
            const { username, password } = ctx.request.body;
            const { code, message } = await this.loginVerify.Verify(username, password);
            if (code) {
                this.jsonWebToken.InitData(username, password, 'fuzao_secret', '1h');
                const token = this.jsonWebToken.CreateToken();
                ctx.status = 200;
                ctx.body = { code: 1, message: '登录成功', token };
            } else {
                ctx.status = 400;
                ctx.body = { code: 0, message };
            }
        })
    }
}

class RegisterRouter {
    router=new Router({ prefix: '/register' });
    constructor() {
        this.register()
    }
    async register() {
        this.router.post('/', async (ctx, next) => {
            await next();
            const { username, password, email } = ctx.request.body;
            const opDB = new OperationDB();
            opDB.StartDB('mongodb://localhost:27017/maydata', 'len_db')
            const { code } = await opDB.SaveData({username, password, email});
            if (code === 1) {
                ctx.body = {code:1,message:'注册成功'};
                ctx.status = 200;
            } else if (code === 2) {
                ctx.body = {code:0,message:'用户名已存在'};
                ctx.status = 409;
            }else {
                ctx.body = {code:0,message:'注册失败'};
                ctx.status = 400;
            }
        })
    }
}

class APIRouter {
    router=new Router({ prefix: '/api' });
    constructor() {
        this.home();
        this.article();
    }
    async home() {
        this.router.get('/home', async (ctx, next) => {
            await next();
            ctx.body = {code:1,message:'欢迎来到首页'}
        });
    }
    async article() {
        this.router.get('/article', async (ctx,next) => {
            await next();
            ctx.body = {code:1,message:'文章列表'}
        });
    }
}

export { LoginRouter, RegisterRouter, APIRouter };

