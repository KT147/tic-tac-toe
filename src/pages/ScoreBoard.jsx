import { Link } from "react-router-dom"

function ScoreBoard() {

    const storedScorePlayerOne = JSON.parse(localStorage.getItem("scorePlayerOne")) || 0
    const storedScorePlayerTwo = JSON.parse(localStorage.getItem("scorePlayerTwo")) || 0

    const storedPlayers = JSON.parse(localStorage.getItem("players")) || []

    const playerOne = storedPlayers[0]
    const playerTwo = storedPlayers[1]

  return (
    <div>
        <Link to="/game"><button>Back</button></Link>
        <div>Scores:</div>
        <div>{playerOne} {storedScorePlayerOne}</div>
        <div>{playerTwo} {storedScorePlayerTwo}</div>
    </div>
  )
}

export default ScoreBoard