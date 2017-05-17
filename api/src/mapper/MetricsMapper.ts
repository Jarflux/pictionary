import {Metric} from "../model/Metric";

/**
 * Created by Ben on 16/05/2017.
 */

export class MetricsMapper {

  static toModelMap(json: Object): Map<string, number>{
    let metrics = new Map<string, number>();
    for (let key in json) {
      metrics.set(key,json[key]);
    }
    return metrics;
  }

  static toObjectMap(metrics: Map<string, number>): Object {
    let obj = {};
    obj[Metric.GUESS_COUNT.toString()] = metrics.get(Metric.GUESS_COUNT.toString());
    obj[Metric.CORRECT_GUESS_COUNT.toString()] = metrics.get(Metric.CORRECT_GUESS_COUNT.toString());
    return obj;
  }

}
