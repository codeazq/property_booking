import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdentityModule } from './identity/identity.module';
import { PrismaModule } from './services/prisma/prisma.module';
import { ListingModule } from './listing/listing.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    PrismaModule,
    IdentityModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      isGlobal: true,
      cache: true,
    }),
    ListingModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
