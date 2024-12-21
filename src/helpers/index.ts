import crypto from 'crypto';
import 'dotenv/config';

const SECRET = process.env.CRYPTO_SECRET as string;

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) =>{
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};

export const list_checksum_calc =(level_table:string[]|string, img_table:string[]|string, usr_email:string) => {
    return crypto.createHmac('sha256', [level_table, img_table, usr_email].join('/')).update(SECRET).digest('hex')
};


export const rand_id =() => crypto.randomInt(10000,99999);

// TODO Incorporate User salt to list checksum