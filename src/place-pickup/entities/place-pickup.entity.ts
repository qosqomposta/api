import { PickupDay } from 'src/pickup-day/entities/pickup-day.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PlacePickup {
    @PrimaryGeneratedColumn()
    placePickup_id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    reference: string;

    @Column({ nullable: true })
    latitude: number;

    @Column({ nullable: true })
    longitude: number;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @ManyToMany(() => PickupDay, (pickupDay) => pickupDay.placePickups)
    pickupDays: PlacePickup[];
}
