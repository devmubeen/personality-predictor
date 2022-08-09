export class Constants {
    public static LANGUAGES = [
        {
            short_name: "en-us",
            name: "English",
        },
    ];

    public static APP_NAME = 'personality predictor';

    public static STORAGE_ITEM = {
        ANSWERS: "_LUD",
        QUESTION_INDEX: "_QI",
        PERSONALITY: "_UY"
        
    };
    public static API_CONFIG = {
        GET_QUESTIONS: 'question',
        POST_QUESTION: 'question',
        PROCESS_ANSWER: 'answer/personality',
        
    };
}
