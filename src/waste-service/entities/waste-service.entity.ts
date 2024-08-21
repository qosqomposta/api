import { ClientType } from 'src/enums/clientType.enum';
import { PickupDay } from 'src/pickup-day/entities/pickup-day.entity';
import { PickupItem } from 'src/pickup-item/entities/pickup-item.entity';
import { ServicePricing } from 'src/service-pricing/entities/service-pricing.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class WasteService {
    @PrimaryColumn({ unique: true })
    waste_service_id: string;

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
    @JoinTable()
    pickupItems: PickupItem[];

    @ManyToMany(() => PickupDay, (pickupItem) => pickupItem.wasteServices, {
        nullable: true,
    })
    @JoinTable()
    pickupDays: PickupDay[];

    @ManyToMany(() => ServicePricing, (pricing) => pricing.wasteServices, {
        nullable: true,
        cascade: true,
    })
    @JoinTable()
    pricings: ServicePricing[];
}
