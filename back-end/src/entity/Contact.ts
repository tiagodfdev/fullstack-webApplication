import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Contact {

    constructor( firstName:string , lastName:string, phone:string, birthDate:string, address:string, email:string){
        this.firstName = firstName
        this.lastName = lastName
        this.phone = phone
        this.birthDate = birthDate
        this.address = address
        this.email = email
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column()
    birthDate: string;

    @Column()
    address: string;

    @Column()
    email: string;

}
