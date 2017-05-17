/**
 * Created by Ben on 11/05/2017.
 */
import {} from "mocha";
import {expect} from "chai";
import {Room} from "../../src/model/Room";
import {GameState} from "../../src/model/GameState";
import {List} from "../../src/model/List";

describe('Room', function () {

  describe('isArtistStillHere', function () {

    let room = new Room();
    let players = new List<string>();
    players.add("a");
    players.add("b");
    players.add("c");
    room.setPlayers(players);

    it('should return true if artist is still in player list', function () {
      room.setArtistUid("b");
      expect(room.isArtistStillHere()).to.be.true;
     });

    it('should return false if artist is not in player list', function () {
      room.setArtistUid("d");
      expect(room.isArtistStillHere()).to.be.false;
    });
  });

  describe('isnInProgress', function () {

    it('should be true when gameState.Running', function () {
      let room = new Room();
      room.setGameState(GameState.Running);
      expect(room.isInProgress()).to.be.true;
    });

    it('should be false when gameState.Stopped', function () {
      let room = new Room();
      room.setGameState(GameState.Stopped);
      expect(room.isInProgress()).to.be.false;
    });

    it('should be false when gameState.WaitingForPlayers', function () {
      let room = new Room();
      room.setGameState(GameState.WaitingForPlayers);
      expect(room.isInProgress()).to.be.false;
    });

  });

  describe('getNextArtistUid', function () {
    let room = new Room();
    let players = new List<string>();
    players.add("a");
    players.add("b");
    players.add("c");
    room.setPlayers(players);

    it('should give random PlayerUid when ArtistUid is empty', function () {
      let nextArtist = room.getNextArtistUid()
      expect(nextArtist === "a" || nextArtist === "b" || nextArtist === "c").to.be.true;
    });

    it('should give the next PlayerUid', function () {
      room.setArtistUid("a");
      expect(room.getNextArtistUid()).to.be.equal("b");
    });

    it('should give the first PlayerUid when current ArtistUid is last player', function () {
      room.setArtistUid("c");
      expect(room.getNextArtistUid()).to.be.equal("a");
    });

  });

  describe('stopRound', function () {
    let room = new Room();
    let winner = "123456789";
    room.stopRound(winner);

    it('should fill the winner PlayerUid', function () {
      expect(room.getWinnerUid()).to.be.equal(winner);
    });

    it('should reset the startRoundTimestamp', function () {
      expect(room.getStartRoundTimestamp()).to.be.equal(0);
    });

    it('should set gameState to Stopped', function () {
      expect(room.getGameState()).to.be.equal(GameState.Stopped);
    });

  });

  describe('stopRoundWithoutWinner', function () {
    let room = new Room();
    room.stopRoundWithoutWinner();

    it('should reset the winner PlayerUid', function () {
      expect(room.getWinnerUid()).to.be.equal(null);
    });

    it('should reset the startRoundTimestamp', function () {
      expect(room.getStartRoundTimestamp()).to.be.equal(0);
    });

    it('should set gameState to Stopped', function () {
      expect(room.getGameState()).to.be.equal(GameState.Stopped);
    });

  });

  describe('startRound', function () {
    let room = new Room();
    let wordUid = "123456789";
    let players = new List<string>();
    players.add("a");
    players.add("b");
    players.add("c");
    players.add("d");
    room.setPlayers(players);
    room.startRound(wordUid);

    it('should fill the wordUid', function () {
      expect(room.getWordUid()).to.be.equal(wordUid);
    });

    it('should fill the startRoundTimestamp', function () {
      expect(room.getStartRoundTimestamp()).to.not.be.equal(0);
    });

    it('should appoint a new Artist', function () {
      expect(room.getArtistUid()).to.not.be.equal(null);
    });

    it('should reset winnerUid', function () {
      expect(room.getWinnerUid()).to.be.equal(null);
    });

    it('should set gameState to Running', function () {
      expect(room.getGameState()).to.be.equal(GameState.Running);
    });

    it('should not do anything when playercount < 3', function () {
      let room = new Room();
      let wordUid = "123456789";
      room.startRound(wordUid);
      expect(room.getWordUid()).to.not.be.equal(wordUid);
    });


  });

  describe('waitForPlayers', function () {
    let room = new Room();
    room.setWordUid("word");
    room.setWinnerUid("12345");
    room.setStartRoundTimestamp(100);
    room.setGameState(GameState.Running);
    room.waitForPlayers();

    it('should reset the wordUid', function () {
      expect(room.getWordUid()).to.be.equal(null);
    });

    it('should reset the startRoundTimestamp', function () {
      expect(room.getStartRoundTimestamp()).to.be.equal(0);
    });

    it('should reset winnerUid', function () {
      expect(room.getWinnerUid()).to.be.equal(null);
    });

    it('should set gameState to WaitingForPlayers', function () {
      expect(room.getGameState()).to.be.equal(GameState.WaitingForPlayers);
    });

  });

});
