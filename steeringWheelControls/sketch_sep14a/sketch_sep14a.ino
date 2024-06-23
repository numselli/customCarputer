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

  Serial.print("btnOneReading:"+String(btnOneReading))
  Serial.print("btnTwoReading:"+String(btnTwoReading))

  delay(200);
}
