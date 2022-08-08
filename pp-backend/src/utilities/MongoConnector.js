import { mongoDbUrl } from '../configuration/env';
import mongoose from 'mongoose';

export class MongoConnecter {

    constructor() { }

    getClient() {
        const instance = mongoose.connect(mongoDbUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
            .then(() => { console.log('DB Connected') })
            .catch((error) => { console.log('Err', error) });

        return instance;
    }

}