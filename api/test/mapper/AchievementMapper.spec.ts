/**
 * Created by Ben on 11/05/2017.
 */
import {} from "mocha";
import {expect} from "chai";
import {AchievementMapper} from "../../src/mapper/AchievementMapper";
import {Metric} from "../../src/model/Metric";
import {Achievement} from "../../src/model/Achievement";
import {List} from "../../src/model/List";

describe('AchievementMapper', function () {

  describe('toModel', function () {

    let achievementJson = {};
    achievementJson["name"] = "test1";
    achievementJson["image"] = "afbeelding.png";
    let metricsJson = {};
    metricsJson[Metric.CORRECT_GUESS_COUNT.toString()] = 50;
    metricsJson[Metric.GUESS_COUNT.toString()] = 100;
    achievementJson["metrics"] = metricsJson;

    let achievement = AchievementMapper.toModel(achievementJson);

    it('should map name', function () {
      expect(achievement.getName()).to.be.equal("test1");
    });

    it('should map image', function () {
      expect(achievement.getImage()).to.be.equal("afbeelding.png");
    });

    it('should map metrics', function () {
      expect(achievement.getMetrics().size).to.be.equal(2);
      expect(achievement.getMetrics().get(Metric.CORRECT_GUESS_COUNT.toString())).to.be.equal(50);
      expect(achievement.getMetrics().get(Metric.GUESS_COUNT.toString())).to.be.equal(100);
    });

    it('should map all achievement properties', function () {
      expect(achievement.getName()).to.be.equal("test1");
      expect(achievement.getImage()).to.be.equal("afbeelding.png");
      expect(achievement.getMetrics().size).to.be.equal(2);
      expect(achievement.getMetrics().get(Metric.CORRECT_GUESS_COUNT.toString())).to.be.equal(50);
      expect(achievement.getMetrics().get(Metric.GUESS_COUNT.toString())).to.be.equal(100);
    });

  });

  describe('toModelList', function () {

    it('should map empty list of achievement', function () {
      let achievementJson = {};
      achievementJson["test1"] = {};
      achievementJson["test2"] = {};
      expect(AchievementMapper.toModelList(achievementJson).size()).to.be.equal(2);
    });

    it('should map empty list of achievement', function () {
      let achievementJson = {};
      expect(AchievementMapper.toModelList(achievementJson).size()).to.be.equal(0);
    });

  });

  describe('toObject', function () {
    let achievement = new Achievement();
    achievement.setName("test123");
    achievement.setImage("afbeelding.png");
    achievement.addMetric(Metric.GUESS_COUNT,100);
    achievement.addMetric(Metric.CORRECT_GUESS_COUNT,50);

    let achievementObject = AchievementMapper.toObject(achievement);

    it('should map name', function () {
      expect(achievementObject["name"]).to.be.equal(achievement.getName());
    });

    it('should map image', function () {
      expect(achievementObject["image"]).to.be.equal(achievement.getImage());
    });

    it('should map metrics', function () {
      expect(Object.keys(achievementObject["metrics"]).length).to.be.equal(2);
      expect(achievementObject["metrics"][Metric.CORRECT_GUESS_COUNT.toString()]).to.be.equal(50);
      expect(achievementObject["metrics"][Metric.GUESS_COUNT.toString()]).to.be.equal(100);
    });

    it('should map all achievement properties', function () {
      expect(achievementObject["name"]).to.be.equal(achievement.getName());
      expect(achievementObject["image"]).to.be.equal(achievement.getImage());
      expect(Object.keys(achievementObject["metrics"]).length).to.be.equal(2);
      expect(achievementObject["metrics"][Metric.CORRECT_GUESS_COUNT.toString()]).to.be.equal(50);
      expect(achievementObject["metrics"][Metric.GUESS_COUNT.toString()]).to.be.equal(100);
    });

  });

  describe('toObjectList', function () {

    it('should map list of achievement', function () {
      let achievements = new List<Achievement>();
      let test1 = new Achievement();
      test1.setName("test1");
      let test2 = new Achievement();
      test2.setName("test2");
      achievements.add(test1);
      achievements.add(test2);
      expect(Object.keys(AchievementMapper.toObjectList(achievements)).length).to.be.equal(2);
    });

    it('should map empty list of achievement', function () {
      let achievements = new List<Achievement>();
      expect(Object.keys(AchievementMapper.toObjectList(achievements)).length).to.be.equal(0);
    });

  });
});
