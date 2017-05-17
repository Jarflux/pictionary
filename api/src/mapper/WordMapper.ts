/**
 * Created by Ben on 04/05/2017.
 */
import {Word} from "../model/Word";
import {List} from "../model/List";

export class WordMapper {

  static toModel(json: Object): Word{
    let word = new Word();
    word.setUid(json["uid"]);
    word.setWord(json["word"]);
    word.setSynonyms(WordMapper.synonymsToModel(json["synonyms"]));
    return word;
  }

  static synonymsToModel(json: Object): List<string>{
    let synonyms = new List<string>();
    for (let key in json) {
      synonyms.add(key);
    }
    return synonyms;
  }

  static toObject(word: Word): Object{
    return {
      uid: word.getUid(),
      word: word.getWord(),
      synonyms: this.synonymsToObject(word.getSynonyms())
    }
  }

  static synonymsToObject(synonyms: List<string>): Object{
    let obj = {};
    synonyms.getArray().forEach(function (synonym) {
        obj[synonyms.getArray().indexOf(synonym)] = synonym;
    });
    return obj;
  }

}
