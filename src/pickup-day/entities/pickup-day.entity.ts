import { DaysOfWeek } from 'src/enums/days.enum';
import { PlacePickup } from 'src/place-pickup/entities/place-pickup.entity';
import { WasteService } from 'src/waste-service/entities/waste-service.entity';
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

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @ManyToMany(() => PlacePickup, (placePickup) => placePickup.pickupDays)
    @JoinTable()
    placePickups: PlacePickup[];

    @ManyToMany(() => WasteService, (wasteService) => wasteService.pickupItems)
    wasteServices: WasteService[];
}
