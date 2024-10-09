import { PickupDay } from 'src/pickup-day/entities/pickup-day.entity';
import { PickupItem } from 'src/pickup-item/entities/pickup-item.entity';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { WasteService } from 'src/waste-service/entities/waste-service.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
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

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;

    @Column({ nullable: true })
    oneTimePrice?: number;

    @Column({ nullable: true })
    isAddon?: number;

    @ManyToOne(() => WasteService, (wasteService) => wasteService.pricings, {
        nullable: true,
    })
    @JoinColumn()
    wasteService: WasteService;

    @ManyToMany(() => Subscription, (subscription) => subscription.pricings)
    subscriptions: Subscription[];

    @ManyToMany(() => PickupItem, (pickupItem) => pickupItem.pricings, {
        nullable: true,
    })
    @JoinTable({ name: 'waste_service_items' })
    pickupItems: PickupItem[];

    @ManyToMany(() => PickupDay, (pickupDay) => pickupDay.pricings, {
        nullable: true,
    })
    @JoinTable({ name: 'waste_service_days' })
    pickupDays: PickupDay[];
}
