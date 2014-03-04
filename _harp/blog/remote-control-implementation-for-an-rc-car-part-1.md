#"Remote Control implementation for an RC Car - Part 1"

There are many ways you can add remote control to a project. Off the shelf modules; Bluetooth; 2.4GHz NRF24L01+ transceivers; 433MHz/434Mhz modules or even Infra-red.

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/05/remote_control.jpg"><img class="aligncenter size-large wp-image-1059" alt="remote_control" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/05/remote_control-1024x576.jpg" width="584" height="328" /></a>

My plan with <a href="http://conoroneill.net/progress-so-far-with-a-kids-e21-self-assemble-remote-control-car/">our ZL-4 el-cheapo RC</a> car was to use an <a href="http://www.elecfreaks.com/1999.html">Elecfreaks Joystick Shield</a>, an Arduino board and the<a href="http://www.ebay.ie/itm/1X-NRF24L01-2-4GHz-Antenna-Wireless-Transceiver-Module-For-Microcontroller-WST-/271133536748?ssPageName=ADME:L:OC:IE:3160#ht_5792wt_1385">NRF24L01+</a> modules mainly because [a] the joystick shield has a connector for one and [b] I want to use them in another potentiallycommercialproject and thought it would be a good learning exercise. They are also stunningly cheap at 1.26,includingshipping, for each transceiver.

Unfortunately Idiscovered that the Adafruit Motor Shield on the RC car uses up a ton of the pins on the Arduino and makes it very hard to add theNRF24L01+. In particular it uses the SPI pins which you need to talk to theNRF24L01+.

So I went with Plan B which was the 433Mhz modules. These things are fab. They work in the unregulated ISM band like most weather stations etc and, like the NRF24L01+,are gob-smackingly cheap - 1.97 for <a href="http://dx.com/p/diy-433mhz-wireless-receiving-module-for-arduino-green-149252?Utm_rid=73941134&Utm_source=affiliate">the receiver</a> and 2.14 for <a href="http://dx.com/p/433mhz-wireless-transmitter-module-superregeneration-for-arduino-green-149254?Utm_rid=73941134&Utm_source=affiliate">the transmitter</a>. When I see people creating really simple projects but with 2x 20+ Zigbee modules, I just don't understand it.

The 433MHz modules main advantage relative to theNRF24L01+ is that they can cover longer distances with a properly setup aerial. The main disadvantages are that they generally need that aerial, they have a very low bit-rate and you have to deal with most of the error correction etc yourself.

What transforms these modules into something pretty spectacular is the <a href="http://www.airspayce.com/mikem/arduino/">VirtualWire</a> library for Arduino. This takes care of all the low-level transmit/receive code and you have to do little more than the equivalent of a print statement. Just think about this. You can send any information you like over hundreds of feet using 4 worth of electronics by simply calling:
<pre>vw_send((uint8_t *)msg, strlen(msg));</pre>
No Wifi or SMS needed! Of course this is a broadcast message and anyone can pick it up but who cares.

The one thing we do have to figure out is what happens when multiple devices are broadcasting locally. Will they interfere with each other? I know VirtualWire has CRC checking but that's not much use if every message is corrupt.

For the remote control I have created an extremely simplistic "protocol". The transmitter sends out the following every 200ms:
<pre>XnnnnYnnnnAnBnCnDn</pre>
Where Xnnnn is the X-axis of the joystick from 0 to 1024, Ynnnn is the Y-axis of the joystick from 0 to 1024, An is button-A 0 or 1, Bn is button-B 0 or 1, Cn is button-C 0 or 1 and Dn is button-D 0 or 1.

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/05/remote_control2.jpg"><img class="aligncenter size-large wp-image-1063" alt="remote_control2" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/05/remote_control2-1024x748.jpg" width="584" height="426" /></a>

We are now successfully receiving and interpreting those messages on the RC car and doing forward/reverse. The bit we have to figure out is turning, as the car doesn't have any steering.

More updates in a few days when we crack that nut. And I'll obviously have to add some sort of "addressing" for the scenario where more that one RC car is being controlled in the house.