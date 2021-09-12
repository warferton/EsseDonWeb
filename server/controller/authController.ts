import AuthDao from '../dao/authDAO';
import { Request, Response} from 'express';

export default class AuthController{

    static async validate(req: Request, res : Response){
        try{
            const ValidationResponse = await AuthDao.validate(req);
            console.log("New user was created successfully");
            res.status(200).send(ValidationResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    static async login(req: Request, res : Response){
        try{
            await AuthDao.login(req, res);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    static async logout(req: Request, res : Response){
        try{
            const LogoutResponse = await AuthDao.logout(req);
            res.status(200).send(LogoutResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    static async register(req: Request, res : Response){
        try{
            const RegistrationResponse = await AuthDao.register(req);
            res.status(200).send(RegistrationResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }
}