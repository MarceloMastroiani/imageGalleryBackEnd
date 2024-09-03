import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Cart } from './cart.schema';

@Schema({
  timestamps: true,
})
export class User {
  //NOMBRE DEL USUARIO
  @Prop({
    required: true,
  })
  name: string;

  //APELLIDO DEL USUARIO
  @Prop({
    required: true,
  })
  lastname: string;

  //EMAIL DEL USUARIO
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  //CONTRASEÑA DEL USUARIO
  @Prop({
    required: true,
    //Cambiar a 8 caracteres
    minLength: 3,
  })
  password: string;

  //Trae cart como referencia
  //@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
  //cart: Cart;

  //IMAGEN DEL USUARIO (OPCIONAL)
  @Prop()
  image?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
