
import { IsJSON, IsNotEmpty } from "class-validator";

export class CreateTravelDto {
    @IsNotEmpty()
    id_bus: String

    @IsNotEmpty()
    code_travel: String

    @IsNotEmpty()
    amount_seat: Number
    
    available_seat: String[]
}
