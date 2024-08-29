import { Subscription } from 'src/subscription/entities/subscription.entity';
import { WasteService } from 'src/waste-service/entities/waste-service.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class ServicePricing {
    @PrimaryColumn()
    id: string;

    @Column()
    price: number;

    @Column({ nullable: true })
    frequency: number;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => WasteService, (service) => service.pricings, {
        nullable: true,
    })
    @JoinColumn({ name: 'waste_service_id' })
    wasteService: WasteService;

    @ManyToMany(() => Subscription, (subscription) => subscription.pricings)
    subscriptions: Subscription[];
}
