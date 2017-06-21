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
    room.setUid("123456789");
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
      expect(roomObject["uid"]).to.be.equal(room.getUid());
    });

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
      expect(roomObject["uid"]).to.be.equal(room.getUid());
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

  describe('calculateDeltaJson', function () {

    let originalRoom = new Room();
    originalRoom.setUid("123456789");
    originalRoom.setName("123456789");
    originalRoom.setArtistUid("1234A");
    originalRoom.setWinnerUid("1234B");
    originalRoom.setWordUid("1234C");
    originalRoom.setGameState(GameState.Running);
    originalRoom.setStartRoundTimestamp(1234);

    let newRoom = new Room();
    newRoom.setUid("123456789");
    newRoom.setName("123456789");
    newRoom.setArtistUid("1234A");
    newRoom.setWinnerUid("1234B");
    newRoom.setWordUid("1234C");
    newRoom.setGameState(GameState.Running);
    newRoom.setStartRoundTimestamp(1234);

    it('should return nothing if rooms are identical', function () {
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta).to.be.empty;
    });

    it('should return new uid if uids are different', function () {
      newRoom.setUid("12345678910");
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["uid"]).to.be.equal(newRoom.getUid());
    });

    it('should return nothing uids are the same', function () {
      newRoom.setUid("123456789");
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["uid"]).to.be.undefined;
    });

    it('should return new name if names are different', function () {
      newRoom.setName("12345678910");
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["name"]).to.be.equal(newRoom.getName());
    });

    it('should return nothing names are the same', function () {
      newRoom.setName("123456789");
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["name"]).to.be.undefined;
    });

    it('should return new artistUid if artistUids are different', function () {
      newRoom.setArtistUid("1234A2");
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["artistUid"]).to.be.equal(newRoom.getArtistUid());
    });

    it('should return nothing artistUids are the same', function () {
      newRoom.setArtistUid("1234A");
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["artistUid"]).to.be.undefined;
    });

    it('should return new winnerUid if winnerUids are different', function () {
      newRoom.setWinnerUid("1234B2");
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["winnerUid"]).to.be.equal(newRoom.getWinnerUid());
    });

    it('should return nothing winnerUids are the same', function () {
      newRoom.setWinnerUid("1234B");
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["winnerUid"]).to.be.undefined;
    });

    it('should return new gamestate if gamestates are different', function () {
      newRoom.setGameState(GameState.Stopped);
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["gameState"]).to.be.equal(newRoom.getGameState());
    });

    it('should return nothing gamestates are the same', function () {
      newRoom.setGameState(GameState.Running);
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["gameState"]).to.be.undefined;
    });

    it('should return new startRoundTimestamp if startRoundTimestamps are different', function () {
      newRoom.setStartRoundTimestamp(12345);
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["startRoundTimestamp"]).to.be.equal(newRoom.getStartRoundTimestamp());
    });

    it('should return nothing startRoundTimestamps are the same', function () {
      newRoom.setStartRoundTimestamp(1234);
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["startRoundTimestamp"]).to.be.undefined;
    });

    it('should return new wordUid if wordUids are different', function () {
      newRoom.setWordUid("1234C2");
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["wordUid"]).to.be.equal(newRoom.getWordUid());
    });

    it('should return nothing wordUids are the same', function () {
      newRoom.setWordUid("1234C");
      let delta = RoomMapper.calculateDeltaJson(originalRoom, newRoom);
      expect(delta["wordUid"]).to.be.undefined;
    });

    //TODO Test delta playerslist
  });
});
