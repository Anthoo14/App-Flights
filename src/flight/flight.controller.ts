import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { PassengerService } from 'src/passenger/passenger.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('flights')
@Controller('api/v1/flight')
export class FlightController {
    constructor(private readonly flightService :FlightService,
         private readonly passengerService:PassengerService){}


    @Post()
    @ApiOperation({summary:'Create Flight'})
    create(@Body() flightDTO:FlightDTO ):Promise<IFlight>{
        return this.flightService.create(flightDTO);
    }
    @Get()
    @ApiOperation({summary:'Get Flights'})
    findAll(){
        return this.flightService.findAll();
    }
    @Get(":id")
    @ApiOperation({summary:'Get flight'})
    findById(@Param("id")id:string){
        return this.flightService.findById(id);
    }

    @Put(":id")
    @ApiOperation({summary:'Update Flight'})
    update(@Param("id")id:string,@Body()flightDTO:FlightDTO){
        return this.flightService.update(id,flightDTO);
    }

    @Delete(":id")
    @ApiOperation({summary:'Delete Flight'})
    delete(@Param("id")id:string){
        return this.flightService.delete(id);

    }


    @Post(':flightId/passenger/:passengerId')
    @ApiOperation({summary:'Add Passenger to the flight'})
   async addPassenger(
    @Param("flightId")flightId:string,
    @Param("passengerId")passengerId:string){
        const passenger= await this.passengerService.findById(passengerId);
        if(!passenger) 
        throw new HttpException(`Passenger with ID ${passengerId} not found`, HttpStatus.NOT_FOUND);

        return this.flightService.addPassenger(flightId,passengerId);
    }


}
