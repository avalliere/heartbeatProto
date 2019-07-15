let ibiArray = []
let variance
let varianceArray = []
let avg = 0;
const processPulse = (line) => {


  const l = line.split(',')
  // ["0", "120"]
  var obj = {}
      obj.bpm = parseInt(l[0])
      obj.pulse = parseInt(l[1])
      obj.ibi = parseInt(l[2])
      // not sending anything to varianceArray before using it
      obj.previousVariance = varianceArray[0]
      obj.variance = variance

  // HRV
  // ibiArray = [900, 992, 1000]
  if (obj.ibi !== ibiArray[ibiArray.length - 1] && (typeof obj.ibi === 'number') && isNaN(obj.ibi) !== true) {
    ibiArray.push(obj.ibi)
    if (ibiArray.length > 10) {
      ibiArray.shift()
      obj.variance = calculateVariance(ibiArray);
      varianceArray.push(obj.variance);
        if (varianceArray.length > 2) {
          varianceArray.shift()
        }
    }
  }


  
  console.log('OBJ->', obj);

  return obj
}

const calculateVariance = (nums) => {
  let diff = 0;
  // process var
  let total = 0;


  let avgIBI = calculateAverageIBI(nums)
    // .then({
    //   ???
    // })
    let variance = calculateIBIDiffFromAvg(nums, avgIBI)
    console.log('VARIANCE', variance)
    return variance
}

const calculateIBIDiffFromAvg = (nums, avgIBI) => {
  let allDiffs =[]
    // getting difference from average and pushing to allDiffs array
    for(let i = 0; i < nums.length; i++) {
      let diff = Math.abs(nums[i] - avg);
      allDiffs.push(diff);
    }
  // adding up the diffs for a cumulative diff total 
  // let diffTotal = 0;
  // for(let i = 0; i < allDiffs.length; i++) {
  //   diffTotal += allDiffs[i];
  // }


    // let allDiffs.push(diff)
    // let allDiffs = nums.map(num => avgIBI - num) 

    let reduceDiffs = ( (accumulator, currentValue) => {
      return accumulator + currentValue
    })
    let totalDiff = allDiffs.reduce(reduceDiffs,0)
    return avgDiff = totalDiff / allDiffs.length
}

const calculateAverageIBI = (nums) => {
  let reduceIBI = ( (accumulator, currentValue) => {
    return accumulator + currentValue
  })
  let totalIBI = nums.reduce(reduceIBI,0)
  return avgIBI = totalIBI / nums.length
}


module.exports = { processPulse }