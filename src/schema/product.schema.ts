import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  //NOMBRE DEL PRODUCTO
  @Prop({
    required: true,
  })
  name: string;

  //PRECIO DEL PRODUCTO
  @Prop({
    required: true,
  })
  price: number;

  //DECRIPCION DEL PRODUCTO (OPCIONAL)
  @Prop({
    //Elinimos el espacio en blanco
    trim: true,
  })
  description?: string;

  //IMAGEN DEL PRODUCTO (OPCIONAL)
  @Prop()
  image?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
