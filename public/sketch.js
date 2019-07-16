var xspacing = 16                                        // Distance between each horizontal location
var w                                                    // Width of entire wave
var theta = 0.0                                          // Start angle at 0
var amplitude = Math.floor((Math.random() * 200) + 180)  // Height of wave
var target_amplitude = 0
var current_amplitude = 0
var period = 70.0                                        // How many pixels before the wave repeats
var dx                                                   // Value for incrementing x
var yvalues                                              // Using an array to store height values for the wave
var previous = pulse.previousVariance
var MAX_DELTA = 1

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight)
    myCanvas.parent('display')
  w = width+16
  dx = (TWO_PI / period) * xspacing
  yvalues = new Array(floor(w/xspacing))
  console.log(yvalues)
}

function draw() {
  background(39, 39, 39)
  target_amplitude = pulse.variance
  if (isNaN(current_amplitude)) {
    current_amplitude = target_amplitude
  } else if (target_amplitude < current_amplitude) {
    var delta = Math.min(MAX_DELTA, current_amplitude - target_amplitude)
    current_amplitude -= delta
  } else {
    current_amplitude += Math.min(MAX_DELTA, target_amplitude - current_amplitude)
  }
  period = pulse.bpm
  calcWave()
  renderWave()
}

function calcWave() {
  // Increment theta (try different values for 'angular velocity' here)
  theta += 0.02

  // For every x value, calculate a y value with sine function
  var x = theta
  for (var i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*current_amplitude
    x+=dx
  }
}

function renderWave() {
  noStroke()
  // draw the wave with an ellipse at each location
  for (var x = 0; x < yvalues.length; x++) {
    if (x % 2 === 0) {
      fill(105, 116, 124)
    } else if (x % 3 === 0){
      fill(203, 255, 77)
    } else {
      fill(107, 170, 117)
    }
    ellipse(x*xspacing, height/2+yvalues[x], 16, 16)
  }
}
