import { DeliveryOrder } from 'src/delivery-order/entities/delivery-order.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Courier {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    mother_last_name: string;

    @Column({ nullable: true })
    document_identity: number;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    refAddress: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @OneToMany(
        () => DeliveryOrder,
        (deliveryOrder) => deliveryOrder.subscription,
        {
            nullable: true,
        },
    )
    deliver_orders: DeliveryOrder[];
}
