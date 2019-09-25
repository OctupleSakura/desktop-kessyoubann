import React, { useEffect } from 'react'
import style from './index.module.sass'

declare const loadlive2d: any

export function Character() {

  useEffect(() => {
    try {
      loadlive2d("live2d", './model/model.json')
    } catch (e) {
      alert(e)
    }
  }, [])


  return (
    <div>
      <div className="waifu-tips"></div>
      <canvas 
        id="live2d" 
        width="280" 
        height="250"
        className="canvas"
      />
    </div>
  )
}