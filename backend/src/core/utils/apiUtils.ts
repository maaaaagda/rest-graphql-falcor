import { Container } from "inversify";
import { IConfig } from "../../config/IConfig";
import getContainer from "../../ioc/inversify.config";
import { TYPES } from "../../ioc/types";

export function createPath( index: string ): string {
  const container: Container = getContainer();
  const config: IConfig = container.get<IConfig>(TYPES.IConfig);

  return `${config.API_PREFIX}/${index}`;
}
