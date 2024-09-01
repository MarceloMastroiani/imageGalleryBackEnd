import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  lastname: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string;

  // AGREGAR LA REFERENCIA DEL CART
  @Prop()
  cart: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
