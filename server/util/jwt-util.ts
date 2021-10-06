import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUser } from '../types/user.type';
import config from '../config/server-config';

//Verify JWT
export function extractJWT(req: Request, res: Response, next: NextFunction) {
    const token = decodeURIComponent(req.cookies.JazzEsseDonToken);
    if(token) {
        jwt.verify(
            token, 
            config.token.secret,
            (error: Error | null, decoded : any) => {
                if(error) {
                    console.error( error );
                    res.status(500).json({
                        message: "The received token is malformed",
                    });
                }
                else {
                    res.locals['token'] = decoded;
                    console.log(decoded);
                    
                    next();
                }
            }
        )
        return;
    } 
    else {
        console.error(`User tried to access a page but no token recieved from | ${req.hostname} |`);
        return res.status(400).json({message: 'No token received'})
    }
}

export function signJWT(user: IUser, callback: (error: Error | null, token: string | null) => void) {
    const timeSinceEpoch = new Date().getTime();
    const expirationTime = timeSinceEpoch + config.token.expire*100000;
    const expTimeInSeconds = Math.floor(expirationTime / 1000);
    
    try{
        jwt.sign(
            {
                username: user.username,
                iat: timeSinceEpoch,
            },
            config.token.secret,
            {
                issuer: config.token.issuer,
                algorithm: 'HS512',
                expiresIn: expTimeInSeconds,
                subject: 'user',
                header:{
                    alg: 'HS512',
                    typ : 'JWT'
                }
            },
            (error, token) => {
                if(error) {
                    callback( error, null );
                }
                else if(token) {
                    callback( null, token );
                }
            }
        );
    } catch(error : any) {
        const err = new Error( error.message );
        console.error(`Error when signing a token: ${err.message} \n ${err}`);
        callback( err, null );
    }
}