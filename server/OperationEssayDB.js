import mongoose from 'mongoose';
class OperationEssayDB {
    constructor(baseSchema, baseModel) {
        this.Schema = baseSchema;
        this.Model = baseModel;
    }
    // 查询数据
    async FindDB(obj) {
        const { uuid,essayId } = obj;
        console.log('正在查询数据', uuid, essayId);
        if (!this.Model) {
            console.log('数据模型不存在');
            return { code: 0, message: '数据模型不存在', data: null };
        }
        if (essayId){
            console.log('正在查询文章id', essayId);
            const essayDb = await this.Model.findOne({ essayId });
            return essayDb ? { code: 1, message: '查询成功', data: essayDb } : { code: 0, message: '数据不存在', data: null };
        }else if (uuid) {
            console.log(`正在查询用户${uuid}的文章`);
            const essayDb = await this.Model.find({ uuid });
            return essayDb ? { code: 1, message: '查询成功', data: essayDb } : { code: 0, message: '数据不存在', data: null };
        }
        else {
            console.log('essayID无效');
            return { code: 0, message: '参数错误', data: null };
        }
    }
    // 插入数据
    async InsertDB(data) {
        const res = await this.FindDB(data);
        if (res.data === null) {
            await new this.Model(data).save();
            return { code: 1, message: '数据插入成功' };
        } else {
            return { code: 0, message: '该题目下已经文章，请重新修改题目' };
        }
    }
    // 更新数据
    async UpdateDB(essayId, data) {
        const updateDBs = await this.Model.updateOne({ essayId }, { $set: data });
        console.log('更新结果', updateDBs);
        if (updateDBs.modifiedCount) {
            return { code: 1, message: '数据更新成功' };
        } else {
            return { code: 0, message: '数据未修改' };
        }
    }
    // 删除数据
    async DeleteDB(essayId) {
        const deleteDBs = await this.Model.deleteOne({ essayId });
        if (deleteDBs.deletedCount) {
            return { code: 1, message: '数据删除成功' };
        } else {
            return { code: 0, message: '数据不存在' };
        }
    }
    // 生成UUID
    async MakeID(obj = { essayId: -1 }) {
        if (this.Model) {
            const sortEssayDb = await this.Model.find().sort(obj)
            if (sortEssayDb.length === 0) {
                return 1001;
            }
            const { essayId } = sortEssayDb[0];
            return essayId + 1;
        }
    }
}
class EssayModel {
    constructor() {
        this.essayDbStructure =  {
            uuid: { type: Number, required: true, minlength: 6, default: 100001 },
            essayId: { type: Number, required: true, minlength: 4, default: 1001 },
            type: { type: String, required: true, trim: true, minlength: 5, default: 'default_type' },
            title: { type: String, required: true, trim: true, minlength: 5, default: 'default_title' },
            content: { type: String, required: true, trim: true, minlength: 5, default: 'default_content' },
            author: { type: String, required: true, trim: true, minlength: 5, default: 'default_author' },
            create_time: { type: Date, default: new Date() },
            update_time: { type: Date, default: new Date() }
        }
    }
    get __essaySchema() {
        return new mongoose.Schema(this.essayDbStructure, { versionKey: false });
    }
    get __essayModel() {
        if (mongoose.models.essaydb) {
            return mongoose.models.essaydb
        }
        return mongoose.model('essaydb', this.__essaySchema)
    }
}
export { OperationEssayDB, EssayModel };