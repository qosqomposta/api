import { IsEnum } from 'class-validator';
import { PaymentsEnum } from '../payment-method.enum';

export class CreatePaymentMethodDto {
    @IsEnum(PaymentsEnum)
    name: string;
}
