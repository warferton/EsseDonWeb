import AuthDao from '../dao/authDAO';

export default class AuthController{

    static async login(req: any, res : any){
        try{

            const {username, password} = req.body

            const AuthResponse = AuthDao.login(username, password);

            res.status(200).send(AuthResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

    static async logout(req: any, res : any){
        try{
            const AuthResponse = AuthDao.logout(req);
            res.status(200).send(AuthResponse);
        }catch(err){
            res.status(500).send(err.message);
        }
    }
}