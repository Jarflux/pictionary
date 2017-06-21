/**
 * Created by Ben on 04/05/2017.
 */
import {Room} from "../model/Room";
import {PlayerMapper} from "./PlayerMapper";

export class RoomMapper {

  static toModel(json: Object): Room{
    let room = new Room();
    room.setUid(json["uid"]);
    room.setName(json["name"]);
    room.setArtistUid(json["artistUid"]);
    room.setWinnerUid(json["winnerUid"]);
    room.setGameState(json["gameState"]);
    room.setStartRoundTimestamp(json["startRoundTimestamp"]);
    room.setWordUid(json["wordUid"]);
    room.setPlayers(PlayerMapper.toModelStringList(json["players"]));
    return room;
  }

  static toObject(room: Room): Object{
    return {
      uid: room.getUid(),
      name: room.getName(),
      artistUid: room.getArtistUid(),
      winnerUid: room.getWinnerUid(),
      gameState: room.getGameState(),
      startRoundTimestamp: room.getStartRoundTimestamp(),
      wordUid: room.getWordUid(),
      players: PlayerMapper.toObjectStringList(room.getPlayers())
    };
  }

  static calculateDeltaJson(original: Room, room: Room) {
    let delta = {};
    if(original.getUid() != room.getUid()){
      delta["uid"] = room.getUid();
    }

    if(original.getName() != room.getName()){
      delta["name"] = room.getName();
    }

    if(original.getArtistUid() != room.getArtistUid()){
      delta["artistUid"] = room.getArtistUid();
    }

    if(original.getWinnerUid() != room.getWinnerUid()){
      delta["winnerUid"] = room.getWinnerUid();
    }

    if(original.getGameState() != room.getGameState()){
      delta["gameState"] = room.getGameState();
    }

    if(original.getStartRoundTimestamp() != room.getStartRoundTimestamp()){
      delta["startRoundTimestamp"] = room.getStartRoundTimestamp();
    }

    if(original.getWordUid() != room.getWordUid()){
      delta["wordUid"] = room.getWordUid();
    }

    //TODO calculate player list difference
    return delta;
  }
}
