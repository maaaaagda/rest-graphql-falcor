import { inject, injectable } from "inversify";
import { IUtilsController } from "./IUtilsController";
import { UTILS_TYPES } from "../../ioc/UtilsTypes";
import { IUtilsService } from "../../service/IUtilsService";

@injectable()
export class UtilsController implements IUtilsController {

  @inject(UTILS_TYPES.IUtilsService)
  private readonly _utilsService: IUtilsService;

  public async clearDatabase(): Promise<void> {

    await this._utilsService.clearDatabase();
  }
}
