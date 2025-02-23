import { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { ScoreContext } from "./ScoreContext"; 

function Initial() {
  const { setPlayers } = useContext(ScoreContext);  
  const playerOneRef = useRef();
  const playerTwoRef = useRef();

  const startTheGame = () => {
    const playerOne = playerOneRef.current.value;
    const playerTwo = playerTwoRef.current.value;

    const players = [playerOne, playerTwo];

    setPlayers(players);
    localStorage.setItem("players", JSON.stringify(players));
  };

  return (
    <div>
      <div className="enter-names">ENTER PLAYER NAMES</div>
      <label className="players">Player 1</label>
      <input className="name-input" ref={playerOneRef} type="text" /> <br /><br />
      <label className="players">Player 2</label>
      <input className="name-input" ref={playerTwoRef} type="text" /> <br /><br /> <br /><br />
      <Link to="/game"><button onClick={startTheGame}>Start the game</button></Link>
      <br /><br /> <br />
      <Link to="/scoreboard"><button>Scoreboard</button></Link>
    </div>
  );
}

export default Initial;
