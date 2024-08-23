#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

/* Put your SSID & Password */
const char* ssid = "NodeMCU";  // Enter SSID here
const char* password = "12345678";  //Enter Password here

/* Put IP Address details */
IPAddress local_ip(192,168,1,1);
IPAddress gateway(192,168,1,1);
IPAddress subnet(255,255,255,0);

ESP8266WebServer server(80);

void setup() {
  Serial.begin(9600);

  WiFi.softAP(ssid, password);
  WiFi.softAPConfig(local_ip, gateway, subnet);
  delay(100);
  
  server.on("/", handle_OnConnect);
  server.onNotFound(handle_NotFound);

  server.on("/volup", handle_volup);
  server.on("/voldown", handle_voldown);
  server.on("/back", handle_back);
  server.on("/next", handle_next);
  server.on("/playPause", handle_playPause);

  server.on("/caroff", handle_caroff);
  server.on("/carpark", handle_carpark);
  server.on("/carreverse", handle_carreverse);

  // server.on("/playPause", handle_playPause);


  
  server.begin();
  Serial.println("HTTP server started");
}
void loop() {
  server.handleClient();
}

void handle_OnConnect() {
  server.send(200, "text/html", SendHTML()); 
}

void handle_volup() {
  Serial.println("1013-0");
  // server.send(200, "text/html", SendHTML()); 
}
void handle_voldown() {
  Serial.println("992-0");
  // server.send(200, "text/html", SendHTML()); 
}
void handle_back() {
  Serial.println("1019-0");
  // server.send(200, "text/html", SendHTML()); 
}
void handle_next() {
  Serial.println("1022-0");
  // server.send(200, "text/html", SendHTML()); 
}
void handle_playPause() {
  Serial.println("0-1022");
}
void handle_caroff() {
  Serial.println("caroff");
  // server.send(200, "text/html", SendHTML()); 
}
void handle_carpark() {
  Serial.println("park");
  // server.send(200, "text/html", SendHTML()); 
}
void handle_carreverse() {
  Serial.println("reverse");
  // server.send(200, "text/html", SendHTML()); 
}
void handle_NotFound(){
  server.send(404, "text/plain", "Not found");
}

String SendHTML(){
  String ptr = "<!DOCTYPE html> <html>\n";
  ptr +="<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, user-scalable=no\">\n";
  ptr +="<style>html {font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;} body{margin-top: 50px;} h1 {color: #444444;margin: 50px auto 30px;} h3 {color: #444444;margin-bottom: 50px;} .button {display: block;width: 80px;background-color: #1abc9c;border: none;color: white;padding: 13px 30px;text-decoration: none;font-size: 25px;margin: 0px auto 35px;cursor: pointer;border-radius: 4px;} .button-off {background-color: #34495e;} .button-off:active {background-color: #2c3e50;}</style>\n";
  ptr +="<script>async function send(a){return await fetch(`/${a}`)}</script>\n";
  ptr +="</head>\n";
  ptr +="<body>\n";

  ptr +="<a class=\"button button-off\" onClick=\"send('volup')\">VOL-UP</a>\n";
  ptr +="<a class=\"button button-off\" onClick=\"send('voldown')\">VOL-Down</a>\n";
  ptr +="<a class=\"button button-off\" onClick=\"send('back')\">Back</a>\n";
  ptr +="<a class=\"button button-off\" onClick=\"send('next')\">Next</a>\n";
  ptr +="<a class=\"button button-off\" onClick=\"send('playPause')\">playPause</a>\n";
  ptr +="<a class=\"button button-off\" onClick=\"send('caroff')\">car off</a>\n";
  ptr +="<a class=\"button button-off\" onClick=\"send('carpark')\">park</a>\n";
  ptr +="<a class=\"button button-off\" onClick=\"send('carreverse')\">reverse</a>\n";

  ptr +="</body>\n";
  ptr +="</html>\n";
  return ptr;
}