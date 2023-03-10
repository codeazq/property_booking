import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Solves: TypeError: Do not know how to serialize a BigInt
//     at JSON.stringify (<anonymous>)
(BigInt.prototype as any).toJSON = function (): number {
  return Number(this);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
