import { getManager } from "typeorm";
import { Auth } from "../entity/Auth";

export class AuthController {
    async save (user: Auth) {
        const savedUser = await getManager().insert(Auth,user)
        return savedUser
    }
    async getAll(){
        const users = await getManager().find(Auth);
        return users
    }
    async getOne(id:number){ 
        const users = await getManager().findOne(Auth,id);
        return users
    }
    async getLogin(login:string){ 
        const users = await getManager().find(Auth,{where:{login}});
        return users
    }
    async delete(id:number){ 
        const users = await getManager().delete(Auth,id);
        return users
    }
}