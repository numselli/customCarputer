import * as can from "socketcan";

const channel = can.createRawChannel("can0", true);

const IDs = new Map()
// drive mode
IDs.set(288, {
    lastData: "" 
})
// brake position
IDs.set(48, {
    lastData: ""
})
// hv SOC
IDs.set(971, {
    lastData: ""
})
// evmode actave
IDs.set(1321, {
    lastData: ""
})
// tank level
IDs.set(1444, {
    lastData: ""
})
// kmph
IDs.set(970, {
    lastData: ""
})
// Throttle postion
IDs.set(580, {
    lastData: ""
})

// 1480 cuse controll actave
channel.addListener("onMessage", function (msg) {
    let json = JSON.stringify(msg.data);
    let buginal = JSON.parse(json).data
    
    // if (msg.id === 1389) return console.log(buginal)
    if (IDs.has(msg.id)){
        const id = IDs.get(msg.id)

        let json = JSON.stringify(msg.data);
        let bufferOriginal = JSON.parse(json).data

        if (id.lastData !== bufferOriginal.join()){
            id.lastData=bufferOriginal.join()
            IDs.set(msg.id, id)

            msg.bufferOriginal = bufferOriginal
            changedData(msg)
        }
    }
});

function changedData(msg){
    switch(msg.id){
        case 288:{
            switch (msg.bufferOriginal[msg.bufferOriginal.length-1]){
                case 77:{
                    console.log("car in park")
                }break;
                case 80:{
                    console.log("car in drive")   
                }break;
                case 79:{
                    console.log("car in nutural")   
                }break;
                case 78:{
                    console.log("car in reverse")   
                }break;
                case 81:{
                    console.log("car in 'B'")   
                }break;
            }

        }break;
        // case 48:{
        //     console.log(`Brake Pedal Position: ${((msg.bufferOriginal[4]/127)*100).toFixed(2)}%`)
        // }break;
        case 971: {
            console.log(`HV SOC: ${msg.bufferOriginal[6]}%`)
        }break;
        case 1321: {
            console.log(msg.bufferOriginal[4] === 0 ? "evmode off" : "evmode on")
        }break;
        case 1444: {
            console.log(`gas tank: ${((msg.bufferOriginal[1]/44)*100).toFixed(2)}%`)
        }break;
        case 970: {
            console.log(`${msg.bufferOriginal[2]}KM/h`)   
        }break;
        case 580: {
            console.log(`Throttle Pedal Position: ${((msg.bufferOriginal[6]/200)*100).toFixed(2)}%`)
        }break;
    }
}

// channel.addListener("onMessage", channel.send, channel);

channel.start();
