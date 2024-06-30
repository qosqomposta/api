import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { PickupItemService } from './pickup-item.service';
import { CreatePickupItemDto } from './dto/create-pickup-item.dto';
import { UpdatePickupItemDto } from './dto/update-pickup-item.dto';
import { PickupItem } from './entities/pickup-item.entity';

@Controller('pickup-item')
export class PickupItemController {
    constructor(private readonly pickupItemService: PickupItemService) {}

    @Post()
    create(@Body() createPickupItemDto: CreatePickupItemDto) {
        return this.pickupItemService.create(createPickupItemDto);
    }

    @Get()
    findAll() {
        return this.pickupItemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pickupItemService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePickupItemDto: UpdatePickupItemDto,
    ) {
        return this.pickupItemService.update(+id, updatePickupItemDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pickupItemService.remove(+id);
    }

    @Patch(':id/undelete')
    restorePickupItem(@Param('id') id: string): Promise<PickupItem> {
        return this.pickupItemService.restore(+id);
    }
}
