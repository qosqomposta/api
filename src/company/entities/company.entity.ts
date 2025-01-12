import { Subscription } from 'src/subscription/entities/subscription.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Company {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    ruc: number;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    industry: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    reference: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    owner_name: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;

    @OneToOne(() => Subscription, (subscription) => subscription.company)
    subscription: Subscription;

    @Column({ nullable: true })
    isActive: boolean;

    @Column({ nullable: true })
    customId: string;

    @Column({ nullable: true })
    district: string;
}
