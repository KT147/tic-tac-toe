import xImage from '../assets/x.png';
import oImage from '../assets/o.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


function Game() {

    const storedPlayers = JSON.parse(localStorage.getItem("players")) || []

    const playerOne = storedPlayers[0]
    const playerTwo = storedPlayers[1]

    const [count, setCount] = useState(0)
    const [board, setBoard] = useState(Array(9).fill(null))
    const [winner, setWinner] = useState(null)
    const [scorePlayerOne, setScorePlayerOne] = useState(0)
    const [scorePlayerTwo, setScorePlayerTwo] = useState(0)

    useEffect(() => {
        const storedScorePlayerOne = JSON.parse(localStorage.getItem("scorePlayerOne")) || 0
        const storedScorePlayerTwo = JSON.parse(localStorage.getItem("scorePlayerTwo")) || 0
        setScorePlayerOne(storedScorePlayerOne);
        setScorePlayerTwo(storedScorePlayerTwo);
      }, [])

    const getPlayerImage = (player) => {
        return player === "X" ? xImage : oImage
    }

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
        ]
    for (let combo of winningCombinations) {
        const [a, b, c] = combo
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]
        }
        }
          return null
    }

    const toggle = (index) => {
        if (board[index] || winner) return
    
        const newBoard = [...board]
        newBoard[index] = count % 2 === 0 ? "X" : "O"
        setBoard(newBoard)
        setCount(count + 1)
    
        const currentWinner = getWinner(newBoard)
        if (currentWinner) {
          setWinner(currentWinner)
          updateScore(currentWinner);
        }
      }

    const updateScore = (currentWinner) => {
     if (currentWinner === "X") {
      setScorePlayerOne(scorePlayerOne + 1)
      localStorage.setItem("scorePlayerOne", JSON.stringify(scorePlayerOne + 1))
    } else if (currentWinner === "O") {
      setScorePlayerTwo(scorePlayerTwo + 1)
      localStorage.setItem("scorePlayerTwo", JSON.stringify(scorePlayerTwo + 1))
    }
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setCount(0)
        setWinner(null)
    }

  return (
    <div>
        <Link to="/"><button>Back to main page</button></Link> <br />

        <label>Player 1</label>
        <span>{playerOne}</span><br />
        <label>Player 2</label>
        <span>{playerTwo}</span>

        <div>
            <span>Score: {playerOne}  {scorePlayerOne} : {scorePlayerTwo} {playerTwo}</span>
        </div>

        {winner && (
        <div>
          <h2>{winner === "X" ? playerOne : playerTwo} wins!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
        )}

        <div className="gameboard">
        {board.map((value, index) => (
          <span
            key={index}
            className="box"
            onClick={() => toggle(index)}
          >
            {value === "X" ? (
              <img className="x-image" src={getPlayerImage(value)} alt={value} />
            ) : value === "O" ? (
              <img className="o-image" src={getPlayerImage(value)} alt={value} />
            ) : ""}
          </span>
        ))}
      </div>
        <br /><br />
      <Link to="/scoreboard"><button>Scoreboard</button></Link>
    </div>
  )
}

export default Game