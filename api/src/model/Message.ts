/**
 * Created by Ben on 04/05/2017.
 */

export class Message{
  private _message: string;
  private _timestamp: number;

  constructor( message: string) {
    this._message = message;
    this._timestamp = Math.floor(Date.now());
  }

  getMessage(): string {
    return this._message;
  }

  setMessage(value: string) {
    this._message = value;
  }

  getTimestamp(): number {
    return this._timestamp;
  }

  setTimestamp(value: number) {
    this._timestamp = value;
  }
}
