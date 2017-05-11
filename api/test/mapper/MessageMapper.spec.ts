/**
 * Created by Ben on 11/05/2017.
 */

import {expect} from "chai";
import {MessageMapper} from "../../src/mapper/MessageMapper";
import {Message} from "../../src/model/Message";

describe('MessageMapper', function () {

  describe('toObject', function () {
    it('should map message content', function () {
      let message = new Message("this back-end-front-end test is awesome");
      expect(MessageMapper.toObject(message)["content"]).to.be.equal(message.getContent());
    });

    it('should map message timestamp', function () {
      let message = new Message("this back-end-front-end test is awesome");
      expect(MessageMapper.toObject(message)["timestamp"]).to.be.equal(message.getTimestamp());
    });

    it('should map all message properties', function () {
      let message = new Message("");
      message.setContent("this back-end-front-end test is awesome");
      message.setTimestamp(100);
      expect(MessageMapper.toObject(message)["content"]).to.be.equal(message.getContent());
      expect(MessageMapper.toObject(message)["timestamp"]).to.be.equal(message.getTimestamp());
    });
  });
});
