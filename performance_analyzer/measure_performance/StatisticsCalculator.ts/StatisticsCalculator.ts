import { IStatistics } from "../../types/IStatistics";
import { Response } from "got";
export class StatisticsCalculator {

    private _nrOfRepetition: number = 0;
    private _size: number = 0;
    private _wait: number = 0;
    private _firstByte: number = 0;
    private _download: number = 0;
    private _total: number = 0;
    private _data: any = null;

    public recalculateStatistics(res: Response<string>, withResponseData = false) {
        this._nrOfRepetition += 1;
        this._wait = (this._wait + res.timings.phases.wait);
        this._firstByte = (this._firstByte + res.timings.phases.firstByte);
        this._download = (this._download + res.timings.phases.download);
        this._total = (this._total + res.timings.phases.total);
        this._size = (this._size + res.body.length);
        this._data = withResponseData ? JSON.parse(res.body) : null;
    }

    public getData(): any {
        return this._data;
    }

    public getAverageStatistics(): IStatistics {
        return {
            size: this._size  / this._nrOfRepetition,
            wait: this._wait / this._nrOfRepetition,
            firstByte: this._firstByte / this._nrOfRepetition,
            download: this._download / this._nrOfRepetition,
            total: this._total
        };
    }

}
