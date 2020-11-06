import { Locale } from "model";

export async function getWords(locale: string) {
  switch (locale) {
    case Locale.EN:
      let enWordObj = await import("words/en.json");
      return enWordObj.en;
    case Locale.FR:
      let frWordObj = await import("words/fr.json");
      return frWordObj.fr;
    default:
      throw new Error("Unknown locale: " + locale);
  }
}
