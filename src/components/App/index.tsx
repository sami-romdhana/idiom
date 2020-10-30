import React from "react";
import Title from "components/Title";
import Round from "components/Round";
import "./style.css";

export default function App() {
  return (
    <div className="App">
      <div className="App--title">
        <Title />
      </div>
      <Round word="attempts" />
    </div>
  );
}
