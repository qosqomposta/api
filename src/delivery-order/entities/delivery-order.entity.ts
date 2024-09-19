import { Courier } from 'src/courier/entities/courier.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class DeliveryOrder {
    @PrimaryColumn({ unique: true })
    id: string;

    @Column()
    date_received: Date;

    @Column('float', { precision: 6, scale: 2 })
    waste_weight: number;

    @Column({ nullable: true })
    compost: number;

    @Column({ nullable: true })
    note: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @ManyToOne(
        () => Subscription,
        (subscription) => subscription.deliver_orders,
    )
    @JoinColumn({ name: 'subscription_id' })
    subscription: Subscription;

    @ManyToOne(() => Courier, (courier) => courier.deliver_orders)
    @JoinColumn({ name: 'courier_id' })
    courier: Courier;
}
