import {Achievement} from "./Achievement";
import {List} from "./List";
import {Metrics} from "./Metrics";
/**
 * Created by Ben on 04/05/2017.
 */

export class Player extends Metrics{
  private _uid: string;
  private _name: string;
  private _score: number;
  private _achievements: List<Achievement> = new List<Achievement>();

  getUid(): string {
    return this._uid;
  }

  setUid(value: string) {
    this._uid = value;
  }

  getName(): string {
    return this._name;
  }

  setName(value: string) {
    this._name = value;
  }

  getScore(): number {
    return this._score;
  }

  setScore(value: number) {
    this._score = value;
  }

  getAchievements(): List<Achievement> {
    return this._achievements;
  }

  hasAchievement(value: Achievement): boolean{
    return this._achievements.contains(value);
  }

  addAchievement(value: Achievement) {
    this._achievements.add(value)
  }

  setAchievements(value: List<Achievement>) {
    this._achievements = value;
  }
}
