export class WebAPIConfig {
  protected defaultTimeout: number = 10 * 1000;
  protected apiTimeoutConfig: IAPITimeoutConfig[] = [];
  constructor(private apiUrl: string) {}

  getBaseUrl(defaultUrl: string, requestedUrl?: string) {
    return requestedUrl ? requestedUrl : this.apiUrl;
  }

  // 根据API名称获取对应API设置的超时时间
  getTimeout(apiName: string): number {
    const timeoutConfig = this.apiTimeoutConfig.find(a => a.api === apiName);
    return timeoutConfig ? timeoutConfig.timeout : this.defaultTimeout;
  }

  transformHttpRequestOptions(
    options: AxiosRequestConfig,
    apiName:string
  ): Promise<AxiosRequestConfig> {
    options.timeout = this.getTimeout(apiName);
    return Promise.resolve(options);
  }
}

export class ClientBase {
  constructor(private webApiConfig: WebAPIConfig) {}

  getBaseUrl(defaultUrl: string, requestedUrl?: string) {
    return this.webApiConfig
      ? this.webApiConfig.getBaseUrl(defaultUrl, requestedUrl)
      : defaultUrl;
  }

  transformOptions(
    options: AxiosRequestConfig,
    apiName: string
  ): Promise<AxiosRequestConfig> {
    return this.webApiConfig
      ? this.webApiConfig.transformHttpRequestOptions(options, apiName)
      : Promise.resolve(options);
  }
}

export declare interface IAPITimeoutConfig {
  api: string;
  timeout: number;
}
