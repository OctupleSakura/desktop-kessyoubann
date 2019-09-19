import React, { useEffect } from 'react'
import './App.css'

declare const loadlive2d: any

const App: React.FC = () => {
  
  useEffect(() => {
    loadlive2d("live2d", '/model/model.json')
  }, [])

  return (
    <div className="App">
      <div className="waifu-tips"></div>
      <canvas id="live2d" width="280" height="250"></canvas>
    </div>
  )

}

export default App;