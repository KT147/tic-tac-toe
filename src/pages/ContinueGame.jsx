import xImage from '../assets/x.png';
import oImage from '../assets/o.png';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ContinueGame() {
    const { index } = useParams();  
    const gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];
    const currentGame = gameHistory[index] || {};  

    const playerOne = currentGame.playerOne ? currentGame.playerOne.name : "Player 1";
    const playerTwo = currentGame.playerTwo ? currentGame.playerTwo.name : "Player 2";
    const [scorePlayerOne, setScorePlayerOne] = useState(currentGame.playerOne ? currentGame.playerOne.score : 0);
    const [scorePlayerTwo, setScorePlayerTwo] = useState(currentGame.playerTwo ? currentGame.playerTwo.score : 0);

    const [count, setCount] = useState(0);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState(null);

    const getPlayerImage = (player) => {
        return player === "X" ? xImage : oImage;
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
            }
        }
        return null;
    };

    const toggle = (index) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = count % 2 === 0 ? "X" : "O";
        setBoard(newBoard);
        setCount(count + 1);

        const currentWinner = getWinner(newBoard);
        if (currentWinner) {
            setWinner(currentWinner);
            updateScore(currentWinner);
        }
    };

    const updateScore = (currentWinner) => {
        if (currentWinner === "X") {
            setScorePlayerOne(scorePlayerOne + 1);
        } else if (currentWinner === "O") {
            setScorePlayerTwo(scorePlayerTwo + 1);
        }
    };

    const saveGameResult = () => {
        const previousGames = JSON.parse(localStorage.getItem("gameHistory")) || [];

        const updatedGameResult = {
            playerOne: {
                name: playerOne,
                score: scorePlayerOne,
            },
            playerTwo: {
                name: playerTwo,
                score: scorePlayerTwo,
            },
        };

        previousGames[index] = updatedGameResult;

        localStorage.setItem("gameHistory", JSON.stringify(previousGames));
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCount(0);
        setWinner(null);
    };

    const handleQuitGame = () => {
        if (winner) {
            saveGameResult();
        }
    };

    return (
        <div>
            <Link to="/"><button>Back To Main Page</button></Link>
            <br />
            <div>
                <span>Score: <br />
                Player 1 (X) {playerOne}  {scorePlayerOne} <br />
                Player 2 (O) {playerTwo} {scorePlayerTwo}</span>
            </div>

            {winner && (
                <h2>{winner === "X" ? playerOne : playerTwo} wins!</h2>
            )}

            <button onClick={resetGame}>New Game</button>

            <div className="gameboard">
                {board.map((value, index) => (
                    <span key={index} className="box" onClick={() => toggle(index)}>
                        {value === "X" ? (
                            <img className="x-image" src={getPlayerImage(value)} alt={value} />
                        ) : value === "O" ? (
                            <img className="o-image" src={getPlayerImage(value)} alt={value} />
                        ) : ""}
                    </span>
                ))}
            </div>

            <br /><br />
            <Link to="/scoreboard">
                <button onClick={handleQuitGame}>Quit the game</button>
            </Link>
        </div>
    );
}

export default ContinueGame;
