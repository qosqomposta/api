import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { FamilyModule } from 'src/family/family.module';
import { DeliveryOrderModule } from 'src/delivery-order/delivery-order.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Subscription]),
        FamilyModule,
        CompanyModule,
        DeliveryOrderModule,
    ],
    controllers: [SubscriptionController],
    providers: [SubscriptionService],
    exports: [SubscriptionService],
})
export class SubscriptionModule {}
