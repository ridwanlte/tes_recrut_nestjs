
import { Type } from "class-transformer";
import { IsDateString, IsInt } from "class-validator";
import { Travel } from "../entities/travel.entity";
// import { IsNotEmpty } from "class-validator";

export class CreateOrderTravelDto {
    // @IsNotEmpty()
    id_customer: String

    // @IsNotEmpty()
    is_booked: Boolean
    
    @IsDateString()
    @Type(() => Date)
    order_date: Date

    // @IsNotEmpty()
    @IsInt()
    id_seat: Number

    travel: Travel

}
