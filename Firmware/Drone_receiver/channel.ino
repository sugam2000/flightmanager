Servo channel_1;
Servo channel_2;
Servo channel_3;
Servo channel_4;

void init_channel(int channel_1_pin,int channel_2_pin,int channel_3_pin,int channel_4_pin){

  ESP32PWM::allocateTimer(0);
	ESP32PWM::allocateTimer(1);
	ESP32PWM::allocateTimer(2);
	ESP32PWM::allocateTimer(3);
	
	channel_1.setPeriodHertz(50); 
	channel_2.setPeriodHertz(50);
  channel_3.setPeriodHertz(50);
  channel_4.setPeriodHertz(50);

  channel_1.attach(channel_1_pin);
  channel_2.attach(channel_1_pin);
  channel_3.attach(channel_1_pin);
  channel_4.attach(channel_1_pin);


}

void set_channel(int channel_1_data,int channel_2_data,int channel_3_data,int channel_4_data){
    
    int channel_1_value = map(channel_1_data,75,225,1000,2000);
    int channel_2_value = map(channel_2_data,75,225,1000,2000);
    int channel_3_value = map(channel_3_data,75,225,1000,2000);
    int channel_4_value = map(channel_4_data,75,225,1000,2000);

    channel_1.writeMicroseconds(channel_1_value);
    channel_2.writeMicroseconds(channel_2_value);
    channel_3.writeMicroseconds(channel_3_value);
    channel_4.writeMicroseconds(channel_4_value);

    Serial.print("channel 1:");
    Serial.print(channel_1_value);
    Serial.print("channel 2:");
    Serial.print(channel_2_value);
    Serial.print("channel 3:");
    Serial.print(channel_3_value);
    Serial.print("channel 4:");
    Serial.println(channel_4_value);   
}