import mongoose from 'mongoose';
class InitData {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    ConnectDB=async()=>await mongoose.connect(this.baseUrl)? console.log('数据库连接成功') : console.log('数据库连接失败');

    ListenData() {
        mongoose.connection.on('connected', () => console.log('数据库正在连接...'));
        mongoose.connection.on('disconnected', () => console.log('数据库连接断开'));
        mongoose.connection.on('error', (err) => console.log('数据库连接错误', err));
    }
}

class OperationUserDB {
    constructor(baseSchema, baseModel) {
        this.Schema = baseSchema;
        this.Model = baseModel;
    }
    // 查询数据
    async FindDB(username = null, uuid = null) {
        let userORuuid = username ? username : uuid ? uuid : false;
        console.log('查询条件为', userORuuid);
        if (!this.Model) {
            console.log('数据模型不存在');
            return { code: 0, message: '数据模型不存在', data: null };
        }
        if (typeof userORuuid === 'number') {
            let uuid = userORuuid;
            console.log('正在使用uuid查询', uuid);
            const userDb = await this.Model.findOne({ uuid });
            return userDb ? { code: 1, message: '查询成功', data: userDb } : { code: 0, message: '数据不存在', data: null };
        } else if (typeof userORuuid === 'string') {
            let username = userORuuid;
            console.log('正在使用username查询', username);
            const userDb = await this.Model.findOne({ username });
            return userDb ? { code: 1, message: '查询成功', data: userDb } : { code: 0, message: '数据不存在', data: null };
        } else {
            console.log('参数错误');
            return { code: 0, message: '参数错误', data: null };
        }
    }
    // 插入数据
    async InsertDB(data) {
        const res = await this.FindDB(data.username, data.uuid);
        if (res.data === null) {
            await new this.Model(data).save();
            return { code: 1, message: '数据插入成功' };
        } else {
            return { code: 0, message: '数据已存在' };
        }
    }
    // 更新数据
    async UpdateDB(uuid, data) {
        const updateDBs = await this.Model.updateOne({ uuid }, { $set: data });
        console.log('更新结果', updateDBs);
        if (updateDBs.modifiedCount) {
            return { code: 1, message: '数据更新成功' };
        } else {
            return { code: 0, message: '数据未修改' };
        }
    }
    // 删除数据
    async DeleteDB(uuid) {
        const deleteDBs = await this.Model.deleteOne({ uuid });
        if (deleteDBs.deletedCount) {
            return { code: 1, message: '数据删除成功' };
        } else {
            return { code: 0, message: '数据不存在' };
        }
    }
    // 生成UUID
    async MakeUUID(obj = { uuid: -1 }) {
        if (this.Model) {
            const sortUserDb = await this.Model.find().sort(obj)
            const { uuid } = sortUserDb[0];
            return uuid + 1;
        }
    }
}

class Main{
    constructor(baseUrl,someSchema,someModel) {
        this.initDB = new InitData(baseUrl);
        this.opDB = new OperationUserDB( someSchema, someModel);
        this.initDB.ConnectDB();
        this.initDB.ListenData();
    }

    async __insert(Dbs) {
        const res = await this.opDB.InsertDB(Dbs);
        console.log('已完成插入', res);
        return res;
    }
    async __update(Dbs) {
        const res = await this.opDB.UpdateDB(Dbs.uuid, Dbs);
        console.log('已完成更新', res);
        return res;
    }
    async __delete(uuid) {
        const res = await this.opDB.DeleteDB(uuid);
        console.log('已完成删除', res);
        return res;
    }
    async __find(username = null, uuid = null) {
        const res = await this.opDB.FindDB(username, uuid);
        console.log('已完成查询', res.message);
        return res;
    }
    async __makeID(obj) {
        const res = await this.opDB.MakeUUID(obj);
        console.log('已完成生成UUID', res);
        return res;
    }
}

class UserModel {
    constructor() {
        this.userDbStructure =  {
            uuid: { type: Number, minlength: 6, default: 0 },
            username: { type: String, required: true, trim: true, minlength: 5, default: 'default_username' },
            password: { type: String, required: true, trim: true, minlength: 6, default: 'default_password' },
            email: { type: String, trim: true, default: '' },
            birthday: { type: String, default: '' },
            tel: { type: Number, default: 0 },
            gender: { type: Number, default: 0 },
            city: { type: String, default: '' },
            role: { type: Number, default: 0 },
            signature: { type: String, default: '' },
            create_time: { type: Date, default: new Date() }
        }
    }
    get __userSchema() {
        return new mongoose.Schema(this.userDbStructure, { versionKey: false });
    }

    get __userModel() {
        if (mongoose.models.userdb) {
            return mongoose.models.userdb
        }
        return mongoose.model('userdb', this.__userSchema)
    }

}
export { InitData, OperationUserDB, Main, UserModel};

//接口说明：DbStructure为schema的数据表结构，baseUrl为数据库地址，modelName为集合的名字,Dbs为要输入的数据
//无论是数据表结构还是要输入的数据，都必须包含{uuid,username}，否则会报错
//实例：
// const data = {
//     uuid: { type: Number, required: true, minlength: 6, default: 0 },
//     username: { type: String, required: true, trim: true, minlength: 5, default: 'default_username' },
//     password: { type: String, required: true, trim: true, minlength: 6, default: 'default_password' },
//     email: { type: String, trim: true, default: '' },
//     birthday: { type: String, default: '' },
//     tel: { type: Number, default: 0 },
//     gender: { type: Number, default: 0 },
//     city: { type: String, default: '' },
//     role: { type: Number, default: 0 },
//     signature: { type: String, default: '' },
//     create_time: { type: Date, default: Date.now }
// }
// const baseUrl = 'mongodb://localhost:27017/web'
// const modelName = 'userdb'
// let DBS = { uuid: 100001, username: 'zhangsan', password: '123456', email: 'fuzao@123.com', birthday: '1990-01-01', tel: 12345678901, gender: 1, city: '北京', role: 1, signature: '这个人很懒，什么都没留下', create_time: new Date() }
// const main = new Main(data, baseUrl, modelName)
// main.__find(DBS.username).then(res => console.log(res)) 
// main.__find(DBS.uuid).then(res => console.log(res)) //查询数据
// main.__insert(DBS).then(res => console.log(res)) //插入数据
// main.__update(DBS).then(res => console.log(res)) //更新数据
// main.__delete(DBS.uuid).then(res => console.log(res)) //删除数据
// main.__makeID({ uuid: -1 }).then(res => console.log(res)) //生成UUID

