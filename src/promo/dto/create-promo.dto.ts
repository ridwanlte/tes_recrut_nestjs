import { IsNotEmpty, Min, MinLength } from "class-validator";

export class CreatePromoDto {
    @IsNotEmpty()
    @MinLength(6, {message: 'Char Code promo too short!'})
    code_promo: String

    @IsNotEmpty()
    @Min(1)
    remind_quota: Number

    // @IsNotEmpty()
    is_available: Boolean
}
