import { Test, TestingModule } from '@nestjs/testing';
import { ServicePricingController } from './service-pricing.controller';
import { ServicePricingService } from './service-pricing.service';

describe('ServicePricingController', () => {
    let controller: ServicePricingController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ServicePricingController],
            providers: [ServicePricingService],
        }).compile();

        controller = module.get<ServicePricingController>(
            ServicePricingController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
