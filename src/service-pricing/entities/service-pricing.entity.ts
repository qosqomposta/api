import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ServicePricing {
    @PrimaryGeneratedColumn()
    service_pricing_id: number;

    @Column()
    price: number;

    @Column({ nullable: true })
    frequency: number;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;
}
