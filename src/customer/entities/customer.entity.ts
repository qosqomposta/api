import { Family } from 'src/family/entities/family.entity';
import {
    Column,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';

@Entity()
export class Customer {
    @PrimaryColumn({ unique: true })
    customer_id: string;

    @Column({ unique: true, nullable: true })
    firebaseUid: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    document_identity: number;

    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    mother_last_name: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column({ nullable: true })
    customId: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deletedAt?: Date;

    @ManyToOne(() => Family, (family) => family.customers)
    @JoinColumn({ name: 'family_id' })
    family: Family;
}
