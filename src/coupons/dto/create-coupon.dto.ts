import { IsDateString, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateCouponDto {
  @IsNotEmpty({ message: 'Coupon name is required' })
  name: string;

  @IsNotEmpty({ message: 'Coupon percentage is required' })
  @IsInt({ message: 'Coupon percentage must be an integer between 1 and 100' })
  @Max(100, { message: 'The max discount is 100' })
  @Min(1, { message: 'The min discount is 1' })
  percentage: number;

  @IsNotEmpty({ message: 'Coupon expiration date is required' })
  @IsDateString({}, { message: 'Coupon expiration date must be a valid date' })
  expirationDate: Date;
}
