/**
 * Created by Ben on 04/05/2017.
 */
import {List} from "./List";
import {GameState} from "./GameState";

export class Room {
  private _uid: string;
  private _name: string;
  private _artistUid: string;
  private _winnerUid: string;
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

  getName(): string {
    return this._name;
  }

  setName(value: string) {
    this._name = value;
  }

  getArtistUid(): string {
    return this._artistUid;
  }

  setArtistUid(value: string) {
    this._artistUid = value;
  }

  getWinnerUid(): string {
    return this._winnerUid;
  }

  setWinnerUid(value: string) {
    this._winnerUid = value;
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

  isInProgress(): boolean {
    return this._gameState === GameState.Running;
  }

  getNextArtistUid(): string {
    return this._players.getNext(this._artistUid);
  }

  stopRound(winnerUid: string) {
    this.setWinnerUid(winnerUid);
    this.setStartRoundTimestamp(0);
    this.setGameState(GameState.Stopped);
  }

  stopRoundWithoutWinner() {
    this.stopRound(null);
  }

  startRound(wordUid: string) {
    if (this.getPlayers() && this.getPlayers().getArray() && this.getPlayers().getArray().length > 3) {
      this.setWinnerUid(null);
      this.setArtistUid(this.getNextArtistUid());
      this.setWordUid(wordUid);
      this.setGameState(GameState.Running);
      this.setStartRoundTimestamp(Math.floor(Date.now()));
    }
  }

  waitForPlayers() {
    this.setWinnerUid(null);
    this.setStartRoundTimestamp(0);
    this.setWordUid(null);
    this.setGameState(GameState.WaitingForPlayers);
  }
}
