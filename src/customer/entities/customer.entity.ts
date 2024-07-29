import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
    @PrimaryColumn()
    customer_id: number;

    @Column()
    name: string;

    @Column()
    document_identity: number;

    @Column()
    last_name: string;

    @Column()
    mother_last_name: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    reference: string;
}
