export enum LetterStatus {
  Correct,
  Misplaced,
  Incorrect,
  Default,
}

export enum Status {
  Ongoing,
  Lost,
  Won,
}

export type RoundResult = Status.Lost | Status.Won;

export interface GameState {
  status: Status;
  difficulty: number;
  round: number;
  word: Word | null;
  armor: DefensePart;
  health: DefensePart;
  attempts: number;
}

export interface DefensePart {
  max: number;
  value: number;
}

export enum Locale {
  EN = "en",
  FR = "fr",
}

export interface Word {
  original: string;
  ascii: string;
}
