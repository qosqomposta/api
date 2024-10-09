import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Neighborhood {
    @PrimaryColumn({ unique: true })
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    isActive: boolean;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;
}
