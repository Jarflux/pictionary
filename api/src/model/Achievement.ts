import {Metrics} from "./Metrics";
/**
 * Created by Ben on 16/05/2017.
 */

export class Achievement extends Metrics{

  private _name: string;
  private _image: string;

  getName(): string {
    return this._name;
  }

  setName(value: string) {
    this._name = value;
  }

  getImage(): string {
    return this._image;
  }

  setImage(value: string) {
    this._image = value;
  }
}
