/**
 * Created by Ben on 04/05/2017.
 */
import * as firebase from 'firebase/app'
import {Word} from "../model/Word";

export class WordMapper {

  static toModel(dataSnapShot: firebase.database.DataSnapshot): Word{
    let word = new Word();
    word.setUid(dataSnapShot.key);
    word.setWord(dataSnapShot.child("word").val())
    //TODO map synonyms;
    //word.setSynonyms(dataSnapShot.child("synonyms").val())
    return word;
  }

  static toObject(word: Word): Object{
    return {
      word: word.getWord()
    }
  }

}
