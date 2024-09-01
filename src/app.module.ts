import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    //Se importa el modulo de configuracion para poder usar las variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //Se importa el modulo de mongoose para poder usar la base de datos con la variable de entorno
    MongooseModule.forRoot(process.env.MONGO_URL),
    ProductModule,
    CartModule,
    UserModule,
  ],
})
export class AppModule {}
