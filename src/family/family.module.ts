import { forwardRef, Module } from '@nestjs/common';
import { FamilyService } from './family.service';
import { FamilyController } from './family.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from './entities/family.entity';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Family]),
        forwardRef(() => CustomerModule),
    ],
    controllers: [FamilyController],
    providers: [FamilyService],
    exports: [FamilyService],
})
export class FamilyModule {}
