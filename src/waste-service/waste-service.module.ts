import { Module } from '@nestjs/common';
import { WasteServiceService } from './waste-service.service';
import { WasteServiceController } from './waste-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WasteService } from './entities/waste-service.entity';

@Module({
    imports: [TypeOrmModule.forFeature([WasteService])],
    controllers: [WasteServiceController],
    providers: [WasteServiceService],
})
export class WasteServiceModule {}
