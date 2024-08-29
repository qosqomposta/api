import { Subscription } from 'src/subscription/entities/subscription.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Company {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    ruc: number;

    @Column()
    phone: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    industry: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    owner_name: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @OneToMany(() => Subscription, (subscription) => subscription.company)
    subscriptions: Subscription[];
}
