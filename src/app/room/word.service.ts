import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import {Word} from "../models/word";

@Injectable()
export class WordService {

  words: FirebaseListObservable<Word[]>;


  constructor(private af: AngularFire) {
    this.words = this.af.database.list('/words');
  }

  getWords(): FirebaseListObservable<Word[]> {
    return this.words;
  }

  getWordById(key: string): FirebaseObjectObservable<Word> {
    return this.af.database.object('/words/' + key);
  }
}
