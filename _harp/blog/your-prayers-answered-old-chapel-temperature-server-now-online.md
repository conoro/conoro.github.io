#"Your prayers answered, Old Chapel temperature server now online"

I must get 20 emails a day asking the same question: "Conor, what temperature is it,<em>right now,</em> outside your office window?". Thankfully, after literally several minutes work, <a href="http://nano.conoroneill.com:9999/">you have your answer</a>.

Courtesy of an <a href="http://dx.com/p/nano-v3-0-avr-atmega328-p-20au-module-board-usb-cable-for-arduino-118037">Arduino Nano</a>, <a href="http://www.ebay.com/itm/MIni-3-3v-ENC28J60-LAN-Ethernet-Network-Module-Shield-For-Arduino-MCU-AVR-51-LPC-/390511080956?ssPageName=ADME:L:OC:IE:3160">Ethernet adapter</a> and <a href="https://www.sparkfun.com/products/9418">Sparkfun temperature breakout board</a>, I can exclusively reveal the temperature is<a href="http://nano.conoroneill.com:9999/">12.44C and 54.39F</a> i.e. about 2C higher than reality.

To get something more accurate I'll need to put the sensor away from the building, away from the ground, out of direct sunlight and with good air flow. Then I'll auto-post the values to <a href="http://openweathermap.org/">Open Weather Map</a> and <a href="https://cosm.com">COSM</a>.

<a href="http://conoroneill.net/wp-content/uploads/2013/04/DSCF2602.jpg"><img class="aligncenter size-large wp-image-1002" alt="DSCF2602" src="http://conoroneill.net/wp-content/uploads/2013/04/DSCF2602-1024x768.jpg" width="584" height="438" /></a>

I was genuinely surprised on Sunday at the level of interest in the Arduino web-server I mentioned. I think a mixture of the tiny cost and 8-bit nature of the whole thing intrigued people. It was also trivial to puttogetherwith <a href="https://github.com/jcw/ethercard">some sample code</a>. The only difficulty I've found with Arduino in general is handling floating point values easily.

<img class="aligncenter size-large wp-image-1000" style="color: #333333; font-style: normal; line-height: 24px;" alt="nano2" src="http://conoroneill.net/wp-content/uploads/2013/04/nano2-1024x768.jpg" width="584" height="438" />

Of course it doesn't really make sense to have low-powered nodes being read by anyone. As several people pointed out on Sunday, a DDoS (heck, even a DoS) attack would be ridiculously easy. The nodes should either be reporting to central server(s) or queried on a regular basis by a small number of systems. That's phase 2 for my little side project and it's a bit more complex than temperature. More updates in a few weeks.

&nbsp;