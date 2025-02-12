import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { Family } from 'src/family/entities/family.entity';
import { Repository } from 'typeorm';
import { UsersSummary } from './dto/users.dto';
import { ClientStatus } from 'src/enums/clientType.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Family)
        private readonly familyRepository: Repository<Family>,

        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) {}

    async getUsersSummary(
        includeNonActive: boolean,
        includeDeleted?: boolean,
    ): Promise<UsersSummary> {
        const familyQueryBuilder = this.familyRepository
            .createQueryBuilder('family')
            .where('family.isActive = :isActive', { isActive: true })
            .andWhere('family.deletedAt IS NULL');

        const companyQueryBuilder = this.companyRepository
            .createQueryBuilder('company')
            .where('company.isActive = :isActive', { isActive: true })
            .andWhere('company.deletedAt IS NULL');

        if (includeNonActive) {
            familyQueryBuilder.where('family.isActive IN (:...status)', {
                status: [true, false],
            });
            companyQueryBuilder.where('company.isActive IN (:...status)', {
                status: [true, false],
            });
        }

        if (includeDeleted) {
            familyQueryBuilder.andWhere(
                'family.deletedAt IS NOT NULL OR family.deletedAt IS NULL',
            );
            companyQueryBuilder.andWhere(
                'company.deletedAt IS NOT NULL OR company.deletedAt IS NULL',
            );
        }

        const [families, companies] = await Promise.all([
            familyQueryBuilder.getCount(),
            companyQueryBuilder.getCount(),
        ]);

        return {
            totalUsers: families + companies,
            totalFamilies: families,
            totalCompanies: companies,
        };
    }
}
