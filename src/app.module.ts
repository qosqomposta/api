import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { typeOrmConfig } from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import { DistrictModule } from './district/district.module';
import configuration from './config/configuration';
import { PickupItemModule } from './pickup-item/pickup-item.module';
import { WasteServiceModule } from './waste-service/waste-service.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
            load: [configuration],
        }),
        TypeOrmModule.forRoot(typeOrmConfig),
        // TypeOrmModule.forFeature([District]),
        CustomerModule,
        DistrictModule,
        PickupItemModule,
        WasteServiceModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
