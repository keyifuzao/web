import jwt from 'jsonwebtoken';
import MongoTool from 'mongoose';

// token 类
class JsonWebToken {
    payload={username: '', password: ''}
    secret=''
    Model=null
    hours=''
    constructor() {
    }
    // 初始化数据
    InitData=(username='default_username',password='default_password',secret='fuzao_secret',hours='1h')=>{this.payload={username: username, password: password},this.secret=secret, this.hours=hours}
    // 生成token
    CreateToken=() => jwt.sign(this.payload, this.secret, { expiresIn: this.hours })
    // 验证token
    VerifyToken=(token="")=>jwt.verify(token, this.secret);
}
// 数据库操作类
class OperationDB {
    DB_URL=''
    Msg =''
    data={
        username:{type: String,required: true,trim: true,minlength: 5,default: 'default_username'},
        password:{type: String,required: true,trim: true,minlength: 6,default: 'default_password'},
        email:{type: String,trim: true,default: ''},
        tel:{type: Number,default: 0},
        sex:{type: String,default: ''},
        city:{type: String,default: ''},
        role:{type: String,default: ''}
    }
    Model=null
    constructor() {
    }
    // 连接数据库
    ConnectDB = async(DB_URL='mongodb://localhost:27017/maydata')=>await MongoTool.connect(DB_URL)?console.log("数据库连接成功"):console.log("数据库连接失败");
    // 监听数据库连接状态
    ListenDB = () => {
        MongoTool.connection.on('connected', () => {
            this.Msg = "数据库已连接成功";
        });
        MongoTool.connection.on('disconnected', () => {
            this.Msg = "数据库已断开连接";
        });
        MongoTool.connection.on('error', (error) => {
            this.Msg = "数据库连接错误：" + error.message;
        });
        MongoTool.connection.on('open', () => {
            this.Msg = "数据库已打开";
        });
        console.log(this.Msg);
    }

    // 初始化数据库
    InitDB = (DB_NAME='len_db') => this.Model = MongoTool.model(DB_NAME, new MongoTool.Schema(this.data, { versionKey: false }));

    // 开启数据库
    StartDB = (DB_URL='mongodb://localhost:27017/maydata', DB_NAME='len_db') =>{
        if (MongoTool.connection.readyState === 0){
            this.ConnectDB(DB_URL);
            this.ListenDB();
            this.InitDB(DB_NAME);
        }else if (MongoTool.connection.readyState === 1){
            console.log("数据库正在使用中");
            this.Model = MongoTool.model(DB_NAME);
        }else{
            console.log("数据库连接失败");
        }
    }

    // 数据库保存数据
    SaveData = async(data) => {
        if (this.Model) {
            const usermodel = new this.Model(data);
            const { username } = (await this.FindData(data.username)).data;
            if (!username) {
                await usermodel.save();
                console.log('数据保存成功');
                return { code: 1, msg: "数据保存成功" };
            }else if(username === data.username){
                console.log('数据已存在，保存失败');
                return { code: 2, msg: "数据已存在，保存失败" };
            } 
            else {
                console.log('数据已存在，保存失败');
                return { code: 0, msg: "数据已存在，保存失败" };
            }
        } else {
            console.log('数据库未开启');
            return { code: 0, msg: "数据库未开启" };
        }
    }

    // 数据库查找数据
    FindData = async(username) => {
        if (this.Model) {
            const loginUserDb = await this.Model.find({ username });
            if (loginUserDb.length > 0) {
                const { username, password} = loginUserDb[0];
                console.log('正在查找数据', { username, password });
                return { code: 1, msg: "数据查找成功", data: { username, password } };
            } else {
                console.log('数据查找失败');
                return { code: 0, msg: "数据查找失败" , data: { username: '', password: '' } };
            }
        } else {
            console.log('数据库未开启');
            return { code: 0, msg: "数据库未开启" , data: { username: '', password: '' } };
        }
    }
    // 数据库更新数据
    async UpdateData(username, data) {
        if (this.Model) {
            const updateUserDb = await this.Model.updateOne({ username }, {
                $set: data
            });
            console.log('数据更新成功,修改数量为：', updateUserDb.modifiedCount);
            return { code: 1, msg: "数据更新成功" };
        } else {
            console.log('数据更新失败，数据库未开启');
            return { code: 0, msg: "数据更新失败，数据库未开启" };
        }
    }
}

// 登录验证类
class LoginVerify {
    constructor() {
    }
    async Verify(username, password) {
        const opDB = new OperationDB();
        opDB.StartDB('mongodb://localhost:27017/mydata', 'len_db');
        const DBs = await opDB.FindData(username);
        if (DBs.code) {
            console.log(DBs.msg);
            return password === DBs.data.password?{code: 1,message: '验证成功'}:{code: 0,message: '密码错误'};
        }else{
            console.log(DBs.msg);
            return {code: 0,message: DBs.msg};
        }
    }
}
export { JsonWebToken, OperationDB, LoginVerify };