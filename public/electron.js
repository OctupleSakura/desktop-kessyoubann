const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const isDev = require('electron-is-dev')
const { ipcMain } = require('electron')

let mainWindow

//用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
const Menu = electron.Menu
const Tray = electron.Tray

let appTray = null

function createWindow() {

  mainWindow = new BrowserWindow({ // 创建窗体
    width: 350, 
    height: 380,
    frame: false,
    hasShadow: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    transparent: true, 
    alwaysOnTop: true, // 显示在最前面
    webPreferences: { // require error
      nodeIntegration: true
    }
  })

  ipcMain.on('windowMoving', (e, {mouseX, mouseY}) => {
    const { x, y } = electron.screen.getCursorScreenPoint()
    mainWindow.setPosition(x - mouseX, y - mouseY)
  })
  
  ipcMain.on('windowMoved', () => {
    // Do somehting when dragging stop
  })

  // 隐藏任务栏图标
  mainWindow.setSkipTaskbar(true)

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  // 测试环境打开开发者工具
  isDev && mainWindow.webContents.openDevTools({ mode: "detach" })

  //app.ico是app目录下的ico文件
  appTray = new Tray(path.join(__dirname, 'kessyoubann.ico'))
  //图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'exit',
      click: () => {
        app.quit()
      }
    }
  ])
  appTray.setToolTip('kessyoubann')
  appTray.setContextMenu(contextMenu)
  
  // 监听关闭事件，如果有的话则清空
  mainWindow.on('closed', () => (mainWindow = null))

}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
