/**
 * Created by Ben on 04/05/2017.
 */
import {Message} from "../model/Message";

export class MessageMapper {

  static toObject(message: Message): Object{
    return {
      timestamp: message.getTimestamp(),
      content: message.getContent()
    }
  }

}
