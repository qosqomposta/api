import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { CompanySummaryDto } from './dto/get-summary.dto';
import { ProfileCompany } from './dto/get-profile.tdo';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
        @Inject(forwardRef(() => SubscriptionService))
        private subscriptionService: SubscriptionService,
    ) {}
    async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const newCompany = this.companyRepository.create({
            ...createCompanyDto,
            id: randomUUID(),
        });
        return await this.companyRepository.save(newCompany);
    }

    async findAll() {
        return await this.companyRepository.find();
    }

    async findOne(id: string) {
        const company = await this.companyRepository.findOneBy({
            id: id,
        });

        if (!company) {
            throw new NotFoundException(`Company with id ${id} not found`);
        }
        return company;
    }

    async findCompanyByFirebaseUid(
        firebaseUid: string,
    ): Promise<ProfileCompany> {
        const company = await this.companyRepository.findOne({
            where: {
                firebaseUid: firebaseUid,
            },
        });

        if (!company) {
            throw new NotFoundException(
                `Company with firebase uid ${firebaseUid} not found`,
            );
        }
        return {
            ...company,
        };
    }

    async update(id: string, updateCompanyDto: UpdateCompanyDto) {
        let company = await this.companyRepository.findOne({
            where: { id: id },
        });
        if (!company) {
            throw new NotFoundException(`Company with ID ${id} not found`);
        }

        company = { ...company, ...updateCompanyDto };
        return await this.companyRepository.save(company);
    }

    async remove(id: string) {
        const company = await this.companyRepository.findOne({
            where: { id: id },
        });
        if (!company) {
            throw new NotFoundException(`Company with ID ${id} not found`);
        }

        company.deletedAt = new Date();
        await this.companyRepository.save(company);

        return `company with ID ${id} has been successfully deleted`;
    }

    async restore(id: string): Promise<Company> {
        const company = await this.companyRepository.findOne({
            where: { id: id },
            withDeleted: true,
        });

        if (!company) {
            throw new NotFoundException(`Company with ID ${id} not found`);
        }

        if (!company.deletedAt) {
            throw new Error(`Company with ID ${id} is not deleted`);
        }

        company.deletedAt = null;
        return this.companyRepository.save(company);
    }

    async getCompanySummary(firebaseUid: string): Promise<CompanySummaryDto> {
        const company = await this.companyRepository.findOne({
            where: {
                firebaseUid: firebaseUid,
            },
            relations: ['subscription'],
        });

        if (!company) {
            throw new NotFoundException(
                `Company with firebaseUid ${firebaseUid} not found`,
            );
        }

        const subscription =
            await this.subscriptionService.findSubscriptionSummaryByCompanyId({
                company_id: company.id,
            });

        if (!subscription) {
            throw new NotFoundException(
                `No se encontró subscripción para la familia ${company.id}`,
            );
        }

        return {
            companySummary: {
                email: company.email,
                ownerName: company.owner_name,
                name: company.name,
                id: company.id,
                phoneNumber: company.phoneNumber,
                district: company.district,
            },
            subscriptionSummary: subscription,
        };
    }
}
