import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNotEmpty({ message: 'The product names is required' })
  @IsString({ message: 'The product name must be a string' })
  name: string;
}
