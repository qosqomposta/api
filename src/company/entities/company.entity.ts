import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Company {
    @PrimaryColumn()
    company_id: string;

    @Column()
    name: string;

    @Column()
    ruc: string;

    @Column()
    phone: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;
}
