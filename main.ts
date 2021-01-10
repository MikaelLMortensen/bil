/*
    lf : Left Forward - Boolean
    rf : Right Forward - Boolean
    ls : Left Speed (0 - 1023)
    rs : Right Speed (0 - 1023)
*/
let speedStruct = { lf : true, rf:true, ls:0, rs:0 }
radio.setGroup(20)

radio.onReceivedString(function (receivedString: string) {
    if (receivedString.indexOf("{") == 0 && receivedString.indexOf("}") == receivedString.length - 1) {
        speedStruct = JSON.parse(receivedString)

        let leftSpeed = Math.floor(speedStruct.ls / 100) 
        if (leftSpeed>100){
            leftSpeed = 100
        } else if (leftSpeed < 5) {
            leftSpeed = 0
        }

        let rightSpeed = Math.floor(speedStruct.rs / 100) 
        if (rightSpeed>100){
            rightSpeed = 100
        } else if (rightSpeed < 5) {
            rightSpeed = 0
        }

        if (speedStruct.lf) {
            if (leftSpeed > 0) {
                Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, leftSpeed)
            } else {
                Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1)
            }
        } else {
            if (leftSpeed > 0) {
                Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Reverse, leftSpeed)
            } else {
                Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor1)
            }
        }
        if (speedStruct.rf) {
            if (rightSpeed > 0) {
                Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, rightSpeed)
            } else {
                Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2)
            }
        } else {
            if (rightSpeed > 0) {
                Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Reverse, rightSpeed)
            } else {
                Kitronik_Robotics_Board.motorOff(Kitronik_Robotics_Board.Motors.Motor2)
            }
        }
    } else {
        basic.showString(receivedString)
    }
})



basic.forever(function () {
	
})
