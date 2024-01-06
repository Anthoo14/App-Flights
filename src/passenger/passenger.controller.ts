import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('passengers')
@Controller('api/v1/passenger')
export class PassengerController {
    constructor(private readonly passengerService:PassengerService){
    }
    @Post()
    @ApiOperation({summary:'Create Passenger'})
    create(@Body() passengerDTO:PassengerDTO){
            return this.passengerService.create(passengerDTO);
    }
    @Get()
    @ApiOperation({summary:'Get Passengers'})
    findAll(){
        return this.passengerService.findAll();
    }
    @Get(":id")
    @ApiOperation({summary:'Get Passenger'})
    findById(@Param("id") id:string){
        return this.passengerService.findById(id);
    }
    @Put(":id")
    @ApiOperation({summary:'Update Passenger'})
    update(@Param("id")id:string,@Body()passengerDTO:PassengerDTO){
        return this.passengerService.update(id,passengerDTO);
    }
    @Delete(":id")
    @ApiOperation({summary:'Delete Passenger'})
   delete(@Param("id")id:string){
    return this.passengerService.delete(id);
   }
}
 