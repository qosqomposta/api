import { DaysOfWeek } from 'src/enums/days.enum';
import { PlacePickup } from 'src/place-pickup/entities/place-pickup.entity';
import { ServicePricing } from 'src/service-pricing/entities/service-pricing.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PickupDay {
    @PrimaryGeneratedColumn()
    pickupDay_id: number;

    @Column({
        enum: DaysOfWeek,
    })
    dayOfWeek: string;

    @Column()
    isAllDay: boolean;

    @Column({ nullable: true })
    startTime: number;

    @Column({ nullable: true })
    endTime: number;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;

    @ManyToMany(() => PlacePickup, (placePickup) => placePickup.pickupDays)
    @JoinTable({ name: 'pickupDays_placePickup' })
    placePickups: PlacePickup[];

    @ManyToMany(
        () => ServicePricing,
        (servicePricing) => servicePricing.pickupItems,
    )
    pricings: ServicePricing[];
}
