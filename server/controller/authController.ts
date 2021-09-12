import AuthDao from '../dao/authDAO';

export default class AuthController{

    static async validate(req: any, res : any){
        try{
            const ValidationResponse = await AuthDao.validate(req);
            console.log("New user was created successfully");
            res.status(200).send(ValidationResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    static async login(req: any, res : any){
        try{
            await AuthDao.login(req, res);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    static async logout(req: any, res : any){
        try{
            const LogoutResponse = await AuthDao.logout(req);
            res.status(200).send(LogoutResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    static async register(req: any, res : any){
        try{
            const RegistrationResponse = await AuthDao.register(req);
            res.status(200).send(RegistrationResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }
}