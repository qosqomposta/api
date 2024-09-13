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
    dateReceived: Date;

    @Column()
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
}
