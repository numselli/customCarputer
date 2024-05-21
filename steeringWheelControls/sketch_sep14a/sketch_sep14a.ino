void setup(){
  Serial.begin(9600);
}

int averagePinResponce(int pin){
  int reading = 0;
  int count = 10;
  for (int index = 0; index < count; index++) {
    reading += analogRead(pin);
  }

  return (reading/count);
}

void loop(){
  int btnOneReading = averagePinResponce(A6);
  int btnTwoReading = averagePinResponce(A5);
  handleVolumeAndTrack(btnOneReading);
  handlePlayPause(btnTwoReading);

  delay(200);
}

void handlePlayPause(int reading){
  if (reading >= 509 && reading <= 517){
    return;
  }

  if (reading >= 1022 && reading <= 1024){
    Serial.print("playPause");
  } else {
    Serial.print("unknowen handlePlayPause: "+ String(reading));
  }
}

void handleVolumeAndTrack(int reading){
  if (reading >= 509 && reading <= 517){
    return;
  }
  
  if (reading >= 1013 && reading <= 1014) {
    Serial.print("volUP");
  } else if (reading >= 992 && reading <= 994) {
    Serial.print("volDown");
  } else if (reading >= 1019 && reading <= 1020) {
    Serial.print("trackBack");
  } else if (reading >= 1022 && reading <= 1023) {
    Serial.print("trackNext"); 
  } else {
    Serial.print("unknowen handleVolumeAndTrack: "+ String(reading)); 
  }
}