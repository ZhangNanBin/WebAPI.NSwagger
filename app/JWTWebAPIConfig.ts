import { AxiosRequestConfig } from "axios";
import { WebAPIConfig } from "./WebAPIClients";

export default class JWTWebAPIConfig extends WebAPIConfig {
  constructor(apiUrl: string, private accessToken: string | null) {
    super(apiUrl);
    this.defaultTimeout = 5 * 1000; // 默认超时时间
    this.apiTimeoutConfig = [ // 针对API设置超时时间
      {
        api: "",
        timeout: 5 * 1000,
      },
    ];
  }

  public transformHttpRequestOptions(
    options: AxiosRequestConfig
  ): Promise<AxiosRequestConfig> {
    // 设置JWt
    if (
      options.headers &&
      this.accessToken &&
      !options.headers.hasOwnProperty("Authorization")
    ) {
      options.headers = {
        ...options.headers,
        Authorization: "Bearer " + this.accessToken,
      };

      options.withCredentials = true; // 
    }

    return super.transformHttpRequestOptions(options);
  }
}
