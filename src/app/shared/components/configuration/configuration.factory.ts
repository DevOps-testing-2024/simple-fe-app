import { ConfigService } from "./services/configuration.service";

export function initializeConfiguration(configService: ConfigService) {
    return (): Promise<any> => {
      return configService.loadConfig().toPromise().then((config: any) => {
        configService.setConfig(config);
      });
    }
  }