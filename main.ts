input.onButtonPressed(Button.AB, function () {
    leftSpeed = 0
    rightSpeed = 0
    setSpeed()

    if (direction== directions.forward){
        direction = directions.reverse
        basic.showArrow(ArrowNames.South)
    } else {
        direction = directions.forward
        basic.showArrow(ArrowNames.North)
    }
})

input.onButtonPressed(Button.A, function () {
    setLeftSpeed()
})

function setLeftSpeed() {
    if (leftSpeed >= 100)
    {
        leftUp = false
    }
 
    if (leftSpeed <= 0)
    {
        leftUp = true
    }
 
    if (leftUp)
    {
        leftSpeed = leftSpeed + 10
    } else {
        leftSpeed = leftSpeed - 10
    }
    setSpeed()
}

input.onButtonPressed(Button.B, function () {
    setRightSpeed()
})

function setRightSpeed() {
    if (rightSpeed >= 100)
    {
        rightUp = false
    }
 
    if (rightSpeed <= 0)
    {
        rightUp = true
    }
 
    if (rightUp)
    {
        rightSpeed = rightSpeed + 10
    } else {
        rightSpeed = rightSpeed - 10
    }
    setSpeed()
}

radio.onReceivedValue(function (name: string, value: number) {
    switch (name) {
        case "left":
           leftSpeed = value
           break;
        case "right":
           rightSpeed = value
           break;
        case "both":
           leftSpeed = value
           rightSpeed = value
            break;
        case "direction":
            if (value == directions.reverse){
                direction = directions.reverse
            } else {
                direction = directions.forward
            }
            break;
    }
    setSpeed()
})

function setSpeed () {
    if (direction == directions.forward){
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, leftSpeed)
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, rightSpeed)
        if (leftSpeed > rightSpeed){
            basic.showArrow(ArrowNames.NorthEast)
        } else if (rightSpeed > leftSpeed){
            basic.showArrow(ArrowNames.NorthWest)
        } else {
            basic.showArrow(ArrowNames.North)
        }
    } else {
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Reverse, leftSpeed)
        Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Reverse, rightSpeed)
        if (leftSpeed > rightSpeed){
            basic.showArrow(ArrowNames.SouthEast)
        } else if (rightSpeed > leftSpeed){
            basic.showArrow(ArrowNames.SouthWest)
        } else {
            basic.showArrow(ArrowNames.South)
        }
    }

    if (rightSpeed== 0 && leftSpeed == 0)
    {
        basic.clearScreen()
    }
}
let rightSpeed = 0
let leftSpeed = 0
let leftUp = true
let rightUp = true
radio.setGroup(1)

let directions = {"forward":1, "reverse":0}
let direction = directions.forward
basic.showArrow(ArrowNames.North)

basic.forever(function () {
	
})
