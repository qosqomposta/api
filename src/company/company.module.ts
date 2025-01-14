import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { SubscriptionModule } from 'src/subscription/subscription.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Company]),
        forwardRef(() => SubscriptionModule),
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService],
})
export class CompanyModule {}
