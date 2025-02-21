import './App.css'
import { Route, Routes } from 'react-router-dom'
import Initial from './pages/Initial'
import Game from './pages/Game'
import ScoreBoard from './pages/ScoreBoard'

function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" exact element={<Initial/>}/>
        <Route path="/game" exact element={<Game/>}/>
        <Route path="/scoreboard" exact element={<ScoreBoard/>}/>
      </Routes>
    </>
  )
}

export default App
