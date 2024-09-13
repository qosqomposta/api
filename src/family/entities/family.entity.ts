import { Customer } from 'src/customer/entities/customer.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';

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

    @Column({ nullable: true })
    customId: string;

    @OneToMany(() => Customer, (customer) => customer.family)
    customers: Customer[];

    @OneToOne(() => Subscription, (subscription) => subscription.family)
    subscription: Subscription;
}
