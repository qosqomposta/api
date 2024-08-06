import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DeliveryOrder {
    @PrimaryColumn({ unique: true })
    deliver_order_id: string;

    @Column()
    dateReceived: Date;

    @Column()
    waste_weight: number;

    @Column({ nullable: true })
    compost: number;

    @Column({ nullable: true })
    note: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;
}
