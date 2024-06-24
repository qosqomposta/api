import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entities/district.entity';

@Controller('district')
export class DistrictController {
    constructor(private readonly districtService: DistrictService) {}

    @Post()
    create(@Body() createDistrictDto: CreateDistrictDto): Promise<District> {
        return this.districtService.create(createDistrictDto);
    }

    @Get()
    findAll(): Promise<District[]> {
        return this.districtService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.districtService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateDistrictDto: UpdateDistrictDto,
    ) {
        return this.districtService.update(+id, updateDistrictDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.districtService.remove(+id);
    }

    @Patch(':id/undelete')
    async undeleteDistrict(@Param('id') id: string): Promise<District> {
        return this.districtService.undelete(+id);
    }
}
