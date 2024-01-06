import { Hour, IForecastday  } from "./location.interface";
import { IPassenger } from "./passenger.interfaces";

export interface IFlight extends Document{
     _id?:string;
     pilot:string;
     airplane:string;
     destinationCity:string;
     flightDate: Date;
     passengers:IPassenger[];
     weahter: Hour[];
}