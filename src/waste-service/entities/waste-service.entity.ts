import { PickupDay } from 'src/pickup-day/entities/pickup-day.entity';
import { PickupItem } from 'src/pickup-item/entities/pickup-item.entity';
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
}
