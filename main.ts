input.onButtonPressed(Button.AB, function () {
    leftSpeed = 0
    rightSpeed = 0
    setSpeed()
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
    }
    setSpeed()
})

function setSpeed () {
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, leftSpeed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, rightSpeed)
    if (leftSpeed > rightSpeed){
        basic.showArrow(ArrowNames.East)
    } else if (rightSpeed > leftSpeed){
        basic.showArrow(ArrowNames.West)
    } else {
        basic.showArrow(ArrowNames.North)
    }
}
let rightSpeed = 0
let leftSpeed = 0
let leftUp = true
let rightUp = true
basic.forever(function () {
	
})
