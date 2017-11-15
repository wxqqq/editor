import request from 'request'
import style from './style.js'
import ReconnectingWebSocket from 'reconnecting-websocket'

const host = 'localhost'
const port = '8000'
const localUrl = `http://${host}:${port}`
const websocketUrl = `ws://${host}:${port}/ws`


export class ApiStyleStore {
  constructor(opts) {
    this.onLocalStyleChange = opts.onLocalStyleChange || (() => {})
  }

  init(cb) {
    request(localUrl + '/styles', (error, response, body) => {
      if (!error && body && response.statusCode == 200) {
        const styleIds = JSON.parse(body)
        this.latestStyleId = styleIds[0]
        this.notifyLocalChanges()
        cb(null)
      } else {
        cb(new Error('Can not connect to style API'))
      }
    })
  }

  notifyLocalChanges() {
    const connection = new ReconnectingWebSocket(websocketUrl)
    connection.onmessage = e => {
      if(!e.data) return
      console.log('Received style update from API')
      let parsedStyle = style.emptyStyle
      try {
        parsedStyle = JSON.parse(e.data)
      } catch(err) {
        console.error(err)
      }
      const updatedStyle = style.ensureStyleValidity(parsedStyle)
      this.onLocalStyleChange(updatedStyle)
    }
  }

  latestStyle(cb) {
    if(this.latestStyleId) {
      request(localUrl + '/styles/' + this.latestStyleId, (error, response, body) => {
        cb(style.ensureStyleValidity(JSON.parse(body)))
      })
    } else {
      throw new Error('No latest style available. You need to init the api backend first.')
    }
  }

  // Save current style replacing previous version
  save(mapStyle) {
    const id = mapStyle.id
    request.put({
      url: localUrl + '/styles/' + id,
      json: true,
      body: mapStyle
    }, (error, response, body) => {
      if(error) console.error(error)
    })
    return mapStyle
  }
}
