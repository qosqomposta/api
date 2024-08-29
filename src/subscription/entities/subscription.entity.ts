import { Company } from 'src/company/entities/company.entity';
import { Family } from 'src/family/entities/family.entity';
import { ServicePricing } from 'src/service-pricing/entities/service-pricing.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
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

    @Column({ nullable: true })
    clientType: string;

    @Column({ nullable: true, type: 'datetime' })
    endDate: Date;

    @Column({ nullable: true })
    status: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @OneToOne(() => Family, (family) => family.subscriptions)
    @JoinColumn({ name: 'family_id' })
    family: Family;

    @OneToOne(() => Company, (company) => company.subscriptions)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @ManyToMany(() => ServicePricing, (pricing) => pricing.subscriptions)
    @JoinTable({ name: 'subscription_prices' })
    pricings: ServicePricing[];
}
