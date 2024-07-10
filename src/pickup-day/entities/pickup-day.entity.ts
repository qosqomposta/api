import { DaysOfWeek } from 'src/enums/days.enum';
import {
    Column,
    DeleteDateColumn,
    Entity,
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
}
