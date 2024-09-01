import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Cart {
  // AGREGAR LA REFERENCIA DEL USER
  @Prop()
  products: string[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
