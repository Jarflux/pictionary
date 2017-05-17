/**
 * Created by Ben on 07/05/2017.
 */
import {} from "mocha";
import {expect} from "chai";
import {GameService} from "../../src/service/GameService";
import {Word} from "../../src/model/Word";
import {List} from "../../src/model/List";
import sinon = require("sinon");

describe('GameService', function () {

  describe('matchesSingularOrPluralWord', function () {

    it('should always match "blaaspijp"', function () {
      expect(GameService.matchesSingularOrPluralWord("notRelevant", "blaaspijp")).to.be.true;
    });

    it('should not match incorrect word', function () {
      expect(GameService.matchesSingularOrPluralWord("qwerty", "azerty")).to.be.false;
    });

    it('should match correct word', function () {
      expect(GameService.matchesSingularOrPluralWord("qwerty", "qwerty")).to.be.true;
    });

    it('should match without correct casing', function () {
      expect(GameService.matchesSingularOrPluralWord("Qwerty", "qwerty")).to.be.true;
      expect(GameService.matchesSingularOrPluralWord("qwerty", "qwErty")).to.be.true;
    });

    it('should match plural word ending in "o"', function () {
      expect(GameService.matchesSingularOrPluralWord("hero", "heroes")).to.be.true;
      expect(GameService.matchesSingularOrPluralWord("studio", "studios")).to.be.true;
    });

    it('should match plural word ending in "fe"', function () {
      expect(GameService.matchesSingularOrPluralWord("knife", "knives")).to.be.true;
    });

    it('should match plural word ending in "f"', function () {
      expect(GameService.matchesSingularOrPluralWord("leaf", "leaves")).to.be.true;
    });

    it('should match plural word ending in "y"', function () {
      expect(GameService.matchesSingularOrPluralWord("baby", "babies")).to.be.true;
      expect(GameService.matchesSingularOrPluralWord("display", "displays")).to.be.true;
    });

    it('should match regular plural word', function () {
      expect(GameService.matchesSingularOrPluralWord("keyboard", "keyboards")).to.be.true;
    });

  });


  describe('validateGuess', function () {

    let stub;

    it('should validate correct word', function () {
      let word = new Word();
      word.setWord("word");
      word.setSynonyms(null);
      stub = sinon.stub(GameService, "matchesSingularOrPluralWord").returns(true);
      expect(GameService.validateGuess(word, "123456789")).to.be.true;
    });

    it('should validate correct synonym', function () {
      let word = new Word();
      word.setWord("word");
      let synonyms = new List<string>();
      synonyms.add("a");
      synonyms.add("b");
      synonyms.add("c");
      word.setSynonyms(synonyms);
      stub = sinon.stub(GameService, "matchesSingularOrPluralWord")
        .onCall(0).returns(false)
        .onCall(1).returns(false)
        .onCall(2).returns(true);
      expect(GameService.validateGuess(word, "123456789")).to.be.true;
    });

    it('should not validate incorrect word without synonyms', function () {
      let word = new Word();
      word.setWord("word");
      word.setSynonyms(null);
      stub = sinon.stub(GameService, "matchesSingularOrPluralWord").returns(false);
      expect(GameService.validateGuess(word, "123456789")).to.be.false;
    });

    it('should not validate incorrect word or synonyms', function () {
      let word = new Word();
      word.setWord("word");
      let synonyms = new List<string>();
      synonyms.add("a");
      synonyms.add("b");
      synonyms.add("c");
      word.setSynonyms(synonyms);
      stub = sinon.stub(GameService, "matchesSingularOrPluralWord").returns(false);
      expect(GameService.validateGuess(word, "123456789")).to.be.false;
    });

    afterEach(function () {
      stub.restore();
    });

  });
});

