import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Neighborhood {
    @PrimaryColumn({ unique: true })
    neighborhood_id: string;

    @Column()
    name: string;

    @Column()
    isActive: boolean;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;
}
