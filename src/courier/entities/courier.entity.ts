import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Courier {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column()
    mother_last_name: string;

    @Column()
    document_identity: number;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    refAddress: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;
}
