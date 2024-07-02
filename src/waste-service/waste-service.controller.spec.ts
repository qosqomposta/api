import { Test, TestingModule } from '@nestjs/testing';
import { WasteServiceController } from './waste-service.controller';
import { WasteServiceService } from './waste-service.service';

describe('WasteServiceController', () => {
    let controller: WasteServiceController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WasteServiceController],
            providers: [WasteServiceService],
        }).compile();

        controller = module.get<WasteServiceController>(WasteServiceController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
