import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: "The category name couldn't be empty" })
  @IsString()
  name: string;
}
