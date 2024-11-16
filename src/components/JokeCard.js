import React, { useState, useEffect } from "react";
import "./JokeCard.css";

const JokeCard = () => {
  const [joke, setJoke] = useState("");
  const [laughs, setLaughs] = useState(0);

  const fetchJoke = async () => {
    const response = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    const data = await response.json();
    setJoke(data.joke);
  };

  useEffect(() => {
    fetchJoke();
    const savedLaughs = localStorage.getItem("laughs");
    if (savedLaughs) {
      setLaughs(Number(savedLaughs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("laughs", laughs);
  }, [laughs]);

  const shareJoke = () => {
    const shareText = `Check out this Dad Joke: "${joke}" 😂`;
    if (navigator.share) {
      navigator
        .share({
          title: "Dad Jokes",
          text: shareText,
          url: window.location.href,
        })
        .catch((err) => console.error("Error sharing", err));
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Joke copied to clipboard!");
    }
  };

  const showLeaderboard = () => {
    alert(`Your total laughs: ${laughs}`);
  };

  return (
    <div className="joke-card">
      <h1>Dad Jokes: Try Not to Laugh! 😂</h1>
      <p className="joke">{joke}</p>
      <div className="buttons">
        <button onClick={() => setLaughs(laughs + 1)}>😂 I Laughed!</button>
        <button onClick={fetchJoke}>Next Joke ➡️</button>
        <button onClick={shareJoke}>📤 Share This Joke</button>
        <button onClick={showLeaderboard}>🏆 View Leaderboard</button>
      </div>
      <p className="laugh-counter">Total Laughs: {laughs}</p>
    </div>
  );
};

export default JokeCard;
