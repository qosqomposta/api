import {
    Column,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentsEnum } from '../payment-method.enum';

@Entity()
export class PaymentMethod {
    @PrimaryGeneratedColumn()
    payment_method_id: number;

    @Column({
        enum: PaymentsEnum,
    })
    name: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true })
    deletedAt?: Date;
}
