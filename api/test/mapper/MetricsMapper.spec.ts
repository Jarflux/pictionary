import {expect} from "chai";
import {Metric} from "../../src/model/Metric";
import {MetricsMapper} from "../../src/mapper/MetricsMapper";

describe('MetricsMapper', function () {

  describe('toModelMap', function () {

    it('should map metrics', function () {
      let metricsJson = {};
      metricsJson[Metric.CORRECT_GUESS_COUNT.toString()] = 50;
      metricsJson[Metric.GUESS_COUNT.toString()] = 100;

      let metricsMap = MetricsMapper.toModelMap(metricsJson);
      expect(metricsMap.size).to.be.equal(2);
      expect(metricsMap.get(Metric.CORRECT_GUESS_COUNT.toString())).to.be.equal(50);
      expect(metricsMap.get(Metric.GUESS_COUNT.toString())).to.be.equal(100);
    });
  });

  describe('toObject', function () {
    let metrics = new Map<string, number>();

    for (let metric of Metric.getvalues()) {
      metrics.set(metric.toString(), Math.floor((Math.random() * 100)));

      it('should map ' + Metric[metric] + ' metrics', function () {
        expect(MetricsMapper.toObjectMap(metrics)[metric]).to.be.equal(metrics.get(metric.toString()));
      });
    }

    it('should map all metrics', function () {
      for (let metric of Metric.getvalues()) {
        expect(MetricsMapper.toObjectMap(metrics)[metric]).to.be.equal(metrics.get(metric.toString()));
      }
    });

  });
});
