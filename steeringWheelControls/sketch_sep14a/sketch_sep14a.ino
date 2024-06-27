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

  if ((btnOneReading >= 501 && btnOneReading <= 521) || (btnTwoReading >= 501 && btnTwoReading <= 521)) {
    return;
  }

  Serial.println(String(btnOneReading)+"-"+String(btnTwoReading));

  delay(200);
}
