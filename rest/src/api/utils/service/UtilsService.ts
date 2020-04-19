import { IUtilsService } from "./IUtilsService";
import { TYPES } from "./../../../../../falcor/src/ioc/types";
import { IUtilsRepository } from "./../../../core/repository/IUtilsRepository";
import { Container, inject } from "inversify";
import { injectable } from "inversify";
import getContainer from "../ioc/inversify.config";
import { UTILS_TYPES } from "../ioc/UtilsTypes";

@injectable()
export class UtilsService implements IUtilsService {

  private readonly _container: Container = getContainer();

  @inject(UTILS_TYPES.IUtilsRepository)
  private readonly _utilsRepository: IUtilsRepository = this._container.get(
    UTILS_TYPES.IUtilsRepository
  );

  public async clearDatabase(): Promise<void> {
    await this._utilsRepository.clearDatabase();
  }
}
