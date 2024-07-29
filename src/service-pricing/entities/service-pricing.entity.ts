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
export class ServicePricing {
    @PrimaryGeneratedColumn()
    service_pricing_id: number;

    @Column()
    price: number;

    @Column({ nullable: true })
    frequency: number;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @ManyToMany(() => WasteService, (pickupItem) => pickupItem.pricings, {
        nullable: true,
    })
    @JoinTable()
    wasteServices: WasteService[];
}
