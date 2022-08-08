import mongoose from 'mongoose';

let Schema = mongoose.Schema;

class Question {

    constructor() {
        this.QuestionModel = mongoose.model('Question', this.getQuestionSchema())
    }


    getQuestionSchema() {
        let schema = new Schema({
            question: {
                type: String,
                required: true
            },
            options: [
                {
                    _id: false,
                    type: Object
                }
            ]
        })
        return schema
    }


    getModel(){

        return this.QuestionModel;

    }




    /* addRecord(data) {
        return this.UserModel.create(data);
    }

    updateRecord(updateParam, data) {
        return this.UserModel.updateOne(updateParam, data);
    }

    updateManyRecord(updateParam, data) {

        return this.UserModel.updateMany(updateParam, data);

    }

    getRecord(find_params = {}, select_fields = '', sort_by = {}, limit = null, offset = null) {

        return this.UserModel
            .find(find_params)
            .populate({ path: "role", populate: "permissions.resource" })
            .sort(sort_by)
            .skip(offset)
            .limit(limit)
            .select(select_fields)
            .lean(true)

    }

    countRecord(find_params) {

        return this.UserModel.countDocuments(find_params);

    }

    deleteRecord(identifier) {


        let updateDeleteFlag = {
            'isDeleted': true
        };
        return this.UserModel.updateOne({ _id: identifier }, updateDeleteFlag);
    } */


}

export default new Question();