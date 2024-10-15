import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { FindSubscriptionByFamilyIdDto } from './dto/find-by-family-.dto';

@Controller('subscription')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) {}

    @Post()
    create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
        return this.subscriptionService.create(createSubscriptionDto);
    }

    @Get()
    findAll() {
        return this.subscriptionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subscriptionService.findOne(id);
    }

    @Post('/family')
    findOneByFamilyId(@Body() findByFamilyDto: FindSubscriptionByFamilyIdDto) {
        return this.subscriptionService.findByFamilyId(findByFamilyDto);
    }

    @Post('/family/summary')
    findSummaryByFamilyId(
        @Body() findByFamilyDto: FindSubscriptionByFamilyIdDto,
    ) {
        return this.subscriptionService.findSummaryByFamilyId(findByFamilyDto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateSubscriptionDto: UpdateSubscriptionDto,
    ) {
        return this.subscriptionService.update(id, updateSubscriptionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.subscriptionService.remove(id);
    }

    @Patch(':id/restore')
    restore(@Param('id') id: string) {
        return this.subscriptionService.restore(id);
    }
}
