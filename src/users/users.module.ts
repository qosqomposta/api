import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Family } from 'src/family/entities/family.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([Family, Company])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
