/**
 * Created by Ben on 04/05/2017.
 */
import * as firebaseAdmin from 'firebase-admin';
import {WordMapper} from "../mapper/WordMapper";
import {Word} from "../model/Word";

export class WordRepository {

  static findRandom(): Promise<Word> {
      //TODO remove magic number
      let randomUid = Math.floor(Math.random() * 100);
      return this.findByUid(randomUid.toString());
  }

  static findByUid(wordUid: string): Promise<Word> {
    return firebaseAdmin.database().ref(`/words/${wordUid}`).once('value').then(snapshot => { return WordMapper.toModel(snapshot.val())});
  }

}
