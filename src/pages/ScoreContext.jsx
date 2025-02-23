import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const ScoreContext = createContext();

export const ScoreContextProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    const storedGameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
    setPlayers(storedPlayers);
    setGameHistory(storedGameHistory);
  }, []);

  const updateGameHistory = (gameResult) => {
    const updatedGameHistory = [...gameHistory, gameResult];
    setGameHistory(updatedGameHistory);
    localStorage.setItem("gameHistory", JSON.stringify(updatedGameHistory));
  };

  return (
    <ScoreContext.Provider value={{ players, gameHistory, updateGameHistory, setPlayers }}>
      {children}
    </ScoreContext.Provider>
  );
};

ScoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
