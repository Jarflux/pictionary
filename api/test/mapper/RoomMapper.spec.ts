/**
 * Created by Ben on 11/05/2017.
 */

import {expect} from "chai";
import {RoomMapper} from "../../src/mapper/RoomMapper";
import {Room} from "../../src/model/Room";
import {GameState} from "../../src/model/GameState";

describe('RoomMapper', function () {

  describe('toObject', function () {

    it('should map room name', function () {
      let room = new Room();
      room.setName("123456789");
      expect(RoomMapper.toObject(room)["name"]).to.be.equal(room.getName());
    });

    it('should map room artistUid', function () {
      let room = new Room();
      room.setArtistUid("1234");
      expect(RoomMapper.toObject(room)["artistUid"]).to.be.equal(room.getArtistUid());
    });

    it('should map room winnerUid', function () {
      let room = new Room();
      room.setWinnerUid("1234");
      expect(RoomMapper.toObject(room)["winnerUid"]).to.be.equal(room.getWinnerUid());
    });

    it('should map room wordUid', function () {
      let room = new Room();
      room.setWordUid("1234");
      expect(RoomMapper.toObject(room)["wordUid"]).to.be.equal(room.getWordUid());
    });

    it('should map room gameState', function () {
      let room = new Room();
      room.setGameState(GameState.Running);
      expect(RoomMapper.toObject(room)["gameState"]).to.be.equal(GameState.Running);
    });

    it('should map room startRoundTimestamp', function () {
      let room = new Room();
      room.setStartRoundTimestamp(1234);
      expect(RoomMapper.toObject(room)["startRoundTimestamp"]).to.be.equal(room.getStartRoundTimestamp());
    });

    it('should map all room properties', function () {
      let room = new Room();
      room.setName("123456789");
      room.setArtistUid("1234A");
      room.setWinnerUid("1234B");
      room.setWordUid("1234C");
      room.setGameState(GameState.Running);
      room.setStartRoundTimestamp(1234);
      expect(RoomMapper.toObject(room)["name"]).to.be.equal(room.getName());
      expect(RoomMapper.toObject(room)["artistUid"]).to.be.equal(room.getArtistUid());
      expect(RoomMapper.toObject(room)["winnerUid"]).to.be.equal(room.getWinnerUid());
      expect(RoomMapper.toObject(room)["wordUid"]).to.be.equal(room.getWordUid());
      expect(RoomMapper.toObject(room)["gameState"]).to.be.equal(room.getGameState());
      expect(RoomMapper.toObject(room)["startRoundTimestamp"]).to.be.equal(room.getStartRoundTimestamp());
    });

  });
});
