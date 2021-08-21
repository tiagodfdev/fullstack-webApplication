import { Auth } from '../entity/Auth';
import { Router } from 'express'
import { AuthController } from '../controller/AuthController';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export const routerAuth = Router();
const authCtrl = new AuthController();

routerAuth.post('/', async(req, res) => {
    const {login, password } = req.body;
    const passwordHash = await bcrypt.hash(password,8)

    const user = new Auth( login, passwordHash)
    const savedUser = await authCtrl.save(user)
    res.json(savedUser)
})
routerAuth.post('/login', async(req, res) => {
    const {login, password } = req.body;
    const user = await authCtrl.getLogin(login)
    if (user){
        if (await bcrypt.compare(password, user[0].password)){
            const token = jwt.sign({id:user[0].id}, process.env.APP_SECRET, {
                expiresIn:'1d'
            })
            const data = {
                id:user[0].id,
                login:user[0].login,
                token
            }
            return res.json(data)
        }else {
            return res.status(404).json({message:'User or password wrong'})
        }
    } else {
        return res.status(404).json({message:'User or password wrong'})
    }
})
routerAuth.get('/', async(req,res)=>{
    const users = await authCtrl.getAll()
    const resFiltred=users.map((user)=>{
        return{login:user.login, id:user.id}
    })
    res.json(resFiltred)
})
routerAuth.get('/:id', async(req,res)=>{
    const id = parseInt(req.params.id, 10);
    const user = await authCtrl.getOne(id)
    const resFiltred = {login:user.login, id:user.id}
    res.json(resFiltred)
})
routerAuth.delete('/:id', async(req,res)=>{
    const id = parseInt(req.params.id, 10);
    const user = await authCtrl.delete(id)
    res.json(user)
})