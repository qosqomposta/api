import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Customer {
    @PrimaryColumn({ unique: true })
    customer_id: string;

    @Column()
    name: string;

    @Column()
    document_identity: number;

    @Column()
    last_name: string;

    @Column({ nullable: true })
    mother_last_name: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    reference: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;
}
