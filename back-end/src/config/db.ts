import { createConnection } from 'typeorm';
import { Auth } from '../entity/Auth';
import { Contact } from '../entity/Contact';

export const connectServerToDB = async ()=>{
    const connection = await createConnection({
        type: "mysql",
        host: "mysql-db",
        port: 3306,
        username: "root",
        password: "mysql",
        database: "crud",
        entities: [
            Auth,Contact
        ],
        synchronize: true,
    });
    console.log(`App connected to DB ${connection.options.database}`);

    process.on('SIGINT', () => {
        connection.close().then(()=> console.log('connection with DB closed'))
    })
}