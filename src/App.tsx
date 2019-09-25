import React, { useState } from 'react'
import './App.css'

import { Character } from './components/character'
import { Drag } from './components/drag'

const App: React.FC = () => {

  const [drag, setDrag] = useState(false)

  return (
    <div 
      className="App"
      onMouseEnter={() => setDrag(true)}
      onMouseLeave={() => setDrag(false)}
    >
      <Character></Character>
      <Drag></Drag>
    </div>
  )

}

export default App