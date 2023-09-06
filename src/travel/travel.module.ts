import { Module } from '@nestjs/common';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';
import { Travel } from './entities/travel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTravel } from './entities/orderTravel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Travel, OrderTravel])],
  controllers: [TravelController],
  providers: [TravelService]
})
export class TravelModule {}
