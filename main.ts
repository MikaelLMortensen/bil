let leftSpeed = 0
let rightSpeed = 0

radio.setGroup(20)
basic.showIcon(IconNames.Tortoise)

radio.onReceivedValue(function (name: string, value: number) {
  switch (name) {
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
