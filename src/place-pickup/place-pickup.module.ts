import { Module } from '@nestjs/common';
import { PlacePickupService } from './place-pickup.service';
import { PlacePickupController } from './place-pickup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacePickup } from './entities/place-pickup.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PlacePickup])],
    controllers: [PlacePickupController],
    providers: [PlacePickupService],
})
export class PlacePickupModule {}
