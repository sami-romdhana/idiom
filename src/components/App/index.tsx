import React, { useCallback, useState } from "react";
import Title from "components/Title";
import Round from "components/Round";
import "./style.css";

export default function App() {
  const [currentWord, setCurrentWord] = useState<string | null>(null);

  const newGame = useCallback(async () => {
    const randomWord = await getRandomWord(4);
    setCurrentWord(randomWord);
  }, [setCurrentWord]);

  return (
    <div className="App">
      <div className="App--title">
        <Title />
      </div>

      {currentWord ? (
        <Round word={currentWord} />
      ) : (
        <p>Hit the button below for a new game</p>
      )}

      <button onClick={newGame}>New Game</button>
    </div>
  );
}

async function getRandomWord(length: number) {
  const wordObj = await import("words/en.json");
  const words = wordObj.en;
  const array = words.filter((word) => word.length === length);
  return array[Math.floor(Math.random() * array.length)];
}
