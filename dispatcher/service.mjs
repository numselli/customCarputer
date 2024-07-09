import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({
  port: 8095
});

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const parsedData = JSON.parse(data)
    switch (parsedData.catagory){
      case "navi":{
        switch(parsedData.state){
          case "start":{
            // lower volume
          }break;
          case "stop":{
            // raise volume up
          }break;
        }
      }break;
      default:{
        console.log('received: %s', data);
      }
    }
  });

});


// can bus stuff



// serial


// AVIC-LAN