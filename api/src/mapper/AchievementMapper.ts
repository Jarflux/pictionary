import {Achievement} from "../model/Achievement";
import {List} from "../model/List";
import {MetricsMapper} from "./MetricsMapper";
/**
 * Created by Ben on 16/05/2017.
 */

export class AchievementMapper {

  static toModel(json: Object): Achievement{
    let achievement = new Achievement();
    achievement.setName(json["name"]);
    achievement.setImage(json["image"]);
    achievement.setMetrics(MetricsMapper.toModelMap(json["metrics"]));
    return achievement;
  }

  static toModelList(json: Object): List<Achievement>{
    let achievements = new List<Achievement>();
    for (let key in json) {
      achievements.add(AchievementMapper.toModel(json[key]));
    }
    return achievements;
  }

  static toObject(achievement: Achievement): Object{
    let obj = {};
    obj["name"] = achievement.getName();
    obj["image"] = achievement.getImage();
    obj["metrics"] = MetricsMapper.toObjectMap(achievement.getMetrics());
    return obj;
  }


  static toObjectList(achievements: List<Achievement>): Object{
    let obj = {};
    achievements.getArray().forEach(function(element) {
      obj[element.getName()] = AchievementMapper.toObject(element);
    });
    return obj;
  }

}
