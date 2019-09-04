/* eslint-disable no-console */
import JPEGJS from 'jpeg-js'
import PNGJS from 'pngjs'
import path from 'path'

function parseJpg (file) {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader()
    reader.onload = async function (e) {
      try {
        const byteArray = new Uint8Array(e.target.result)
        const data = JPEGJS.decode(byteArray, true)

        resolve({pixelData: data.data, width: data.width, height: data.height})
      } catch (err) {
        reject(err)
      }
    }
    reader.readAsArrayBuffer(file)
  })
}

function parsePng (file) {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader()
    reader.onload = function (e) {
      const byteArray = new Uint8Array(e.target.result)
      new PNGJS.PNG({filterType: 4}).parse(byteArray, async function (error, data) {
        try {
          if (error != null)
            reject(error)

          resolve({pixelData: data.data, width: data.width, height: data.height})
        } catch (err) {
          reject(err)
        }
      })
    }
    reader.readAsArrayBuffer(file)
  })
}


async function parseImage (file) {
  try {
    let res
    if (path.extname(file.name) == '.jpg') {
      res = await parseJpg(file)
    } else if(path.extname(file.name) == '.png') {
      res = await parsePng(file)
    } else {
      throw new Error('unsupported extension')
    }
    return res
  } catch (e) {
    throw e
  }
}

export default {
  parseImage
}
