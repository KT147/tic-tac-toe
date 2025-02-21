import { Link } from "react-router-dom"

function ScoreBoard() {

    const gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || []

    return (
        <div>
            <Link to="/"><button>To the main page</button></Link>
            {gameHistory > 0 &&<div>Scores:</div>}
            {gameHistory.map((game, index) => (
                <div key={index}>
                    <div>{game.playerOne.name} : {game.playerOne.score}</div>
                    <div>{game.playerTwo.name} : {game.playerTwo.score}</div>
                    <Link to="/game-continue"><button>Continue Playing</button></Link>
                </div>
            ))}
        </div>
    )    
}

export default ScoreBoard