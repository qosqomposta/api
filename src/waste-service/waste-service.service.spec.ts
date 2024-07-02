import { Test, TestingModule } from '@nestjs/testing';
import { WasteServiceService } from './waste-service.service';

describe('WasteServiceService', () => {
    let service: WasteServiceService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WasteServiceService],
        }).compile();

        service = module.get<WasteServiceService>(WasteServiceService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
