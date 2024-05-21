import { SerialPort } from "serialport";
import { exec } from "child_process";

const port = new SerialPort({
    path: '/dev/ttyUSB0',
    baudRate: 9600,
})

port.on('data', async(data) => {
    const readableData = data.toString()

    switch(readableData){
        case "playPause": {
            execCommand("playerctl play-pause")
        }
        break;
        case "volUP": {
            const volumeMuted = (await execCommand("pactl get-sink-mute @DEFAULT_SINK@")).includes("yes")
            
            if (volumeMuted){
                await execCommand("pactl set-sink-mute @DEFAULT_SINK@ 0")
                await execCommand("pactl set-sink-volume @DEFAULT_SINK@ 0")
            }

            execCommand("pactl set-sink-volume @DEFAULT_SINK@ +5%")
        }
        break;
        case "volDown": {
            await execCommand("pactl set-sink-volume @DEFAULT_SINK@ -5%")

            const volumeLevels = (await execCommand("pactl get-sink-volume @DEFAULT_SINK@"))
            const volumeLevelArray = volumeLevels.split("/")

            const leftVolume = volumeLevelArray[1].trim()
            const rightVolume = volumeLevelArray[3].trim()

            if (leftVolume === "0%" && rightVolume === "0%") await execCommand("pactl set-sink-mute @DEFAULT_SINK@ 1")
        }
        break;
        case "trackBack": {
            execCommand("playerctl previous")
        }
        break;
        case "trackNext": {
            execCommand("playerctl next")
        }
        break;
        default: {
            console.log(readableData)
        }
    }
})

function execCommand(command){
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(error)
                return;
            }
            if (stderr) {
                reject(stderr)
                return;
            }

            resolve(stdout)
        });
    });
}

// sudo pacman -S playerctl