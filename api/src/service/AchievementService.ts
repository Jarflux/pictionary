/**
 * Created by Ben on 04/05/2017.
 */
import {Player} from "../model/Player";
import {AchievementRepository} from "../repository/AchievementRepository";
import {Achievement} from "../model/Achievement";
import {Metric} from "../model/Metric";

export class AchievementService {

  static awardAchievements(player: Player) {
    AchievementRepository.findAll().then(achievementsList =>
      achievementsList.getArray().forEach(function (achievement) {
        if (this.playerMeetsRequiredMetricsForAchievement(player, achievement)) {
          player.addAchievement(achievement);
        }
      })
    );
  }

  static playerMeetsRequiredMetricsForAchievement(player: Player, achievement: Achievement): boolean {
    let result = false;
    if (player && achievement && !player.hasAchievement(achievement) && achievement.getMetrics()) {
      result = true;
      achievement.getMetrics().forEach(function (value, metric) {
        if (player.getMetrics() && player.getMetrics().has(metric) && player.getMetrics().get(metric) >= value) {
          player.addAchievement(achievement);
        } else {
          result = false;
        }
      });
    }
    return result;
  }

}





