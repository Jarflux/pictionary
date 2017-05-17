import {Metric} from "./Metric";
/**
 * Created by Ben on 17/05/2017.
 */

export class Metrics{
  private _metrics: Map<string, number> = new Map<string, number>();

  getMetric(metric: Metric): number {
    return this._metrics.get(metric.toString());
  }

  getMetrics(): Map<string, number> {
    return this._metrics;
  }

  addMetric(metric: Metric, value: number) {
    let currentMetricValue = 0;
    if (this._metrics.has(metric.toString())) {
      currentMetricValue = this._metrics.get(metric.toString());
    }
    this._metrics.set(metric.toString(), currentMetricValue + value);
  }

  setMetrics(value: Map<string, number>) {
    this._metrics = value;
  }

}
