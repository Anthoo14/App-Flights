import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { FlightDTO } from './dto/flight.dto';
import axios from 'axios';
import * as moment from 'moment';
import { Hour, IForecastday } from 'src/common/interfaces/location.interface';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class FlightService {
    constructor(@InjectModel(FLIGHT.name)private readonly model:Model<IFlight>, private readonly configService: ConfigService,){}
    /*async getLocation(destinationCity:string):Promise<ILocation>{
        const {data} = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&query=${destinationCity}`);
        return data[0];
    }*/
    async getWeather(destinationCity, flightDate: Date): Promise<Hour[]> {
        const dateFormat = moment.utc(flightDate).format();
        const apiKey = this.configService.get<string>('WEATHER_API_KEY');
        const year = dateFormat.substring(0, 4);
        const month = dateFormat.substring(5, 7);
        const day = dateFormat.substring(8, 10);

        const { data } = await axios.get(`http://api.weatherapi.com/v1/future.json?key=${apiKey}&query=${destinationCity}&dt=${year}-${month}-${day}`)
        
        if (data && data.forecast && data.forecast.forecastday && data.forecast.forecastday.length > 0) {
            // Extraer el arreglo 'hour' de la primera entrada en 'forecastday'
            const firstForecastDay = data.forecast.forecastday[0];
            return firstForecastDay.hour;
        } else {
            // Devolver un arreglo vacío o manejar el caso de error según sea necesario
            return [];
        }
    }

    assing({_id,pilot,airplane,destinationCity,flightDate,passengers,}:IFlight,weahter: Hour[]):IFlight{
            return Object.assign({_id,pilot,airplane,destinationCity,flightDate,passengers,weahter})
    }

    async create(flightDTO:FlightDTO):Promise<IFlight>{
        const newFlight = new this.model(flightDTO)
        return await newFlight.save();
    }
    async findAll():Promise<IFlight[]>{
        return await this.model.find().populate("passengers");
    }

    async findById(id:string):Promise<IFlight>{
        const flight=await this.model.findById(id).populate("passengers");
        const weather:Hour[] = await this.getWeather(flight.destinationCity,flight.flightDate);
        return this.assing(flight,weather);
    }
    async update(id:string, flightDTO:FlightDTO):Promise<IFlight>{
          return await this.model.findByIdAndUpdate(id,flightDTO,{new:true})

    }
    async delete(id:string){
        await this.model.findByIdAndDelete(id);
        return {status:HttpStatus.OK,msg:"deleted"}
    }

    async addPassenger(flightId:string, passengerId:string):Promise<IFlight>{
        return await this.model.findByIdAndUpdate(flightId,{$addToSet:{passengers: passengerId},},{new:true}).populate("passengers");
    }

    
}
