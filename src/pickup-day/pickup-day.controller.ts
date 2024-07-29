import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { PickupDayService } from './pickup-day.service';
import { CreatePickupDayDto } from './dto/create-pickup-day.dto';
import { UpdatePickupDayDto } from './dto/update-pickup-day.dto';
import { FindPickUpDayByIdDto } from './dto/find-pickup-day.dto';

@Controller('pickup-day')
export class PickupDayController {
    constructor(private readonly pickupDayService: PickupDayService) {}

    @Post()
    create(@Body() createPickupDayDto: CreatePickupDayDto) {
        return this.pickupDayService.create(createPickupDayDto);
    }

    @Get()
    findAll() {
        return this.pickupDayService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pickupDayService.findOne(+id);
    }

    @Post('find')
    async findAllByIds(@Body() ids: FindPickUpDayByIdDto) {
        const days = await this.pickupDayService.findAllByIds(ids);
        if (days.notFoundedDaysMessage) {
            throw new HttpException(
                {
                    status: 207,
                    message: days.notFoundedDaysMessage,
                    data: days,
                },
                207,
            );
        }

        return days;
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePickupDayDto: UpdatePickupDayDto,
    ) {
        return this.pickupDayService.update(+id, updatePickupDayDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.pickupDayService.remove(+id);
    }

    @Patch(':id/undelete')
    restore(@Param('id') id: string) {
        return this.pickupDayService.restore(+id);
    }
}
