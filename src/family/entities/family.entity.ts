import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Family {
    @PrimaryColumn()
    family_id: string;

    @Column()
    name: string;

    @Column({ default: 'Default address' })
    address: string;

    @Column({ nullable: true })
    reference: string;

    @Column()
    isActive: boolean;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;
}
