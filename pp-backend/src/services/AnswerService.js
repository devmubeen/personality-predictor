import Question from "../models/Question";
import { Utils } from "../utilities/Utils";

export class AnswerService {

    constructor() {
        this.utils = new Utils();
    }

    async processPersonalityType(body) {

        const { answers } = body;
        const pipeline = [
            { $unwind: '$options' },
            { $project: { options: 1, _id: 0 } }
        ]
        let answersArr = await Question.getModel().aggregate(pipeline);
        let countIntrovert = 0;
        let countExtrovert = 0;

        answersArr = answersArr.map(ans => ans.options);

        for (let i = 0; i < answersArr.length; i++) {
            const ansObj = answersArr[i];
            if(answers.includes(ansObj.answer)){
                if(ansObj.type === 'I'){
                    countIntrovert++;
                }
                else if(ansObj.type === 'E'){
                    countExtrovert++
                }
            }
        }



        console.log(countIntrovert, countExtrovert);
        if(countIntrovert > countExtrovert){
            return "I"
        }
        else{
            return "E"
        }
    }

}