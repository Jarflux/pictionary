/**
 * Created by Ben on 11/05/2017.
 */

import {expect} from "chai";
import {WordMapper} from "../../src/mapper/WordMapper";
import {Word} from "../../src/model/Word";
import {List} from "../../src/model/List";

describe('WordMapper', function () {

  describe('toObject', function () {

    let word = new Word();
    let synonyms = new List<string>();
    synonyms.add("c");
    synonyms.add("d");
    word.setSynonyms(synonyms);
    word.setWord("word");

    it('should map word', function () {
      expect(WordMapper.toObject(word)["word"]).to.be.equal(word.getWord());
    });

    it('should map word synonyms', function () {
     // expect(WordMapper.toObject(word)["synonyms"].length).to.be.equal(word.getSynonyms().size());
    //  expect(WordMapper.toObject(word)["synonyms"][0]).to.be.equal(word.getSynonyms().get(0));
    //  expect(WordMapper.toObject(word)["synonyms"][1]).to.be.equal(word.getSynonyms().get(1));
    });

    it('should map all word properties', function () {
      let word = new Word();
      let synonyms = new List<string>();
      synonyms.add("c");
      synonyms.add("d");
      word.setSynonyms(synonyms);
      word.setWord("word");
      expect(WordMapper.toObject(word)["word"]).to.be.equal(word.getWord());
      //expect(WordMapper.toObject(word)["synonyms"].length).to.be.equal(word.getSynonyms().size());
     // expect(WordMapper.toObject(word)["synonyms"][0]).to.be.equal(word.getSynonyms().get(0));
     // expect(WordMapper.toObject(word)["synonyms"][1]).to.be.equal(word.getSynonyms().get(1));
    });
  });
});
