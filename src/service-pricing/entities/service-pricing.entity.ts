import { Subscription } from 'src/subscription/entities/subscription.entity';
import { WasteService } from 'src/waste-service/entities/waste-service.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
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

    @Column({ nullable: true })
    name: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => WasteService, (wasteService) => wasteService.pricings, {
        nullable: true,
    })
    wasteService: WasteService;

    @ManyToMany(() => Subscription, (subscription) => subscription.pricings)
    subscriptions: Subscription[];
}
