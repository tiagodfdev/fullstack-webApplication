import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Auth {

    constructor( login:string , password:string){
        this.login = login
        this.password = password
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;

}
