import { Module } from '@nestjs/common';
import { PropertyModule } from './property/property.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [PropertyModule, AccommodationModule, LocationModule],
})
export class ListingModule {}
