import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;
}
