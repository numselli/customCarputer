import * as can from "socketcan";

const channel = can.createRawChannel("can0", true);

const IDs = new Map()
IDs.set(288, {
    id: 288,
    lastData: ""
})

channel.addListener("onMessage", function (msg) { 
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

        }break
    }
}

// channel.addListener("onMessage", channel.send, channel);

channel.start();
