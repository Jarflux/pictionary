/**
 * Created by Ben on 11/05/2017.
 */

import {} from "mocha";
import {expect} from "chai";
import {WordMapper} from "../../src/mapper/WordMapper";
import {Word} from "../../src/model/Word";
import {List} from "../../src/model/List";

describe('WordMapper', function () {

  describe('toModel', function () {
    let wordJson = {};
    wordJson["uid"] = "abc123";
    wordJson["word"] = "eeee";
    let synonyms = {};
    synonyms["aaa"] = "aaa";
    synonyms["bbb"] = "bbb";
    wordJson["synonyms"] = synonyms;

    let word = WordMapper.toModel(wordJson);

    it('should map uid', function () {
      expect(word.getUid()).to.be.equal("abc123");
    });

    it('should map word', function () {
      expect(word.getWord()).to.be.equal("eeee");
    });

    it('should map synonyms', function () {
      expect(word.getSynonyms().size()).to.be.equal(2);
      expect(word.getSynonyms().get(0)).to.be.equal("aaa");
      expect(word.getSynonyms().get(1)).to.be.equal("bbb");
    });
  });

  describe('toObject', function () {

    let word = new Word();
    let synonyms = new List<string>();
    synonyms.add("c");
    synonyms.add("d");
    word.setSynonyms(synonyms);
    word.setWord("word");
    word.setUid("abc123");

    let wordObject = WordMapper.toObject(word);
    it('should map uid', function () {
      expect(wordObject["uid"]).to.be.equal(word.getUid());
    });

    it('should map word', function () {
      expect(wordObject["word"]).to.be.equal(word.getWord());
    });

    it('should map word synonyms', function () {
      expect(Object.keys(wordObject["synonyms"]).length).to.be.equal(word.getSynonyms().size());
      expect(wordObject["synonyms"][0]).to.be.equal(word.getSynonyms().get(0));
      expect(wordObject["synonyms"][1]).to.be.equal(word.getSynonyms().get(1));
    });

    it('should map all word properties', function () {
      expect(wordObject["uid"]).to.be.equal(word.getUid());
      expect(wordObject["word"]).to.be.equal(word.getWord());
      expect(Object.keys(wordObject["synonyms"]).length).to.be.equal(word.getSynonyms().size());
      expect(wordObject["synonyms"][0]).to.be.equal(word.getSynonyms().get(0));
      expect(wordObject["synonyms"][1]).to.be.equal(word.getSynonyms().get(1));
    });
  });
});
