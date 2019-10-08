import React, { MouseEvent } from 'react'
import style from './index.module.scss'
import { PanTool } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'

const { ipcRenderer } = window.require('electron')

let animationId: any

export function Drag() {

  function onMouseUp(e: Event) {
    ipcRenderer.send('windowMoved')
    document.removeEventListener('mouseup', onMouseUp)
    cancelAnimationFrame(animationId)
  }

  function dragMouseDown(e: MouseEvent) {
    const mouseX = e.clientX
    const mouseY = e.clientY
    document.addEventListener('mouseup', onMouseUp)
    dragMoveWindow()

    function dragMoveWindow() {
      ipcRenderer.send('windowMoving', { mouseX, mouseY })
      animationId = requestAnimationFrame(dragMoveWindow)
    }
  }

  return (
    <div 
      className={style['drag']}
      onMouseDown={(e) => dragMouseDown(e)}
    >
      <IconButton 
        aria-label="pan-tool" 
        size="small"
      >
        <PanTool />
      </IconButton>
    </div>
  )
}