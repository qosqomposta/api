import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class PickupItem {
    @PrimaryColumn('uuid')
    pickupItem_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;
}
