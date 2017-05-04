/**
 * Created by Ben on 04/05/2017.
 */

export class Player{
  private _uid: string;
  private _name: string;
  private _guessCount: number;
  private _correctGuessCount: number;
  private _score: number;
 // private _oldPlayer: Player; for future delta calcualtion purpose

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

  getGuessCount(): number {
    return this._guessCount;
  }

  setGuessCount(value: number) {
    this._guessCount = value;
  }

  getCorrectGuessCount(): number {
    return this._correctGuessCount;
  }

  setCorrectGuessCount(value: number) {
    this._correctGuessCount = value;
  }

  getScore(): number {
    return this._score;
  }

  setScore(value: number) {
    this._score = value;
  }
}
