import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { typeOrmConfig } from './ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DistrictModule } from './district/district.module';
import configuration from './config/configuration';
import { PickupItemModule } from './pickup-item/pickup-item.module';
import { WasteServiceModule } from './waste-service/waste-service.module';
import { ServicePricingModule } from './service-pricing/service-pricing.module';
import { PlacePickupModule } from './place-pickup/place-pickup.module';
import { PickupDayModule } from './pickup-day/pickup-day.module';
import { CompanyModule } from './company/company.module';
import { CourierModule } from './courier/courier.module';
import { FamilyModule } from './family/family.module';
import { NeighborhoodModule } from './neighborhood/neighborhood.module';
import { PaymentMethodModule } from './payment-method/payment-method.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { DeliveryOrderModule } from './delivery-order/delivery-order.module';
import { SummaryClientService } from './summary-client/summary-client.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: typeOrmConfig,
            inject: [ConfigService],
        }),
        CustomerModule,
        DistrictModule,
        PickupItemModule,
        WasteServiceModule,
        ServicePricingModule,
        PlacePickupModule,
        PickupDayModule,
        CompanyModule,
        CourierModule,
        FamilyModule,
        NeighborhoodModule,
        PaymentMethodModule,
        SubscriptionModule,
        DeliveryOrderModule,
    ],
    controllers: [AppController],
    providers: [AppService, SummaryClientService],
})
export class AppModule {}
