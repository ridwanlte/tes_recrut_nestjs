import { BadRequestException, Body, Controller, Get, NotFoundException, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { TravelService } from './travel.service';
import { CreateOrderTravelDto } from './dto/create-orderTravel.dto';

@Controller('travel')
export class TravelController {
    constructor(private readonly travelService: TravelService){}

    @Post()
    createTravel(@Body() createTravelDto: CreateTravelDto) {
        return this.travelService.createTravel(createTravelDto)
    }

    @Get()
    @UsePipes(ValidationPipe)
    checkSeat(@Body('code_travel') code_travel: String, @Body('id_bus') id_bus: String) {
        try{
        return this.travelService.checkSeat(code_travel, id_bus)
        } catch (err){
            throw new NotFoundException()
        }
    }

    @Post('/order')
    orderTravel(@Body() createOrderTravelDto: CreateOrderTravelDto, @Body('id_bus') id_bus: String, @Body('code_travel') code_travel: String) {
        return this.travelService.orderTravel(createOrderTravelDto, id_bus, code_travel)
    }
    
}
