import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import cors from '@koa/cors';
import { LoginRouter, RegisterRouter, APIRouter } from './Router.js';

class Main {
    loginRouter = new LoginRouter();
    registerRouter = new RegisterRouter();
    apiRouter = new APIRouter();
    App = new Koa();
    constructor() {
    }
    async start() {
        this.App.use(bodyParser());
        this.App.use(cors({
            origin: function(ctx) {                         //设置允许来自指定域名请求
                if (ctx.url === '/test') {
                    return '*';                    // 允许来自所有域名请求
                }
                return 'http://localhost:3000';     //只允许http://localhost:3000这个域名的请求
            },
            maxAge: 5,                                  //指定本次预检请求的有效期，单位为秒。
            credentials: true,                           //是否允许发送Cookies
            allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        }));
        this.App.use(this.loginRouter.router.routes(),this.loginRouter.router.allowedMethods());
        this.App.use(this.apiRouter.router.routes(),this.apiRouter.router.allowedMethods());
        this.App.use(this.registerRouter.router.routes(),this.registerRouter.router.allowedMethods());
        this.App.listen(3600, "localhost", () => {
            console.log("服务器已开启，请访问 http://localhost:3600");
        });
    }
}
const main = new Main();
main.start();
