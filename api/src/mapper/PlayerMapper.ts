/**
 * Created by Ben on 04/05/2017.
 */
import {Player} from "../model/Player";
import {MetricsMapper} from "./MetricsMapper";
import {AchievementMapper} from "./AchievementMapper";
import {List} from "../model/List";

export class PlayerMapper {

  static toModel(json: Object): Player{
    let player = new Player();
    player.setUid(json["uid"]);
    player.setName(json["name"]);
    player.setScore(json["score"]);
    player.setMetrics(MetricsMapper.toModelMap(json["metrics"]));
    player.setAchievements(AchievementMapper.toModelList(json["achievements"]));
    return player;
  }

  static toModelStringList(json: Object): List<string>{
    let players = new List<string>();
    for (let key in json) {
      players.add(key);
    }
    return players;
  }

  static toObject(player: Player): Object{
    return {
      name: player.getName(),
      score: player.getScore(),
      metrics: MetricsMapper.toObjectMap(player.getMetrics()),
      achievements: AchievementMapper.toObjectList(player.getAchievements())
    }
  }

  static toObjectStringList(players: List<string>): Object{
    let obj = {};
    players.getArray().forEach(function (player) {
      obj[players.getArray().indexOf(player)] = player;
    });
    return obj;
  }

}
