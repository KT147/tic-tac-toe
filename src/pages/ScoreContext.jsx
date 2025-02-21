import { createContext } from "react"
import PropTypes from "prop-types"


export const ScoreContext = createContext()

export const ScoreContextProvider = ({children}) => {

    const storedPlayers = JSON.parse(localStorage.getItem("players")) || []

    return (
        <ScoreContext.Provider value={{ storedPlayers }}>
            {children}
        </ScoreContext.Provider>
    )
}

ScoreContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }
