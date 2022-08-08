import { v4 as uuidv4 } from 'uuid';
import { Utils } from '../utilities/Utils';

export class User {

    constructor() {
        this.utils = new Utils();
    }


    getSchema(questionObject) {
        const schema = {
            question : questionObject.question,
            options: questionObject.options
        }
        return schema;
    }

}