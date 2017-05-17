/**
 * Created by Ben on 11/05/2017.
 */

import {} from "mocha";
import {expect} from "chai";
import {PlayerMapper} from "../../src/mapper/PlayerMapper";
import {Player} from "../../src/model/Player";
import {Metric} from "../../src/model/Metric";

describe('PlayerMapper', function () {

  describe('toModel', function () {
    let metricsJson = {};
    metricsJson[Metric.CORRECT_GUESS_COUNT.toString()] = 50;
    metricsJson[Metric.GUESS_COUNT.toString()] = 100;

    let achievementsJson = {};
    achievementsJson["test"] = {};

    let playerJson = {};
    playerJson["uid"] = "abc123";
    playerJson["name"] = "Elien";
    playerJson["score"] = 1000;
    playerJson["metrics"] = metricsJson;
    playerJson["achievements"] = achievementsJson;

    let Player = PlayerMapper.toModel(playerJson);

    it('should map player uid', function () {
      expect(Player.getUid()).to.be.equal("abc123");
    });

    it('should map player name', function () {
      expect(Player.getName()).to.be.equal("Elien");
    });

    it('should map player score', function () {
      expect(Player.getScore()).to.be.equal(1000);
    });

    it('should map all player metrics', function () {
      expect(Player.getMetrics().size).to.be.equal(2);
      expect(Player.getMetric(Metric.CORRECT_GUESS_COUNT)).to.be.equal(50);
      expect(Player.getMetric(Metric.GUESS_COUNT)).to.be.equal(100);
    });

    it('should map all player achievements', function () {
      expect(Player.getAchievements().size()).to.be.equal(1);
    });

    it('should map all player properties', function () {
      expect(Player.getScore()).to.be.equal(1000);
    });

  });

  describe('toObject', function () {

    it('should map player name', function () {
      let player = new Player();
      player.setName("123456789");
      expect(PlayerMapper.toObject(player)["name"]).to.be.equal(player.getName());
    });

    it('should map player guessCount', function () {
      let player = new Player();
      player.addMetric(Metric.GUESS_COUNT,8);
      expect(PlayerMapper.toObject(player)["metrics"][Metric.GUESS_COUNT]).to.be.equal(player.getMetric(Metric.GUESS_COUNT));
    });

    it('should map player correctGuessCount', function () {
      let player = new Player();
      player.addMetric(Metric.CORRECT_GUESS_COUNT,9);
      expect(PlayerMapper.toObject(player)["metrics"][Metric.CORRECT_GUESS_COUNT]).to.be.equal(player.getMetric(Metric.CORRECT_GUESS_COUNT));
    });

    it('should map player score', function () {
      let player = new Player();
      player.setScore(100);
      expect(PlayerMapper.toObject(player)["score"]).to.be.equal(player.getScore());
    });

    it('should map all player properties', function () {
      let player = new Player();
      player.setName("123456789");
      player.addMetric(Metric.GUESS_COUNT,2);
      player.addMetric(Metric.CORRECT_GUESS_COUNT,3);
      player.setScore(100);
      expect(PlayerMapper.toObject(player)["name"]).to.be.equal(player.getName());
      expect(PlayerMapper.toObject(player)["metrics"][Metric.GUESS_COUNT]).to.be.equal(player.getMetric(Metric.GUESS_COUNT));
      expect(PlayerMapper.toObject(player)["metrics"][Metric.CORRECT_GUESS_COUNT]).to.be.equal(player.getMetric(Metric.CORRECT_GUESS_COUNT));
      expect(PlayerMapper.toObject(player)["score"]).to.be.equal(player.getScore());
    });

  });
});
