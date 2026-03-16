import { WebSocketServer } from 'ws'
import { SerialPort } from "serialport";
import { DelimiterParser } from "@serialport/parser-delimiter"
import { exec } from "child_process";

const wss = new WebSocketServer({
  port: 8095
});

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const parsedData = JSON.parse(data)
    switch (parsedData.catagory) {
      case "navi": {
        switch (parsedData.state) {
          case "start": {
            execCommand("playerctl pause")
          } break;
          case "stop": {
            execCommand("playerctl play")
          } break;
        }
      } break;
      default: {
        console.log('received: %s', data);
      }
    }
  });

});

function genPercentRange(input, target){
  const percent = 0.1;
  
  const percentFactor = (percent/100)*target
  const min = Math.floor(target-percentFactor)
  const max = Math.ceil(target+percentFactor)

  return input >= min && input <= max
}

// serial
// steeringWheelControls
const port = new SerialPort({
  path: '/dev/ttyUSB0',
  baudRate: 9600,
})
const parser = port.pipe(new DelimiterParser({ delimiter: '\n' }))

parser.on('data', async (data) => {
  const moddedData = data.toString().replace(/\r\n/g, "")

  if (moddedData.includes("-")) {
    const readings = moddedData.split("-")

    const sw0 = Number(readings[0])
    const sw1 = Number(readings[1])

    if (genPercentRange(sw0, 930)) {
      const volumeMuted = (await execCommand("pactl get-sink-mute @DEFAULT_SINK@")).includes("yes")

      if (volumeMuted) {
        await execCommand("pactl set-sink-mute @DEFAULT_SINK@ 0")
        await execCommand("pactl set-sink-volume @DEFAULT_SINK@ 0")
      }

      execCommand("pactl set-sink-volume @DEFAULT_SINK@ +5%")
    } else if (genPercentRange(sw0, 780)) {
      await execCommand("pactl set-sink-volume @DEFAULT_SINK@ -5%")

      const volumeLevels = (await execCommand("pactl get-sink-volume @DEFAULT_SINK@"))
      const volumeLevelArray = volumeLevels.split("/")

      const leftVolume = volumeLevelArray[1].trim()
      const rightVolume = volumeLevelArray[3].trim()

      if (leftVolume === "0%" && rightVolume === "0%") await execCommand("pactl set-sink-mute @DEFAULT_SINK@ 1")
    } else if (genPercentRange(sw0, 990)) {
      execCommand("playerctl previous")
    } else if (genPercentRange(sw0, 1022)) {
      execCommand("playerctl next")
    } else {
      console.log(`err btnOneReading: ${sw0}`)
    }

    if (genPercentRange(sw1, 1022)) {
      execCommand("playerctl play-pause")
    } else {
      console.log(`err btnTwoReading: ${sw1}`)
    }
  }
})

// util functions
function execCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(error ? error : stderr)
        return;
      }

      resolve(stdout)
    });
  });
}
