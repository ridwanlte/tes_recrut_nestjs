import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderTravelDto } from './create-orderTravel.dto';

export class UpdateOrderTravelDto extends PartialType(CreateOrderTravelDto) {}
