import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    //Se importa el modulo de configuracion para poder usar las variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //Se importa el modulo de mongoose para poder usar la base de datos con la variable de entorno
    MongooseModule.forRoot(process.env.MONGO_URL),
    UserModule,
    CloudinaryModule,
  ],
})
export class AppModule {}
