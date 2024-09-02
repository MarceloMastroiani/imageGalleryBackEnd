import { IsNotEmpty, IsInt, IsArray } from 'class-validator';

export class CreateCartDto {
  @IsArray()
  prodducts: string[];

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
