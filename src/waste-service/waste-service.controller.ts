import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { WasteServiceService } from './waste-service.service';
import { CreateWasteServiceDto } from './dto/create-waste-service.dto';
import { UpdateWasteServiceDto } from './dto/update-waste-service.dto';
import { FindAllWasteServicesDto } from './dto/find-all-filter.dto';

@Controller('waste-service')
export class WasteServiceController {
    constructor(private readonly wasteServiceService: WasteServiceService) {}

    @Post()
    create(@Body() createWasteServiceDto: CreateWasteServiceDto) {
        return this.wasteServiceService.create(createWasteServiceDto);
    }

    @Get()
    findAll(@Query() filters: FindAllWasteServicesDto) {
        return this.wasteServiceService.findAll(filters);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.wasteServiceService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateWasteServiceDto: UpdateWasteServiceDto,
    ) {
        return this.wasteServiceService.update(id, updateWasteServiceDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.wasteServiceService.remove(id);
    }

    @Patch(':id/undelete')
    restoreWasteService(@Param('id') id: string) {
        return this.wasteServiceService.restore(id);
    }
}
