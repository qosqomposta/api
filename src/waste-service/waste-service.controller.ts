import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { WasteServiceService } from './waste-service.service';
import { CreateWasteServiceDto } from './dto/create-waste-service.dto';
import { UpdateWasteServiceDto } from './dto/update-waste-service.dto';

@Controller('waste-service')
export class WasteServiceController {
    constructor(private readonly wasteServiceService: WasteServiceService) {}

    @Post()
    async create(@Body() createWasteServiceDto: CreateWasteServiceDto) {
        const data = await this.wasteServiceService.create(
            createWasteServiceDto,
        );
        return data;
    }

    @Get()
    findAll() {
        return this.wasteServiceService.findAll();
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
