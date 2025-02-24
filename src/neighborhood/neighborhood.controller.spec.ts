import { Test, TestingModule } from '@nestjs/testing';
import { NeighborhoodController } from './neighborhood.controller';
import { NeighborhoodService } from './neighborhood.service';

describe('NeighborhoodController', () => {
    let controller: NeighborhoodController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NeighborhoodController],
            providers: [NeighborhoodService],
        }).compile();

        controller = module.get<NeighborhoodController>(NeighborhoodController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
