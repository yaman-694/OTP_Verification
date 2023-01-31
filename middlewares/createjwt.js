import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const createtoken = (id)=>{

    // const userpower= md5(User_Type);
    const maxAge = 3*24*60*60;
    const Token = jwt.sign({id},config.jwt.TOKEN_HEADER_KEY,{
        expiresIn: maxAge
    });
    
    return Token;
}

export default createtoken;
