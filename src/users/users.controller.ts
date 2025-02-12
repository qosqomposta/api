import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('summary')
    getUsersSummary(
        @Query('includeNonActive') includeNonActive: boolean,
        @Query('includeDeleted') includeDeleted: boolean,
    ) {
        return this.usersService.getUsersSummary(
            includeNonActive,
            includeDeleted,
        );
    }
}
