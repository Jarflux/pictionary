/**
 * Created by Ben on 07/05/2017.
 */

import {} from "mocha";
import {expect} from "chai";
import {Achievement} from "../../src/model/Achievement";
import {Metric} from "../../src/model/Metric";
import {Player} from "../../src/model/Player";
import {AchievementService} from "../../src/service/AchievementService";

describe('AchievementService', function () {

  describe('playerMeetsRequiredMetricsForAchievement', function () {

    let achievement = new Achievement();
    achievement.setName("achievement");
    let player = new Player();

    it('should return false when the achievement has no requirements', function () {
      expect(AchievementService.playerMeetsRequiredMetricsForAchievement(player, achievement)).to.be.false;
    });

    achievement.addMetric(Metric.GUESS_COUNT, 5);

    it('should return false when player does not meet achievement requirements', function () {
      player.addMetric(Metric.GUESS_COUNT, 4);
      expect(AchievementService.playerMeetsRequiredMetricsForAchievement(player, achievement)).to.be.false;
    });

    it('should return true when player meets achievement requirements', function () {
      player.addMetric(Metric.GUESS_COUNT, 1);
      expect(AchievementService.playerMeetsRequiredMetricsForAchievement(player, achievement)).to.be.true;
    });

    it('should return false when player already achieved the achievement', function () {
      player.addAchievement(achievement);
      expect(AchievementService.playerMeetsRequiredMetricsForAchievement(player, achievement)).to.be.false;
    });

    it('should return false when player is undefined', function () {
      expect(AchievementService.playerMeetsRequiredMetricsForAchievement(null, achievement)).to.be.false;
    });

    it('should return false when achievement is undefined', function () {
      expect(AchievementService.playerMeetsRequiredMetricsForAchievement(player, null)).to.be.false;
    });

  });

});


