import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) {}
    async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
        const newCompany = this.companyRepository.create({
            ...createCompanyDto,
            company_id: randomUUID(),
        });
        return await this.companyRepository.save(newCompany);
    }

    async findAll() {
        return await this.companyRepository.find();
    }

    async findOne(id: string) {
        return await this.companyRepository.findBy({ company_id: id });
    }

    async update(id: string, updateCompanyDto: UpdateCompanyDto) {
        let company = await this.companyRepository.findOne({
            where: { company_id: id },
        });
        if (!company) {
            throw new NotFoundException(`Company with ID ${id} not found`);
        }

        company = { ...company, ...updateCompanyDto };
        return await this.companyRepository.save(company);
    }

    async remove(id: string) {
        const company = await this.companyRepository.findOne({
            where: { company_id: id },
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
            where: { company_id: id },
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
}
