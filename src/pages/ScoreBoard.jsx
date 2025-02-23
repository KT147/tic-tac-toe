import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ScoreBoard() {
    const [gameHistory, setGameHistory] = useState([]);

    // useeffect oli vaja, et pärast mängu seisu muutmist scoreboard ise ennast uuesti renderdaks. muidu tuli refresh teha pärast uusi tulemusi.
    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("gameHistory")) || [];
        setGameHistory(history); 
    }, []); 

    return (
        <div>
            <Link to="/"><button>To the main page</button></Link>
            <br /><br /> <br />
            {gameHistory.length > 0 && <div>Scores:</div>}
            {gameHistory.map((game, index) => (
                <div key={index}>
                    <div>{game.playerOne.name} : {game.playerOne.score}</div>
                    <div>{game.playerTwo.name} : {game.playerTwo.score}</div>
                    <Link to={"/game-continue/" + index}><button>Continue Playing</button></Link>
                    <br /><br /><br />
                </div>
            ))}
        </div>
    );
}

export default ScoreBoard;
