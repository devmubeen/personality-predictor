/* Temp Variables */
process.env.PORT = 5000;
process.env.ENV_TYPE = 'dev';
process.env.MONGODB_URL = 'mongodb://localhost:27017/personality-games';

export const mongoDbUrl = process.env.MONGODB_URL;
export const env = process.env.ENV_TYPE;
export const port = process.env.PORT;

export const allowedDomains = [
    'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop',
    'http://localhost:4200'
];

export const bodyLimit = '1000kb';
export const cookieSecret = '@pp_cookie';
export const passwordSaltRounds = 10;
export const jwtSecret = '@pp_123!@#';