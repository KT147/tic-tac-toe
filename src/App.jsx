import './App.css'
import { Route, Routes } from 'react-router-dom'
import Initial from './pages/Initial'
import Game from './pages/Game'
import ScoreBoard from './pages/ScoreBoard'
import { ScoreContextProvider } from './pages/ScoreContext'
import ContinueGame from './pages/ContinueGame'

function App() {
 

  return (
    <>
      <img className='head-picture' src="/head-pic.png" alt="" />
      <ScoreContextProvider> 
        <Routes>
          <Route path="/" exact element={<Initial/>}/>
          <Route path="/game" exact element={<Game/>}/>
          <Route path="/game-continue/:index" exact element={<ContinueGame/>}/>
          <Route path="/scoreboard" exact element={<ScoreBoard/>}/>
        </Routes>
      </ScoreContextProvider>
    </>
  )
}

export default App
