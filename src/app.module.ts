import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromoModule } from './promo/promo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { TravelModule } from './travel/travel.module';

@Module({
  imports: [PromoModule, TypeOrmModule.forRoot(typeOrmConfig), TravelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
