import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class District {
    @PrimaryGeneratedColumn()
    district_id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    postalCode: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;
}
