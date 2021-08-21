import { Router } from 'express'
import { ContactController } from '../controller/ContactController';
import { Contact } from '../entity/Contact';

export const routerContact = Router();
const contactCtrl = new ContactController();

routerContact.post('/', async(req, res) => {
    const {firstName, lastName, phone, birthDate, address, email } = req.body;
    const contact = new Contact( firstName, lastName, phone, birthDate, address, email)
    const savedContact = await contactCtrl.save(contact)
    res.json(savedContact)
})
routerContact.get('/', async(req,res)=>{
    const contacts = await contactCtrl.getAll()
    res.json(contacts)
})
routerContact.get('/:id', async(req,res)=>{
    const id = parseInt(req.params.id, 10);
    const contacts = await contactCtrl.getOne(id)
    res.json(contacts)
})
routerContact.patch('/:id', async(req,res)=>{
    const id = parseInt(req.params.id, 10);
    const contacts = await contactCtrl.update(id,req.body)

    if (!contacts){
        res.status(404).json({message: 'Contact not found'})
        return
    }
    res.json(contacts)
})
routerContact.delete('/:id', async(req,res)=>{
    const id = parseInt(req.params.id, 10);
    const contacts = await contactCtrl.delete(id)
    res.json(contacts)
})