import { ClientType } from 'src/enums/clientType.enum';
import { PickupDay } from 'src/pickup-day/entities/pickup-day.entity';
import { PickupItem } from 'src/pickup-item/entities/pickup-item.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryColumn,
} from 'typeorm';
import { ServicePricing } from 'src/service-pricing/entities/service-pricing.entity';

@Entity()
export class WasteService {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    isDefault: boolean;

    @Column({
        nullable: true,
        enum: ClientType,
    })
    clientType: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @ManyToMany(() => PickupItem, (pickupItem) => pickupItem.wasteServices, {
        nullable: true,
    })
    @JoinTable({ name: 'waste_service_items' })
    pickupItems: PickupItem[];

    @ManyToMany(() => PickupDay, (pickupItem) => pickupItem.wasteServices, {
        nullable: true,
    })
    @JoinTable({ name: 'waste_service_days' })
    pickupDays: PickupDay[];

    @OneToMany(() => ServicePricing, (pricing) => pricing.wasteService, {
        nullable: true,
    })
    pricings: ServicePricing[];
}
