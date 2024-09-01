import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsString()
  @IsOptional()
  description?: string;
}
