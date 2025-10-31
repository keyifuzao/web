import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import cors from '@koa/cors';
import { LoginRouter, RegisterRouter,essayApiRouter, userApiRouter  } from './RouterToPage.js';
import { InitData } from './OperationMainDB.js';

class Main {
    constructor() {
        this.baseUrl = 'mongodb://localhost:27017/web'
        this.loginRouter = new LoginRouter();
        this.registerRouter = new RegisterRouter();
        this.essayApiRouter = new essayApiRouter();
        this.userApiRouter = new userApiRouter();
        this.App = new Koa();
        
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
        this.App.use(this.registerRouter.router.routes(),this.registerRouter.router.allowedMethods());
        this.App.use(this.essayApiRouter.router.routes(),this.essayApiRouter.router.allowedMethods());
        this.App.use(this.userApiRouter.router.routes(),this.userApiRouter.router.allowedMethods());
        this.App.listen(3600, "localhost", () => {
            console.log("服务器已开启，请访问 http://localhost:3600");
        });
    }
    openDB(){
        const initDB = new InitData(this.baseUrl);
        initDB.ConnectDB();
        initDB.ListenData();
    }
}
const main = new Main();
main.start();
main.openDB();