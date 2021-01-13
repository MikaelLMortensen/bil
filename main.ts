let leftSpeed = 0
let rightSpeed = 0
let speed = 0
let direction = 50

radio.setGroup(20)
basic.showArrow(ArrowNames.North)

function showSpeedInformation() {
    if (speed < 5) {
        basic.clearScreen()
        return
    }
    if (speed > 0) {
        if (direction < 15) {
            basic.showArrow(ArrowNames.SouthWest)
        } else if (direction >= 15 && direction < 30) {
            basic.showArrow(ArrowNames.West)
        } else if (direction >= 30 && direction < 45) {
            basic.showArrow(ArrowNames.NorthWest)
        } else if (direction >= 45 && direction < 55) {
            basic.showArrow(ArrowNames.North)
        } else if (direction >= 55 && direction < 70) {
            basic.showArrow(ArrowNames.NorthEast)
        } else if (direction >= 70 && direction < 85) {
            basic.showArrow(ArrowNames.East)
        } else if (direction >= 85) {
            basic.showArrow(ArrowNames.SouthEast)
        }
    } else {
        if (direction < 15) {
            basic.showArrow(ArrowNames.NorthEast)
        } else if (direction >= 15 && direction < 30) {
            basic.showArrow(ArrowNames.East)
        } else if (direction >= 30 && direction < 45) {
            basic.showArrow(ArrowNames.SouthEast)
        } else if (direction >= 45 && direction < 55) {
            basic.showArrow(ArrowNames.South)
        } else if (direction >= 55 && direction < 70) {
            basic.showArrow(ArrowNames.SouthWest)
        } else if (direction >= 70 && direction < 85) {
            basic.showArrow(ArrowNames.West)
        } else if (direction >= 85) {
            basic.showArrow(ArrowNames.NorthWest)
        }
    }
}

function setSpeed() {
    let speedLeft = speed
    let speedRight = speed
    if (speed == 0) {
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1)
        Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2)
        //showSpeedInformation()        
        return
    } 

    if (speed > 0) {
        if (direction > 50) {
            speedLeft = speed - (direction - 50)
        } else if (direction < 50) {
            speedRight = speed - (50 - direction)
        }
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, speedLeft)
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, speedRight)
    } else {
        speedLeft = speed * -1
        speedRight = speed * -1
        if (direction > 50) {
            speedRight = speedRight - (direction - 50)
        } else if (direction < 50) {
            speedLeft = speedLeft - direction
        }
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Reverse, speedLeft)
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Reverse, speedRight)
    }
    //showSpeedInformation()        
}

radio.onReceivedValue(function (name: string, value: number) {
  switch (name) {
      case "fw":
        speed = value
        setSpeed()
        if (speed > 0) {
            basic.showArrow(ArrowNames.North)
        } else {
            basic.showArrow(ArrowNames.South)
        }
      break;
      case "sp": 
        speed = value
        setSpeed()
      break;
      case "dir": 
        direction = value
        setSpeed()
      break;
      case "beep": 
        // music.builtInMelody(Melodies.BaDing)
        // music.stopAllSounds()
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
