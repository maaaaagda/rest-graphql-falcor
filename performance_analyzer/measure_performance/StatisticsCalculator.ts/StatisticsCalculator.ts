import { IStatistics } from "../../types/IStatistics";
import { Response } from "got";
export class StatisticsCalculator {

    private _nrOfRepetition: number = 0;
    private readonly _size: number[] = [];
    private readonly _wait: number[] = [];
    private readonly _firstByte: number[] = [];
    private readonly _download: number[] = [];
    private readonly _total: number[] = [];
    private _data: any = null;

    public recalculateStatistics(res: Response<string>, withResponseData = false) {
        this._nrOfRepetition += 1;
        this._wait.push(res.timings.phases.wait);
        this._firstByte.push(res.timings.phases.firstByte);
        this._download.push(res.timings.phases.download);
        this._total.push(res.timings.phases.total);
        this._size.push(res.body.length);
        this._data = withResponseData ? JSON.parse(res.body) : null;
    }

    public getData(): any {
        return this._data;
    }

    public getAverageStatistics(): IStatistics {
        return {
            size: this.average(this._size),
            wait: this.average(this._wait),
            firstByte: this.average(this._firstByte),
            download: this.average(this._download),
            total: this.average(this._total)
        };
    }

    public getMedianStatistics(): IStatistics {
        return {
            size: this.median(this._size),
            wait: this.median(this._wait),
            firstByte: this.median(this._firstByte),
            download: this.median(this._download),
            total: this.median(this._total)
        };
    }

    private average(arr: number[]): number {
        return arr.reduce((a, b) => a + b, 0) / arr.length;
    }

    private median(arr: number[]): number {
        const mid = Math.floor(arr.length / 2);
        const nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    }
}
