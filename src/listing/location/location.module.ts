import { Module } from '@nestjs/common';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AreaModule } from './area/area.module';

@Module({
  controllers: [],
  providers: [],
  imports: [CountryModule, StateModule, CityModule, AreaModule],
})
export class LocationModule {}
