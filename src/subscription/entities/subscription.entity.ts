import { Column, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Subscription {
    @PrimaryColumn({ unique: true })
    subscription_id: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;
}
