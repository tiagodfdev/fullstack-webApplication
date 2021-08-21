import { getManager } from "typeorm";
import { Contact } from "../entity/Contact";

export class ContactController {
    async save (contact: Contact) {
        const savedContact = await getManager().insert(Contact,contact)
        return savedContact
    }
    async getAll(){
        const contacts = await getManager().find(Contact);
        return contacts
    }
    async getOne(id:number){ 
        const contact = await getManager().findOne(Contact,id);
        return contact
    }
    async update(id:number,data:Contact){ 
        const contact = await getManager().findOne(Contact,id);
        if (contact){
            const merged = getManager().merge(Contact,data)
            const results = await getManager().update(Contact,id,merged)
            return results
        }
        return false
    }
    async delete(id:number){ 
        const contact = await getManager().delete(Contact,id);
        return contact
    }
}