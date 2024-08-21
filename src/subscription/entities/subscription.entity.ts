import { Family } from 'src/family/entities/family.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Subscription {
    @PrimaryColumn({ unique: true })
    subscription_id: string;

    @Column()
    startDate: Date;

    @Column({ nullable: true })
    clientType: string;

    @Column()
    endDate: Date;

    @Column({ nullable: true })
    status: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => Family, (family) => family.subscriptions)
    family: Family[];
}
