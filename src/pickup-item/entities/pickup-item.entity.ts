import { WasteService } from 'src/waste-service/entities/waste-service.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PickupItem {
    @PrimaryGeneratedColumn()
    pickupItem_id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @ManyToMany(() => WasteService, (wasteService) => wasteService.pickupItems)
    wasteServices: WasteService[];
}
