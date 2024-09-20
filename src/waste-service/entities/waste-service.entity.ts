import { ClientType } from 'src/enums/clientType.enum';
import {
    Column,
    DeleteDateColumn,
    Entity,
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

    @Column({ nullable: true })
    isDeliverable: boolean;

    @Column({
        nullable: true,
        enum: ClientType,
    })
    clientType: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;

    @OneToMany(() => ServicePricing, (pricing) => pricing.wasteService, {
        nullable: true,
    })
    pricings: ServicePricing[];
}
