import mongoose from 'mongoose';
//主程序——开启数据库
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
//主程序——操作数据库
class Main{
    constructor(opDB) {
        this.opDB = opDB;
    }
    //这里的Dbs是整个数据
    async __insert(Dbs) {
        const res = await this.opDB.InsertDB(Dbs);
        console.log('已完成插入', res);
        return res;
    }
    //这里的id是Dbs中的uuid或者essayId
    async __update(id,Dbs) {
        const res = await this.opDB.UpdateDB(id, Dbs);
        console.log('已完成更新', res);
        return res;
    }
    //这里的id是数字类型，可以直接传入
    async __delete(id) {
        const res = await this.opDB.DeleteDB(id);
        console.log('已完成删除', res);
        return res;
    }
    //这里的obj必须是对象，不能是字符串或者数字，如果是字符串或者数字，应该包装为对象
    async __find(obj) {
        const res = await this.opDB.FindDB(obj);
        console.log('已完成查询', res.message);
        return res;
    }
    async __findBy(obj){
        const res = await this.opDB.FindDBby(obj);
        console.log('已完成查询', res.message);
        return res;
    }
    //这里的obj必须是对象，默认是{uuid:-1}，如果是其他模型，应该传入其他参数
    async __makeID(obj) {
        const res = await this.opDB.MakeID(obj);
        console.log('已完成生成ID', res);
        return res;
    }
}
export { InitData, Main };