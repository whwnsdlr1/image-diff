function calcPsnrRgba (pixelArray1, pixelArray2) {
  let acc = 0
  for (let np = 0; np < pixelArray1.length; np += 4) {
    const p1 = np
    const p2 = p1 + 1
    const p3 = p1 + 2
    const val1 = Math.abs(pixelArray1[p1] - pixelArray2[p1])
    const val2 = Math.abs(pixelArray1[p2] - pixelArray2[p2])
    const val3 = Math.abs(pixelArray1[p3] - pixelArray2[p3])
    acc += val1 * val1 + val2 * val2 + val3 * val3
  }
  if (acc <= 1e-10) return NaN
  else {
    const mse = acc / pixelArray1.length / 4
    const psnr = 10 * Math.log10(255 * 255 / mse)
    return psnr
  }
}

export default {
  calcPsnrRgba
}