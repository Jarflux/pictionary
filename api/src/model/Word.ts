/**
 * Created by Ben on 04/05/2017.
 */

import {List} from "./List";

export class Word {
  private _uid: string;
  private _word: string;
  private _synonyms: List<string>;

  getUid(): string {
    return this._uid;
  }

  setUid(value: string) {
    this._uid = value;
  }

  getWord(): string {
    return this._word;
  }

  setWord(value: string) {
    this._word = value;
  }

  getSynonyms(): List<string> {
    return this._synonyms;
  }

  setSynonyms(value: List<string>) {
    this._synonyms = value;
  }
}
