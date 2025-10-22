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
                ctx.status = 401;
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
            opDB.StartDB('mongodb://localhost:27017/mydata', 'len_db')
            const { code } = await opDB.SaveData({username, password, email});
            if (code === 1) {
                ctx.body = {code:1,message:'注册成功'};
                ctx.status = 200;
            } else if (code === 2) {
                ctx.body = {code:2,message:'用户名已存在'};
                ctx.status = 409;
            }else {
                ctx.body = {code:0,message:'注册失败'};
                ctx.status = 401;
            }
        })
    }
}

class APIRouter {
    router=new Router({ prefix: '/api' });
    loginVerify = new LoginVerify();
    constructor() {
        this.home();
        this.article();
        this.userInfo();
        this.updateUserInfo();
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
    //获取用户信息
    async userInfo() {
        this.router.post('/userInfo', async (ctx,next) => {
            await next();
            const { username } = ctx.request.body;
            const localtoken = ctx.request.headers['authorization'].split(' ')[1];
            if (username && localtoken){
                    await this.loginVerify.StatusVerify(username, localtoken).then(res => {
                    const { code, message, data } = res
                    ctx.body = {code, message, data}
                    ctx.status = 200;
                }).catch(err => {
                    ctx.body = {code:0,message:err.message,data:null};
                    ctx.status = 401;
                })
            }else{
                ctx.body = {code:0,message:'请先登录',data:null};
                ctx.status = 401;
                }
            }
        )
    }

    async updateUserInfo() {
        this.router.post('/updateUserInfo', async (ctx,next) => {
            await next();
            const { username, email, age, tel, sex, city, role }  = ctx.request.body ;
            const localtoken = ctx.request.headers['authorization'].split(' ')[1];
            if (username && localtoken){
                const resChecked = await this.loginVerify.StatusVerify(username, localtoken)
                let resupdate
                if (resChecked.code) {
                    const opDB = new OperationDB();
                    opDB.StartDB('mongodb://localhost:27017/mydata', 'len_db')
                    resupdate = await opDB.UpdateData(username, { email, age, tel, sex, city, role })

                } 
                ctx.body = {code:resChecked.code,message:resupdate.message};
                ctx.status = 200;
            }else{
                ctx.body = {code:0,message:'请先登录'};
                ctx.status = 401;
            }
        })
    }
}

export { LoginRouter, RegisterRouter, APIRouter };

