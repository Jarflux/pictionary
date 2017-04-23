export class UserProfile {
    name: string;
    secure: {
        guessCount: number;
        correctGuessCount: number;
        score: number;
        accuracy: number; // calculated
    };
}