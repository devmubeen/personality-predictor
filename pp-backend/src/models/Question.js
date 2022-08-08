import { v4 as uuidv4 } from 'uuid';
import { Utils } from '../utilities/Utils';

export class User {

    constructor() {
        this.utils = new Utils();
    }


    getSchema(questionObject) {
        const schema = {
            QuestionId : uuidv4(),
            Question : questionObject.question,
            Options: questionObject.options
        }
        return schema;
    }

}