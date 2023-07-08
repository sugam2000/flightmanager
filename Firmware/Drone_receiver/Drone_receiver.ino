#include <WiFi.h>
#include <WiFiUdp.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>

const char* ssid = "your network ssid";
const char* password = "password";
const unsigned int localUdpPort = 5000; // UDP port to listen on
const size_t maxJsonSize = 1024; // Maximum size of JSON buffer

WiFiUDP udp;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  Serial.print("Local IP: ");
  Serial.println(WiFi.localIP());

  udp.begin(localUdpPort);
  Serial.print("UDP listening on port ");
  Serial.println(localUdpPort);

  init_channel(5,18,19,21);

  // Create a task for receiving JSON data
  xTaskCreatePinnedToCore(
    receiveDataTask,
    "ReceiveDataTask",
    10000,
    NULL,
    0,
    NULL,
    0
  );

  // Create a task for sending JSON data
  xTaskCreatePinnedToCore(
    sendDataTask,
    "SendDataTask",
    10000,
    NULL,
    1,
    NULL,
    1
  );
}

void loop() {
  
}

void receiveDataTask(void* parameter) {
  char packetBuffer[100];
  StaticJsonDocument<maxJsonSize> jsonDocument;

  while (true) {
    int packetSize = udp.parsePacket();
    if (packetSize) {
      int bytesRead = udp.read(packetBuffer, sizeof(packetBuffer) - 1);
      if (bytesRead > 0) {
        packetBuffer[bytesRead] = '\0';
        //Serial.print("Received packet: ");
        //Serial.println(packetBuffer);

        DeserializationError error = deserializeJson(jsonDocument, packetBuffer);
        if (error) {
          Serial.print("Failed to parse JSON: ");
          Serial.println(error.c_str());
        }

        int channel_1_data = jsonDocument["channel_1"];
        int channel_2_data = jsonDocument["channel_2"];
        int channel_3_data = jsonDocument["channel_3"];
        int channel_4_data = jsonDocument["channel_4"]; 

        set_channel(channel_1_data,channel_2_data,channel_3_data,channel_4_data);
      }
    }
    vTaskDelay(20);
  }
}

void sendDataTask(void* parameter) {
  StaticJsonDocument<maxJsonSize> jsonDocument;

  while (true) {
    // Create JSON data to send
    jsonDocument.clear();
    jsonDocument["altitude"] = 50;
    jsonDocument["signal"] = WiFi.RSSI();
    jsonDocument["battery"] = 80;
    jsonDocument["latitude"] = 79.9;
    jsonDocument["longitude"] = 18.55;

    // Serialize JSON data
    char buffer[maxJsonSize];
    size_t serializedSize = serializeJson(jsonDocument, buffer);

    // Send JSON data
    udp.beginPacket(udp.remoteIP(), localUdpPort); // Replace with the receiver's IP address
    udp.write((uint8_t*)buffer, serializedSize);
    udp.endPacket();

    //Serial.println("Sent JSON data");

    vTaskDelay(20); // Send data every 20 milliseconds
  }
}

