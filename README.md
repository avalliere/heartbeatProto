# heartbeatProto

## Setup
The `arduinoPulse.ino` file will need to be uploaded to your Arduino through the Arduino IDE, then the node project runs separately.

In `app.js`, you will have to change the hard-coded value of the port your Arduino is connected to. You can get the name of this port from the Arduino IDE setup.


## To Run
In your terminal, from the project root folder, run `npm install`

When that successfully completes, run `node app.js`

Navigating to http://localhost:8081/ in your browser will show your visualization.
