/*export interface ILocation {
    location: LocationClass;
    forecast: Forecast;
}*/

export interface Forecast {
    forecastday: IForecastday[];
}

export interface IForecastday {
   // date:       Date;
    //date_epoch: number;
    //day:        Day;
    //astro:      Astro;
    hour:       Hour[];
}

export interface Astro {
    sunrise:           string;
    sunset:            string;
    moonrise:          string;
    moonset:           string;
    moon_phase:        string;
    moon_illumination: number;
}

export interface Day {
    maxtemp_c:      number;
    maxtemp_f:      number;
    mintemp_c:      number;
    mintemp_f:      number;
    avgtemp_c:      number;
    avgtemp_f:      number;
    maxwind_mph:    number;
    maxwind_kph:    number;
    totalprecip_mm: number;
    totalprecip_in: number;
    avgvis_km:      number;
    avgvis_miles:   number;
    avghumidity:    number;
    condition:      Condition;
    uv:             number;
}

export interface Condition {
    text: string;
    icon: string;
    code: number;
}

export interface Hour {
    time_epoch:     number;
    time:           string;
    temp_c:         number;
    temp_f:         number;
    is_day:         number;
    condition:      Condition;
    wind_mph:       number;
    wind_kph:       number;
    wind_degree:    number;
    wind_dir:       WindDir;
    pressure_mb:    number;
    pressure_in:    number;
    precip_mm:      number;
    precip_in:      number;
    humidity:       number;
    cloud:          number;
    feelslike_c:    number;
    feelslike_f:    number;
    windchill_c:    number;
    windchill_f:    number;
    heatindex_c:    number;
    heatindex_f:    number;
    dewpoint_c:     number;
    dewpoint_f:     number;
    will_it_rain:   number;
    chance_of_rain: number;
    will_it_snow:   number;
    chance_of_snow: number;
    vis_km:         number;
    vis_miles:      number;
    gust_mph:       number;
    gust_kph:       number;
    uv:             number;
}

export enum WindDir {
    S = "S",
    SSE = "SSE",
    Ssw = "SSW",
    Sw = "SW",
}

export interface LocationClass {
    name:            string;
    region:          string;
    country:         string;
    lat:             number;
    lon:             number;
    tz_id:           string;
    localtime_epoch: number;
    localtime:       string;
}
