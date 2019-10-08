import React, { useState } from 'react'
import './App.css'

import { Character } from './components/character'
import { Drag } from './components/drag'

const App: React.FC = () => {

  const [dragShow, setShowDrag] = useState(false)

  return (
    <div 
      className="App"
      onMouseEnter={() => setShowDrag(true)}
      onMouseLeave={() => setShowDrag(false)}
    >
      <Character></Character>
      { dragShow && <Drag></Drag> }
    </div>
  )

}

export default App