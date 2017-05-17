/**
 * Created by Ben on 11/05/2017.
 */
import {} from "mocha";
import {expect} from "chai";
import {Room} from "../../src/model/Room";
import {GameState} from "../../src/model/GameState";
import {List} from "../../src/model/List";
import {Metric} from "../../src/model/Metric";

describe('Metric', function () {

  describe('getValues', function () {

    it('should return iterator containing all possible values', function () {
      let iter = Metric.getvalues();
      expect(iter.next().value.valueOf()).to.be.equal(Metric.CORRECT_GUESS_COUNT);
      expect(iter.next().value.valueOf()).to.be.equal(Metric.GUESS_COUNT);
      expect(iter.next().done).to.be.equal(true);
     });

  });
});
