/* eslint-disable no-console */
import JPEGJS from 'jpeg-js'
import PNGJS from 'pngjs'
import path from 'path'

function readFile (file) {
  return new Promise((resolve) => {
    let reader = new FileReader()
    reader.onload = async function (e) {
      resolve(e.target.result)
    }
    reader.readAsArrayBuffer(file)
  })
}

function parseJpg (arrayBuffer) {
  return new Promise(function (resolve, reject) {
    try {
      const byteArray = new Uint8Array(arrayBuffer)
      const data = JPEGJS.decode(byteArray, true)

      resolve({pixelData: data.data, width: data.width, height: data.height})
    } catch (err) {
      reject(err)
    }
  })
}

function parsePng (arrayBuffer) {
  return new Promise(function (resolve, reject) {
    const byteArray = new Uint8Array(arrayBuffer)
    new PNGJS.PNG({filterType: 4}).parse(byteArray, async function (error, data) {
      try {
        if (error != null)
          reject(error)

        resolve({pixelData: data.data, width: data.width, height: data.height})
      } catch (err) {
        reject(err)
      }
    })
  })
}


async function parseImage (file) {
  try {
    let res
    if (path.extname(file.name) == '.jpg') {
      const arrayBuffer = await readFile(file)
      res = await parseJpg(arrayBuffer)
    } else if(path.extname(file.name) == '.png') {
      const arrayBuffer = await readFile(file)
      res = await parsePng(arrayBuffer)
    } else {
      throw new Error('unsupported extension')
    }
    return res
  } catch (e) {
    throw e
  }
}

export default {
  parseImage,
  parsePng,
  parseJpg
}
