/**
 * Created by Ben on 04/05/2017.
 */
import * as firebase from 'firebase/app'
import {Word} from "../model/Word";
import {List} from "../model/List";

export class WordMapper {

  static toModel(dataSnapShot: firebase.database.DataSnapshot): Word{
    let word = new Word();
    word.setUid(dataSnapShot.key);
    word.setWord(dataSnapShot.child("word").val());
    word.setSynonyms(WordMapper.getSynonyms(dataSnapShot.child("synonyms")));
    return word;
  }

  static getSynonyms(dataSnapShot: firebase.database.DataSnapshot): List<string>{
    let synonyms = new List<string>();
    dataSnapShot.child("synonyms").forEach(synonym => {
      synonyms.add(synonym.val());
      return false;
    });
    return synonyms;
  }

  static toObject(word: Word): Object{
    return {
      word: word.getWord()
    }
  }

}
