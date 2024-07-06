import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PlacePickupService } from './place-pickup.service';
import { CreatePlacePickupDto } from './dto/create-place-pickup.dto';
import { UpdatePlacePickupDto } from './dto/update-place-pickup.dto';

@Controller('place-pickup')
export class PlacePickupController {
    constructor(private readonly placePickupService: PlacePickupService) {}

    @Post()
    create(@Body() createPlacePickupDto: CreatePlacePickupDto) {
        return this.placePickupService.create(createPlacePickupDto);
    }

    @Get()
    findAll() {
        return this.placePickupService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.placePickupService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePlacePickupDto: UpdatePlacePickupDto,
    ) {
        return this.placePickupService.update(+id, updatePlacePickupDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.placePickupService.remove(+id);
    }
}
