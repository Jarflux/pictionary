/**
 * Created by Ben on 11/05/2017.
 */

import {expect} from "chai";
import {PlayerMapper} from "../../src/mapper/PlayerMapper";
import {Player} from "../../src/model/Player";

describe('PlayerMapper', function () {

  describe('toObject', function () {

    it('should map player name', function () {
      let player = new Player();
      player.setName("123456789");
      expect(PlayerMapper.toObject(player)["name"]).to.be.equal(player.getName());
    });

    it('should map player guessCount', function () {
      let player = new Player();
      player.setGuessCount(1);
      expect(PlayerMapper.toObject(player)["secure"]["guessCount"]).to.be.equal(player.getGuessCount());
    });

    it('should map player correctGuessCount', function () {
      let player = new Player();
      player.setCorrectGuessCount(1);
      expect(PlayerMapper.toObject(player)["secure"]["correctGuessCount"]).to.be.equal(player.getCorrectGuessCount());
    });

    it('should map player score', function () {
      let player = new Player();
      player.setScore(100);
      expect(PlayerMapper.toObject(player)["secure"]["score"]).to.be.equal(player.getScore());
    });

    it('should map all player properties', function () {
      let player = new Player();
      player.setName("123456789");
      player.setGuessCount(1);
      player.setCorrectGuessCount(1);
      player.setScore(100);
      expect(PlayerMapper.toObject(player)["name"]).to.be.equal(player.getName());
      expect(PlayerMapper.toObject(player)["secure"]["guessCount"]).to.be.equal(player.getGuessCount());
      expect(PlayerMapper.toObject(player)["secure"]["correctGuessCount"]).to.be.equal(player.getCorrectGuessCount());
      expect(PlayerMapper.toObject(player)["secure"]["score"]).to.be.equal(player.getScore());
    });

  });
});
