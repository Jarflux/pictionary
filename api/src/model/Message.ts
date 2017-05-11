/**
 * Created by Ben on 04/05/2017.
 */

export class Message{
  private _content: string;
  private _timestamp: number;

  constructor( content: string) {
    this._content = content;
    this._timestamp = Math.floor(Date.now());
  }

  getContent(): string {
    return this._content;
  }

  setContent(value: string) {
    this._content = value;
  }

  getTimestamp(): number {
    return this._timestamp;
  }

  setTimestamp(value: number) {
    this._timestamp = value;
  }
}
