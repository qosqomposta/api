import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    create(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.create(createCustomerDto);
    }

    @Get('firebase/:firebaseUuid')
    findCustomerByFirebaseUuid(@Param('firebaseUuid') firebaseUuid: string) {
        return this.customerService.findCustomerByFirebaseUid(firebaseUuid);
    }

    @Get('summary/:firebaseUuid')
    getCustomerSummary(@Param('firebaseUuid') firebaseUuid: string) {
        return this.customerService.getCustomerSummary(firebaseUuid);
    }

    @Get()
    findAll() {
        return this.customerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.customerService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCustomerDto: UpdateCustomerDto,
    ) {
        return this.customerService.update(id, updateCustomerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customerService.remove(id);
    }

    @Patch(':id/restore')
    restore(@Param('id') id: string) {
        return this.customerService.restore(id);
    }
}
