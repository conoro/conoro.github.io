#"Our first Arduino Christmas Turkey"

Take one turkey, an oven with the temperature markings rubbed-off, a food thermometer with a broken probe and you have a recipe for either incineration or salmonella.

Enter an <a href="http://store.arduino.cc/index.php?main_page=product_info&amp;cPath=11&amp;products_id=195">Arduino Uno</a>, a <a href="https://www.olimex.com/Products/Components/Misc/TC-K-TYPE/">K-Type thermocouple</a>, a sample <a href="http://www.maximintegrated.com/datasheet/index.mvp/id/7273">MAX31855</a> IC, some dodgy soldering from a few weeks ago, an <a href="https://github.com/adafruit/Adafruit-MAX31855-library">Adafruit library</a> and a <a href="https://www.sparkfun.com/products/9393">Sparkfun LCD</a> and you get this:

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/12/2013-12-25-12.43.45.jpg"><img class="aligncenter size-large wp-image-1229" alt="2013-12-25 12.43.45" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/12/2013-12-25-12.43.45-1024x768.jpg" width="584" height="438" /></a>

All rustled up in 15 minutes.

Code and circuit to follow.

I haven't bothered to average out the values so using a bit of human judgement on the instantaneous ones.

UPDATE: So the turkey ended up very dry. I'm not sure if the cooking time was excessive or the thermocouple was reading low. I wasn't impressed with its accuracy at room temperature (+/- 2C at least) but I suspect it may have been 10C or more off at 180C. Hmm, just tried it on boiling water and it read 100-104 so perhaps I just cooked the turkey for far too long.

Also, if you want to try this, do yourself a favour and get the <a href="http://www.adafruit.com/products/269">Adafruit MAX31855 breakout board</a>. Soldering to the chip directly was a pain in the ass.

CODE (based on the Adafruit and Sparkfun sample code):

[sourcecode]
/*************************************************** 
  This is an example for the Adafruit Thermocouple Sensor w/MAX31855K

  Designed specifically to work with the Adafruit Thermocouple Sensor
  ----&gt; https://www.adafruit.com/products/269

  These displays use SPI to communicate, 3 pins are required to  
  interface
  Adafruit invests time and resources providing this open source code, 
  please support Adafruit and open-source hardware by purchasing 
  products from Adafruit!

  Written by Limor Fried/Ladyada for Adafruit Industries.  
  BSD license, all text above must be included in any redistribution
 ****************************************************/

#include &quot;Adafruit_MAX31855.h&quot;
#include &lt;SoftwareSerial.h&gt;
#include&lt;stdlib.h&gt;

int thermoCLK = 5;
int thermoCS = 4;
int thermoDO = 3;

// Initialize the Thermocouple
Adafruit_MAX31855 thermocouple(thermoCLK, thermoCS, thermoDO);
SoftwareSerial mySerial(6,2); // pin 2 = TX, pin 3 = RX (unused)

  
void setup() {
  mySerial.begin(9600);
  Serial.begin(9600);
  delay(500);
  mySerial.write(254); // move cursor to beginning of first line
  mySerial.write(128);
  mySerial.write(&quot;                &quot;); // clear display
  mySerial.write(&quot;                &quot;);
  mySerial.write(&quot;Hello, Thermocouple!&quot;);

  // wait for MAX chip to stabilize
  delay(1000);
}

char tempstring[16];
void loop() {
  // basic readout test, just print the current temp
  mySerial.write(254); // move cursor to beginning of first line
  mySerial.write(128);
  mySerial.write(&quot;                &quot;); // clear display
  mySerial.write(&quot;                &quot;);
   
  double c = thermocouple.readCelsius();
  if (isnan(c)) 
  {
    mySerial.write(&quot;T/C Problem&quot;);
  } 
  else 
  {
     mySerial.write(&quot;C = &quot;); 
     mySerial.write(dtostrf(c,4,1,tempstring));
     Serial.println(c);
     mySerial.write(&quot;  &quot;); 
   }
 
   delay(1000);
}
[/sourcecode]