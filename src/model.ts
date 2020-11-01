export enum LetterState {
  Correct,
  Misplaced,
  Incorrect,
  Default,
}

export enum RoundState {
  Ongoing,
  Lost,
  Won,
}

export type RoundResult = RoundState.Lost | RoundState.Won;

export interface GameState {
  difficulty: number;
  round: number;
  word: string | null;
}
