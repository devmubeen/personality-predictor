/* Temp Variables */
process.env.PORT = 5000;
process.env.ENV_TYPE = 'dev';

export const env = process.env.ENV_TYPE;
export const port = process.env.PORT;

export const allowedDomains = [
    'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop'
];

export const bodyLimit = '1000kb';
export const cookieSecret = '@pp_cookie';
export const passwordSaltRounds = 10;
export const jwtSecret = '@pp_123!@#';