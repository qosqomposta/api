import { Company } from 'src/company/entities/company.entity';
import { DeliveryOrder } from 'src/delivery-order/entities/delivery-order.entity';
import { SUBSCRIPTION_STATUS } from 'src/enums/subscription.enum';
import { Family } from 'src/family/entities/family.entity';
import { ServicePricing } from 'src/service-pricing/entities/service-pricing.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Subscription {
    @PrimaryColumn({ unique: true })
    id: string;

    @Column({ nullable: true, type: 'datetime' })
    startDate: Date;

    @Column({ nullable: true, type: 'datetime' })
    endDate: Date;

    @Column({ nullable: true, enum: SUBSCRIPTION_STATUS })
    status: string;

    @Column({ nullable: true })
    baldes: number;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @OneToOne(() => Family, (family) => family.subscription, {
        nullable: true,
    })
    @JoinColumn({ name: 'family_id' })
    family: Family;

    @OneToOne(() => Company, (company) => company.subscription, {
        nullable: true,
    })
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @ManyToMany(
        () => ServicePricing,
        (servicePricing) => servicePricing.subscriptions,
        {
            onDelete: 'CASCADE',
        },
    )
    @JoinTable({ name: 'subscription_services' })
    pricings: ServicePricing[];

    @OneToMany(
        () => DeliveryOrder,
        (deliveryOrder) => deliveryOrder.subscription,
        {
            nullable: true,
            onDelete: 'CASCADE',
        },
    )
    deliver_orders: DeliveryOrder[];
}
