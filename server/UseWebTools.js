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
    InitData=(uuid=100001,password='default_password',secret='fuzao_secret',hours='1h')=>{this.payload={uuid: uuid, password: password},this.secret=secret, this.hours=hours}
    // 生成token
    CreateToken=() => jwt.sign(this.payload, this.secret, { expiresIn: this.hours })
    // 验证token
    VerifyToken=(token="", secret="")=>jwt.verify(token, secret);
}
// 数据库操作类
class OperationDB {
    DB_URL=''
    Msg =''
    data={
        uuid:{type: Number,required: true,minlength: 6,default: 0},
        username:{type: String,required: true,trim: true,minlength: 5,default: 'default_username'},
        password:{type: String,required: true,trim: true,minlength: 6,default: 'default_password'},
        email:{type: String,trim: true,default: ''},
        birthday:{type: String,default: ''},
        tel:{type: Number,default: 0},
        gender:{type: Number,default: 0},
        city:{type: String,default: ''},
        role:{type: Number,default: 0},
        signature:{type: String,default: ''},
        create_time:{type: Date,default: Date.now}
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
            const { username } = (await this.FindDataName(data.username)).data;
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
    FindDataName = async(username) => {
        if (this.Model) {
            const loginUserDb = await this.Model.find({ username });
            if (loginUserDb.length > 0) {
                const { uuid,username, password, email, birthday, tel, gender, city, role,signature, create_time } = loginUserDb[0];
                console.log('正在查找数据', username);
                return { code: 1, msg: "数据查找成功", data: { uuid, username, password, email, birthday, tel, gender, city, role,signature, create_time} };
            } else {
                console.log('数据查找失败');
                return { code: 0, msg: "数据查找失败" , data: { username: '', password: '' } };
            }
        } else {
            console.log('数据库未开启');
            return { code: 0, msg: "数据库未开启" , data: { username: '', password: '' } };
        }
    }
    // 数据库查找数据
    FindDataUUID = async(uuid) => {
        if (this.Model) {
            const loginUserDb = await this.Model.find({ uuid });
            if (loginUserDb.length > 0) {
                const { uuid,username, password, email, birthday, tel, gender, city, role,signature, create_time } = loginUserDb[0];
                console.log('正在查找数据', uuid);
                return { code: 1, msg: "数据查找成功", data: { uuid, username, password, email, birthday, tel, gender, city, role,signature, create_time} };
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
    async UpdateData(uuid, data) {
        if (this.Model) {
            const updateUserDb = await this.Model.updateOne({ uuid }, {
                $set: data
            });
            console.log('数据更新成功,修改数量为：', updateUserDb.modifiedCount);
            return { code: 1, message: "数据更新成功" };
        } else {
            console.log('数据更新失败，数据库未开启');
            return { code: 0, message: "数据更新失败，数据库未开启" };
        }
    }

    MakeUUID = async(obj) => {
        if (this.Model) {
            const sortUserDb = await this.Model.find().sort(obj)
            const { uuid } = sortUserDb[0];
            return uuid + 1;
        }
    }
}

// 登录验证类
class LoginVerify {
    constructor() {
    }
    async VerifyUserName( username, password) {
        const opDB = new OperationDB();
        opDB.StartDB('mongodb://localhost:27017/mydata', 'len_db');
        const DBs = await opDB.FindDataName(username);
        if (DBs.code) {
            console.log(DBs.msg);
            return password === DBs.data.password?{code: 1,message: '验证成功',data: DBs.data}:{code: 0,message: '密码错误',data:null};
        }else{
            console.log(DBs.msg);
            return {code: 0,message: DBs.msg,data:null};
        }
    }
    async VerifyUUID(uuid, password) {
        const opDB = new OperationDB();
        opDB.StartDB('mongodb://localhost:27017/mydata', 'len_db');
        const DBs = await opDB.FindData(uuid);
        if (DBs.code) {
            console.log(DBs.msg);
            return password === DBs.data.password?{code: 1,message: '验证成功',data: DBs.data}:{code: 0,message: '密码错误',data:null};
        }else{
            console.log(DBs.msg);
            return {code: 0,message: DBs.msg,data:null};
        }
    }

    async StatusVerify(uuid, token){
        const opDB = new OperationDB();
        const tokenVerify = new JsonWebToken();
        const tokenRes = tokenVerify.VerifyToken(token, 'fuzao_secret');
        if(tokenRes){
            const now = new Date()
            const exp = new Date(tokenRes.exp * 1000)
            const diffTime = exp - now;
            if(diffTime > 0){
                opDB.StartDB('mongodb://localhost:27017/mydata', 'len_db');
                const DBs = await opDB.FindDataUUID(uuid);
                if (DBs.code) {
                    console.log(DBs.msg);
                    return uuid === DBs.data.uuid?{code: 1,message: '验证成功',data: DBs.data}:{code: 0,message: '无效用户名'};
                }else{
                    return {code: 0,message: '无效用户名'};
                }
            }else{
                return {code: 0,message: '登录超时'};
            }
        }else{
            return {code: 0,message: '无效token'};
        }
    }

}
export { JsonWebToken, OperationDB, LoginVerify };







