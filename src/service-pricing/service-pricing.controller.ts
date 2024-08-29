import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ServicePricingService } from './service-pricing.service';
import { CreateServicePricingDto } from './dto/create-service-pricing.dto';
import { UpdateServicePricingDto } from './dto/update-service-pricing.dto';

@Controller('service-pricing')
export class ServicePricingController {
    constructor(
        private readonly servicePricingService: ServicePricingService,
    ) {}

    @Post()
    create(@Body() createServicePricingDto: CreateServicePricingDto) {
        return this.servicePricingService.create(createServicePricingDto);
    }

    @Get()
    findAll() {
        return this.servicePricingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.servicePricingService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateServicePricingDto: UpdateServicePricingDto,
    ) {
        return this.servicePricingService.update(id, updateServicePricingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.servicePricingService.remove(id);
    }

    @Patch(':id/undelete')
    restoreWasteService(@Param('id') id: string) {
        return this.servicePricingService.restore(id);
    }
}
