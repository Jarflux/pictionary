/**
 * Created by Ben on 04/05/2017.
 */

import * as firebaseFunctions from 'firebase-functions';
import {GameService} from "../../service/GameService";
//import * as Cors from 'cors';

export let guessHttpEndpoint = firebaseFunctions.https.onRequest(async (request, response) => {
  let roomUid = request.query.roomUid;
  let playerUid = request.query.playerUid;
  let guess = request.query.guess;

  console.log(`Recieved guess: ${guess} ${roomUid} ${playerUid}`);

  //TODO Add cors
 // const cors = Cors({origin: true});
 // cors(request, response, () => {
    let isCorrectAnswerResult = GameService.processGuess(roomUid, playerUid, guess);
    response.status(isCorrectAnswerResult ? 200 : 204).send();
 // });

});
