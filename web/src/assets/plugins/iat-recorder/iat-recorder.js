import CryptoJS from 'crypto-js'
import RecorderManager from '@/assets/plugins/iat-recorder/iat-recorder-manager.js'
const getIframeUrl = function (url) {
  let bserUrl = ''
  if (window._process) {
    const isProduction = window._process.env.NODE_ENV === 'production'
    if (window._process.env.VUE_APP_CONFIG) {
      bserUrl = isProduction ? JSON.parse(window._process.env.VUE_APP_CONFIG).baseDir + `/web/${url}` : `./${url}`
    } else {
      bserUrl = `./${url}`
    }
  } else {
    const isProduction = process.env.NODE_ENV === 'production'
    if (process.env.VUE_APP_CONFIG) {
      bserUrl = isProduction ? JSON.parse(process.env.VUE_APP_CONFIG).baseDir + `/web/${url}` : `./${url}`
    } else {
      bserUrl = `./${url}`
    }
  }
  return bserUrl
}

const recorderManagerPath = getIframeUrl('static/iat-recorder')

class IatRecorder {
  // 构造函数，用于初始化新创建的对象  
  constructor({ url, appId, apiSecret, apiKey, recordSuccess, recordError, recordStop, timeEnd }) {
    this.url = url

    this.appId = appId
    this.apiSecret = apiSecret
    this.apiKey = apiKey

    this.webSocketUrl = this.getWebSocketUrl()
    this.webSocketClient = null

    this.mediaRecorder = new RecorderManager(recorderManagerPath)
    this.initIatRecorder()

    this.convertText = ''
    this.resultText = ''
    this.resultTextTemp = ''

    this.recordSuccess = recordSuccess
    this.recordError = recordError
    this.recordStop = recordStop
    this.timeEnd = timeEnd

    this.seconds = 60
    this.countdownInterval = null
  }

  // 获取webSocket的url
  getWebSocketUrl () {
    // 请求地址根据语种不同变化
    const host = "iat-api.xfyun.cn"
    const apiKey = this.apiKey
    const apiSecret = this.apiSecret
    const date = new Date().toGMTString()
    const algorithm = "hmac-sha256"
    const headers = "host date request-line"
    const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`
    const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
    const signature = CryptoJS.enc.Base64.stringify(signatureSha)
    const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
    const authorization = btoa(authorizationOrigin)

    return `${this.url}?authorization=${authorization}&date=${date}&host=${host}`

  }

  openIatRecorder () {
    const that = this
    if (this.webSocketClient === null) {

      this.webSocketClient = new WebSocket(this.webSocketUrl)

      this.webSocketClient.onopen = function () {
        try {

          // 开始录音
          that.mediaRecorder.start({
            sampleRate: 16000,
            frameSize: 1280
          })

          that.countdown()

          var params = {
            common: {
              app_id: that.appId,
            },
            business: {
              language: "zh_cn",
              domain: "iat",
              accent: "mandarin",
              vad_eos: 5000,
              dwa: "wpgs"
            },
            data: {
              status: 0,
              format: "audio/L16;rate=16000",
              encoding: "raw",
            },
          }

          that.webSocketClient.send(JSON.stringify(params))

          that.recordSuccess && that.recordSuccess()
        } catch (error) {
          that.recordError && that.recordError(error)
        }
      }

      this.webSocketClient.onmessage = function (e) {
        that.renderResult(e.data)
      }

      this.webSocketClient.onerror = function (error) {
        that.closewebSocketClient()
        that.stopIatRecorder()

        that.recordError && that.recordError(error)
      }

      this.webSocketClient.onclose = function () {
        that.stopIatRecorder()

        that.recordStop && that.recordStop()
      }

    }
  }

  toBase64 (buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  initIatRecorder () {
    const that = this


    this.mediaRecorder.onFrameRecorded = function ({ isLastFrame, frameBuffer }) {
      if (that.webSocketClient && that.webSocketClient.readyState === WebSocket.OPEN) {

        that.webSocketClient.send(
          JSON.stringify({
            data: {
              status: isLastFrame ? 2 : 1,
              format: "audio/L16;rate=16000",
              encoding: "raw",
              audio: that.toBase64(frameBuffer),
            },
          })
        )

      }

    }

  }

  closewebSocketClient () {
    this.webSocketClient && this.webSocketClient.close()
  }

  stopIatRecorder () {
    this.mediaRecorder.stop()
    this.webSocketClient = null
    this.resultText = ''
    this.resultTextTemp = ''

    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
      this.countdownInterval = null
    }
  }

  renderResult (resultData) {
    // 识别结束
    let jsonData = JSON.parse(resultData);
    if (jsonData.data && jsonData.data.result) {
      let data = jsonData.data.result;
      let str = "";
      let ws = data.ws;
      for (let i = 0; i < ws.length; i++) {
        str = str + ws[i].cw[0].w;
      }
      // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
      // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
      if (data.pgs) {
        if (data.pgs === "apd") {
          // 将resultTextTemp同步给resultText
          this.resultText = this.resultTextTemp;
        }
        // 将结果存储在resultTextTemp中
        this.resultTextTemp = this.resultText + str;
      } else {
        this.resultText = this.resultText + str;
      }
      this.convertText = this.resultTextTemp || this.resultText || ""

    }
    if (jsonData.code === 0 && jsonData.data.status === 2) {
      this.webSocketClient.close()
    }
    if (jsonData.code !== 0) {
      this.webSocketClient.close()
    }
  }

  countdown () {
    const that = this
    this.seconds = 60
    this.countdownInterval = setInterval(() => {
      that.seconds = that.seconds - 1
      if (that.seconds <= 0) {

        clearInterval(that.countdownInterval)
        that.countdownInterval = null

        that.timeEnd && that.timeEnd()

        that.closewebSocketClient()
        that.stopIatRecorder()
      }
    }, 1000);
  }

}

export default IatRecorder