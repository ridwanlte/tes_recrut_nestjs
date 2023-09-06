import { Body, Controller, Get, NotFoundException, Post, ValidationPipe } from '@nestjs/common';
import { CreatePromoDto } from './dto/create-promo.dto';
import { PromoService } from './promo.service';

@Controller('promo')
export class PromoController {
    constructor(private promoService: PromoService){}

    @Post()
    createPromo(@Body() createPromoDto: CreatePromoDto){
        return this.promoService.createPromo(createPromoDto)
    }

    @Get()
    checkPromo(@Body('code_promo') code_promo: String) {
        return this.promoService.checkPromo(code_promo)
    }

    @Post('/redeem')
    redeemPromo(@Body('code_promo') code_promo: String){
        try {
            return this.promoService.redeemPromo(code_promo)
        } catch (err){
            throw new NotFoundException()
        }
    }
}
