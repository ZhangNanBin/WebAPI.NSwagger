import WebAPIClientFactory from "./WebAPIClientFactory";
import { WeatherForecast } from "./WebAPIClients";

async function Demo() {
  let client = WebAPIClientFactory.getWeatherForecastClient();
  var data: WeatherForecast[] = await client.get();
  console.log(data);
}

Demo();