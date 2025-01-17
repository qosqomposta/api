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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.create(createCompanyDto);
    }

    @Get('summary/:firebaseUuid')
    getCustomerSummary(@Param('firebaseUuid') firebaseUuid: string) {
        return this.companyService.getCompanySummary(firebaseUuid);
    }

    @Get('by-firebase-uuid')
    findCustomerByFirebaseUuid(@Query('firebaseUid') firebaseUuid: string) {
        return this.companyService.findCompanyByFirebaseUid(firebaseUuid);
    }

    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.companyService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCompanyDto: UpdateCompanyDto,
    ) {
        return this.companyService.update(id, updateCompanyDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.companyService.remove(id);
    }
}
