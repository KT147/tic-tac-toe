import xImage from '../assets/x.png';
import oImage from '../assets/o.png';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ScoreContext } from './ScoreContext';  

function Game() {
  const { players, updateGameHistory } = useContext(ScoreContext);  

  const playerOne = players[0] || "Player 1";
  const playerTwo = players[1] || "Player 2";

  const [scorePlayerOne, setScorePlayerOne] = useState(0);
  const [scorePlayerTwo, setScorePlayerTwo] = useState(0);

  const [count, setCount] = useState(0); /// käikude tegemiseks
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [round, setRound] = useState(1);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCount(0);
    setWinner(null);
    setRound(round +1);
    if (winner) {
      saveGameResult();
    }
  };

  const getPlayerImage = (player) => {
    return player === "X" ? xImage : oImage;
  };

  //voorude vahetamiseks mängu alguses
  const getStartingPlayer = () => {
    return round % 2 === 1 ? "X" : "O"
  };

  const toggle = (index) => {
    if (board[index] || winner) return; // kontrollib kas mängija on ruudule käigu teinud või kas võitja on olemas; siis ei saa midagi teha enam
                                        // ei lase mitu korda ühele ruudele vajutada

    const newBoard = [...board];
    newBoard[index] = (count % 2 === 0) ? getStartingPlayer() : (getStartingPlayer() === "X" ? "O" : "X"); // esimene käik on nr 0
    setBoard(newBoard);
    setCount(count + 1);

    const currentWinner = getWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner);
      updateScore(currentWinner);
    };
  };

  const getWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      };
    };
    return null;
  };

  const updateScore = (currentWinner) => {
    if (currentWinner === "X") {
      setScorePlayerOne(scorePlayerOne + 1);
    } else if (currentWinner === "O") {
      setScorePlayerTwo(scorePlayerTwo + 1);
    }
  };

  const saveGameResult = () => {
    const gameResult = {
      playerOne: {
        name: playerOne,
        score: scorePlayerOne,
      },
      playerTwo: {
        name: playerTwo,
        score: scorePlayerTwo,
      },
    };
    updateGameHistory(gameResult); 
  };

  const handleQuitGame = () => {
    if (winner) {
      saveGameResult();
    }
  };

  return (
    <div>
      <div>
        <span className='score'><h2>SCORE:</h2>
          PLAYER 1 (X) <span className='player'>{playerOne} {scorePlayerOne}</span> <br />
          PLAYER 2 (O) <span className='player'>{playerTwo} {scorePlayerTwo}</span>
        </span>
      </div> <br />

      {winner && (
        <h2 className='winner'>{winner === "X" ? playerOne : playerTwo} wins!</h2>
      )}

      {winner ? <button onClick={resetGame}>New Game</button> :
        <button onClick={resetGame}>Reset</button>}

        <br /><br /><br />
        
        {/* value tähistab mänguruudu hetkeväärtust-- null, X või O */}
      <div className="gameboard">
        {board.map((value, index) => (
          <span key={index} className="box" onClick={() => toggle(index)}>
            {value === "X" ? (
              <img className="x-image" src={getPlayerImage(value)}/>
            ) : value === "O" ? (
              <img className="o-image" src={getPlayerImage(value)}/>
            ) : ""}
          </span>
        ))}
      </div>

      <br /><br />
      <Link to="/scoreboard">
        <button onClick={handleQuitGame}>Quit The Game</button>
      </Link> <br /> <br />
      <Link to="/"><button>Back To Main Page</button></Link>
    </div>
  );
}

export default Game;
