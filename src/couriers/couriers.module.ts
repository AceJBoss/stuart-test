import { HttpModule, Module } from '@nestjs/common';
import { CourierRepository } from './repository/courier.repository';
import { CouriersController } from './couriers.controller';
import { CouriersService } from './service/couriers.service';


@Module({
  imports: [HttpModule],
  controllers: [CouriersController],
  providers: [CouriersService, CourierRepository]
})
export class CouriersModule { }
