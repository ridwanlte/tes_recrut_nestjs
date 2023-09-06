import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promo } from './entities/promo.entity';
import { Repository, FindOptionsWhere } from 'typeorm';
import { CreatePromoDto } from './dto/create-promo.dto';

@Injectable()
export class PromoService {
    constructor(@InjectRepository(Promo) private readonly promoRepository: Repository<Promo>) { }

    async createPromo(createPromoDto: CreatePromoDto) {
        const { code_promo, remind_quota, is_available } = createPromoDto
        const reqData = {
            remind_quota: remind_quota,
            code_promo: code_promo
        }
        return await this.promoRepository.save(reqData)
    }
    async checkPromo(code_promo: String) {
        return this.promoRepository.findOneBy({ code_promo: code_promo } as FindOptionsWhere<Promo>)
    }

    async redeemPromo(code_promo: String) {
        const findCode = await this.promoRepository.findOneBy({ code_promo: code_promo } as FindOptionsWhere<Promo>)
        const id = findCode.id
        if(parseInt(`${findCode.remind_quota}`) == 0) {
            const req = {
                is_available: false
            }
            const reqData = await this.promoRepository.update({ id } as FindOptionsWhere<Promo>, req)
            throw new NotFoundException({
                message: 'Promo is not available',
                data: this.checkPromo(code_promo)
                
            })
        } else {
            let substract = parseInt(`${findCode.remind_quota}`)
            substract--;
            const req = {
                remind_quota: substract,
            }
            const reqData = await this.promoRepository.update({ id } as FindOptionsWhere<Promo>, req)
            return await this.checkPromo(code_promo)
        }
        
    }
}
