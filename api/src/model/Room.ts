/**
 * Created by Ben on 04/05/2017.
 */

import {List} from "./List";
import {GameState} from "./GameState";

export class Room{
  private _uid: string;
  private _name: number;
  private _artistUid: string;
  private _gameState: GameState;
  private _wordUid: string;
  private _startRoundTimestamp: number;
  private _players: List<string>;

  getUid(): string {
    return this._uid;
  }

  setUid(value: string) {
    this._uid = value;
  }

  getName(): number {
    return this._name;
  }

  setName(value: number) {
    this._name = value;
  }

  getArtistUid(): string {
    return this._artistUid;
  }

  setArtistUid(value: string) {
    this._artistUid = value;
  }

  getGameState(): GameState {
    return this._gameState;
  }

  setGameState(value: GameState) {
    this._gameState = value;
  }

  public getWordUid(): string {
    return this._wordUid;
  }

  setWordUid(value: string) {
    this._wordUid = value;
  }

  getStartRoundTimestamp(): number {
    return this._startRoundTimestamp;
  }

  setStartRoundTimestamp(value: number) {
    this._startRoundTimestamp = value;
  }

  getPlayers(): List<string> {
    return this._players;
  }

  setPlayers(value: List<string>) {
    this._players = value;
  }

  isArtistStillHere(): boolean {
    return this._players.contains(this._artistUid);
  }

  isInProgress(): boolean{
   return this._gameState === GameState.Running;
  }

  getNextArtistUid(): string{
    return this._players.next(this._artistUid);
  }

}
