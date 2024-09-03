import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from './product.schema';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Cart {
  // Trae productos como referencia
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    default: [],
  })
  products: Product[];

  // Cantidad de productos en el carrito
  @Prop({
    required: true,
    default: 0,
  })
  quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
