const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow

//用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区 ，通常被添加到一个 context menu 上.
const Menu = electron.Menu
const Tray = electron.Tray

let appTray = null

function createWindow() {
  mainWindow = new BrowserWindow({ 
    width: 350, 
    height: 380,
    frame: false,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    transparent: true, 
  })

  // 隐藏任务栏图标
  mainWindow.setSkipTaskbar(true)

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

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
