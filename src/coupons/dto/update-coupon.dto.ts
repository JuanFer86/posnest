import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './create-coupon.dto';
import { IsDateString, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}
