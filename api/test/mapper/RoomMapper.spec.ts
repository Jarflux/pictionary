import {expect} from "chai";
import {RoomMapper} from "../../src/mapper/RoomMapper";
import {Room} from "../../src/model/Room";
import {GameState} from "../../src/model/GameState";
import {List} from "../../src/model/List";

describe('RoomMapper', function () {

  describe('toModel', function () {
    let roomJson = {};
    roomJson["name"] = "name123";
    roomJson["artistUid"] = "artist123";
    roomJson["winnerUid"] = "winner123";
    roomJson["gameState"] = GameState.Running;
    roomJson["startRoundTimestamp"] = 123;
    roomJson["wordUid"] = "word123";
    let playersJson = {};
    playersJson["player1"] = "player1";
    playersJson["player2"] = "player2";
    roomJson["players"] = playersJson;

    let room = RoomMapper.toModel(roomJson);
    it('should map name', function () {
      expect(room.getName()).to.be.equal("name123");
    });

    it('should map artistUid', function () {
      expect(room.getArtistUid()).to.be.equal("artist123");
    });

    it('should map winnerUid', function () {
      expect(room.getWinnerUid()).to.be.equal("winner123");
    });

    it('should map gameState', function () {
      expect(room.getGameState()).to.be.equal(GameState.Running);
    });

    it('should map startRoundTimestamp', function () {
      expect(room.getStartRoundTimestamp()).to.be.equal(123);
    });

    it('should map wordUid', function () {
      expect(room.getWordUid()).to.be.equal("word123");
    });

    it('should map players', function () {
      expect(room.getPlayers().size()).to.be.equal(2);
      expect(room.getPlayers().get(0)).to.be.equal("player1");
      expect(room.getPlayers().get(1)).to.be.equal("player2");
    });

    it('should map all room properties', function () {
      expect(room.getName()).to.be.equal("name123");
      expect(room.getArtistUid()).to.be.equal("artist123");
      expect(room.getWinnerUid()).to.be.equal("winner123");
      expect(room.getGameState()).to.be.equal(GameState.Running);
      expect(room.getStartRoundTimestamp()).to.be.equal(123);
      expect(room.getWordUid()).to.be.equal("word123");
      expect(room.getPlayers().size()).to.be.equal(2);
      expect(room.getPlayers().get(0)).to.be.equal("player1");
      expect(room.getPlayers().get(1)).to.be.equal("player2");
    });

  });

  describe('toObject', function () {

    let room = new Room();
    room.setName("123456789");
    room.setArtistUid("1234A");
    room.setWinnerUid("1234B");
    room.setWordUid("1234C");
    room.setGameState(GameState.Running);
    room.setStartRoundTimestamp(1234);

    let players = new List<string>();
    players.add("Player1");
    players.add("Player2");
    room.setPlayers(players);
    let roomObject = RoomMapper.toObject(room);

    it('should map room name', function () {
      expect(roomObject["name"]).to.be.equal(room.getName());
    });

    it('should map room artistUid', function () {
      expect(roomObject["artistUid"]).to.be.equal(room.getArtistUid());
    });

    it('should map room winnerUid', function () {
      expect(roomObject["winnerUid"]).to.be.equal(room.getWinnerUid());
    });

    it('should map room wordUid', function () {
      expect(roomObject["wordUid"]).to.be.equal(room.getWordUid());
    });

    it('should map room gameState', function () {
      expect(roomObject["gameState"]).to.be.equal(GameState.Running);
    });
    it('should map room startRoundTimestamp', function () {
      expect(roomObject["startRoundTimestamp"]).to.be.equal(room.getStartRoundTimestamp());
    });

    it('should map players', function () {
      expect(Object.keys(roomObject["players"]).length).to.be.equal(2);
      expect(roomObject["players"][0]).to.be.equal("Player1");
      expect(roomObject["players"][1]).to.be.equal("Player2");
    });

    it('should map all room properties', function () {
      expect(roomObject["name"]).to.be.equal(room.getName());
      expect(roomObject["artistUid"]).to.be.equal(room.getArtistUid());
      expect(roomObject["winnerUid"]).to.be.equal(room.getWinnerUid());
      expect(roomObject["wordUid"]).to.be.equal(room.getWordUid());
      expect(roomObject["gameState"]).to.be.equal(room.getGameState());
      expect(roomObject["startRoundTimestamp"]).to.be.equal(room.getStartRoundTimestamp());
      expect(Object.keys(roomObject["players"]).length).to.be.equal(2);
      expect(roomObject["players"][0]).to.be.equal("Player1");
      expect(roomObject["players"][1]).to.be.equal("Player2");
    });

  });
});
