/**
 * Created by Ben on 04/05/2017.
 */
import {Room} from "../model/Room";
import {PlayerMapper} from "./PlayerMapper";

export class RoomMapper {

  static toModel(json: Object): Room{
    let room = new Room();
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
      name: room.getName(),
      artistUid: room.getArtistUid(),
      winnerUid: room.getWinnerUid(),
      gameState: room.getGameState(),
      startRoundTimestamp: room.getStartRoundTimestamp(),
      wordUid: room.getWordUid(),
      players: PlayerMapper.toObjectStringList(room.getPlayers())
    };
  }

}
