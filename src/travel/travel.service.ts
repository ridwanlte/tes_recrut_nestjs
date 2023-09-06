import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Travel } from './entities/travel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateTravelDto } from './dto/create-travel.dto';
import { OrderTravel } from './entities/orderTravel.entity';
import { CreateOrderTravelDto } from './dto/create-orderTravel.dto';
import * as moment from 'moment';

@Injectable()
export class TravelService {
    constructor(@InjectRepository(Travel) private travelRepository: Repository<Travel>, @InjectRepository(OrderTravel) private orderRepository: Repository<OrderTravel>) { }

    async createTravel(createTravelDto: CreateTravelDto) {
        const { code_travel, amount_seat, id_bus } = createTravelDto
        let arraySeat = []
        for (let i = 1; i <= parseInt(`${amount_seat}`); i++) {
            arraySeat.push(i)
        }
        const req = {
            id_bus: id_bus,
            code_travel: code_travel,
            amount_seat: amount_seat,
            available_seat: arraySeat
        }
        return await this.travelRepository.save(req)
    }

    async checkSeat(code_travel: String, id_bus: String) {
        const seat = await this.travelRepository.findOneBy({ code_travel: code_travel, id_bus: id_bus } as FindOptionsWhere<Travel>)
        console.log('seat', seat)
        if (!seat) {
            throw new BadRequestException()
        }
        return seat

    }
    async checkOrder(id: Number) {
        const order = await this.orderRepository.findOneBy({ id} as FindOptionsWhere<OrderTravel>)
        return order
    }

    async orderTravel(createOrderTravelDto: CreateOrderTravelDto, id_bus: String, code_travel: String) {
        const { id_seat } = createOrderTravelDto
        function random(length) {
            var result = '';
            var characters = '0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        const checkBus = await this.travelRepository.findOneBy({ code_travel: code_travel, id_bus: id_bus } as FindOptionsWhere<Travel>)
        let seatString = checkBus.available_seat.toString()
        let arrSeatString = seatString.split(',')
        if (!checkBus) {
            throw new BadRequestException()
        }
        if (arrSeatString.includes(`${id_seat}`) == true) {
            const req = {
                id_customer: 'PSG' + random(8),
                id_seat: id_seat,
                order_date: `${moment().toISOString()}`,
                travel: checkBus,
            }
            const result = await this.orderRepository.save(req)
            const checkAfterBus = await this.travelRepository.findOneBy({ code_travel: code_travel, id_bus: id_bus } as FindOptionsWhere<Travel>)
            let id = checkAfterBus.id
            let dataSeat = result.travel.available_seat
            let filterSeat = dataSeat.filter((seat) => {
                return seat != `${result.id_seat}`
            })

            const reqUpdate = {
                available_seat: filterSeat
            }
            const updateSeat = await this.travelRepository.update({ id } as FindOptionsWhere<Travel>, reqUpdate)
            return this.checkOrder(result.id)
        } else {
            throw new NotFoundException({
                message: 'Id seat not available'
            })
        }



    }
}
