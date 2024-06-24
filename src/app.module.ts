import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { typeOrmConfig } from './ormconfig';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
            load: [configuration],
        }),
        TypeOrmModule.forRoot(typeOrmConfig),
        CustomerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
