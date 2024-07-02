import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

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
}
