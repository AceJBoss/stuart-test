import { HttpModule, HttpService, Module } from '@nestjs/common';
import { CouriersModule } from './couriers/couriers.module';

@Module({
  imports: [CouriersModule, HttpModule],
  providers: [],
})
export class AppModule { }
