import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'The product names is required' })
  @IsString({ message: 'The product name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'The product price is required' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price invalid' })
  price: number;

  @IsNotEmpty({ message: 'The product inventory is required' })
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Inventory invalid' })
  inventory: number;

  @IsNotEmpty({ message: 'The category is required' })
  @IsInt({ message: 'Category invalid' })
  categoryId: number;
}
