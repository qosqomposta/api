import { Module } from '@nestjs/common';
import { NeighborhoodService } from './neighborhood.service';
import { NeighborhoodController } from './neighborhood.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Neighborhood } from './entities/neighborhood.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Neighborhood])],
    controllers: [NeighborhoodController],
    providers: [NeighborhoodService],
})
export class NeighborhoodModule {}
