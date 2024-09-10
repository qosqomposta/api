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

    @Column({ nullable: true })
    status: string;

    @Column({ nullable: true })
    baldes: number;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @OneToOne(() => Family, (family) => family.subscriptions)
    @JoinColumn({ name: 'family_id' })
    family: Family;

    @OneToOne(() => Company, (company) => company.subscriptions)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @ManyToMany(
        () => ServicePricing,
        (servicePricing) => servicePricing.subscriptions,
    )
    @JoinTable({ name: 'subscription_services' })
    pricings: ServicePricing[];
}
