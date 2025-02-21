import { useRef } from "react"
import { Link } from "react-router-dom"

function Initial() {

    const playerOneRef = useRef()
    const playerTwoRef = useRef()

    const startTheGame = () => {
        const playerOne = playerOneRef.current.value
        const playerTwo = playerTwoRef.current.value

        const players = [playerOne, playerTwo];

        localStorage.setItem("players", JSON.stringify(players))
    }

  return (
    <div>
        <label>Player 1</label>
        <input ref={playerOneRef} type="text" /> <br /><br />
        <label>Player 2</label>
        <input ref={playerTwoRef} type="text" /> <br /><br />
        <Link to="/game"><button onClick={startTheGame}>Start the game</button></Link>
    </div>
  )
}

export default Initial