let leftSpeed = 0    // left motor speed,    values: 0 - 100
let rightSpeed = 0   // right motor speed,   values: 0 - 100
// Input Variables
let speed = 0        // speed setting,     values: 0 - 100
let heading = 100    // heading setting  values: -100 - 100
let forward = true      // forward / reverse flag, values false: reverse / true:forward

radio.setGroup(20)
basic.showArrow(ArrowNames.North)

function setSpeed() {
    let speedLeft = speed
    let speedRight = speed
    if (speed < 5) {
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1)
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2)
        basic.clearScreen()
        return
    } 
    
    if (heading > 0) {
        // Turning right, right motor is slowing down
        // Eks:
        // speed = 75
        // heading = 10
        // speedRight = 75 - Math.floor(75 * (10 / 100))
        // speedRight = 75 - 7 == 68
        speedRight = speed - Math.floor(speed * (heading / 100)) 
    } else {
        // Turning left, left motor is slowing down
        // Eks:
        // speed = 75
        // heading = -20
        // speedLeft = 75 - Math.floor(75 * (20 * -1 / 100))
        // 60 = 75 - 15
        speedLeft = speed - Math.floor(speed * (heading * -1 / 100)) 
    }
    
    if (forward) {
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, speedLeft)
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, speedRight)
    } else { 
        // reverse
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Reverse, speedRight)
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Reverse, speedLeft)
    }
}

radio.onReceivedValue(function (name: string, value: number) {
  switch (name) {
      case "fw":
        if (value > 0) {
            forward = true
            basic.showArrow(ArrowNames.North)
        } else {
            forward = false
            basic.showArrow(ArrowNames.South)
        }
      break;
      case "info": 
        basic.showString("s:" + speed + " h:" + heading)
        if (forward){
            basic.showArrow(ArrowNames.North)
        } else {
            basic.showArrow(ArrowNames.South)
        }
      break;
      case "sp": 
        speed = value
        setSpeed()
      break;
      case "hd": 
        heading = value
        setSpeed()
      break;
      case "ls": 
        leftSpeed = value
        if (value == 0) {
            Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1)
        } 
        else if (value > 0) {
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, value)
        } else {
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Reverse, value*-1)
        }
        showSpeedInfo()
      break;
      case "rs":
        rightSpeed = value
        if (value == 0) {
            Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2)
        } 
        else if (value > 0) {
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, value)
        } else {
            Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Reverse, value*-1)
        }
        showSpeedInfo()
      break;
      default : {
          basic.showString("E:" + name +  ": " + value.toString())
      }
      showSpeedInfo()
  }
})


function showSpeedInfo(){

    if (leftSpeed == 0 && rightSpeed == 0) {
        basic.clearScreen()
        return
    }

    if (leftSpeed > 0 && rightSpeed > 0) {
        basic.plotLeds(`
        . # . # .
        # # # # #
        . . . . .
        . . . . .
        . . . . .
        `) 
    } else  if (leftSpeed < 0 && rightSpeed < 0) {
        basic.plotLeds(`
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        . # . # .
        `) 
    } else if (leftSpeed > 0 && rightSpeed < 0) {
        basic.plotLeds(`
        . # . . .
        # # # . .
        . . . . .
        . . # # #
        . . . # .
        `) 
    } else {
        basic.plotLeds(`
        . . . # .
        . . # # #
        . . . . .
        # # # . .
        . # . . .
        `) 
    }
}


basic.forever(function () {
	
})
