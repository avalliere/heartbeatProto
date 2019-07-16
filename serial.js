let varianceArray = []
let avg = 0
let ibiArray = []

const processPulse = (line) => {
  let variance = calculateVariance(ibiArray)


  const l = line.split(',')
  // to parse the line like this ["0", "120"]
  let obj = {}
      obj.bpm = parseInt(l[0])
      obj.pulse = parseInt(l[1])
      obj.ibi = parseInt(l[2])
      obj.previousVariance = varianceArray[0]
      obj.variance = variance

  // ibiArray = [900, 992, 1000] = intervals between beats
  if (obj.ibi !== ibiArray[ibiArray.length - 1] && (typeof obj.ibi === 'number') && isNaN(obj.ibi) !== true) {
    ibiArray.push(obj.ibi)
    if (ibiArray.length > 10) {
      ibiArray.shift()
      obj.variance = calculateVariance(ibiArray)
      varianceArray.push(obj.variance)
        if (varianceArray.length > 2) {
          varianceArray.shift()
        }
    }
  }
  return obj
}

const calculateVariance = (nums) => {
  let total = 0
  let avg = 0
  let allDiffs= []
  // totalling numbers so they can be averaged
  for(let i = 0; i < nums.length; i++) {
    total += nums[i]
  }

  avg = total / nums.length
  // how much the numbers differ from the average to get variance
  for(let i = 0; i < nums.length; i++) {
    let diff = Math.abs(nums[i] - avg)
    allDiffs.push(diff)
  }

  let diffTotal = 0
  for(let i = 0; i < allDiffs.length; i++) {
    diffTotal += allDiffs[i]
  }

  let variance = diffTotal / allDiffs.length
  return variance
}

module.exports = { processPulse }