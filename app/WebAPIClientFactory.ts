import JWTWebAPIConfig from "./JWTWebAPIConfig";
import { WebAPIConfig,WeatherForecastClient } from "./WebAPIClients";

class WebAPIClientFactory {
  // 对应Controller的Client
  public static getWeatherForecastClient(): WeatherForecastClient {
    return new WeatherForecastClient(this.getJWTWebAPIConfig());
  }

  // 获取Token
  private static getAccessToken(): string | null {
    return "";
  }

  // 获取API调用路径
  private static getWebAPIUrl(): string {
    return "http://localhost:5000";
  }

  // 配置信息
  private static getJWTWebAPIConfig(): WebAPIConfig {
    const url = this.getWebAPIUrl();
    const token = this.getAccessToken();
    const config = new JWTWebAPIConfig(url, token);
    return config;
  }
}

export default WebAPIClientFactory;
