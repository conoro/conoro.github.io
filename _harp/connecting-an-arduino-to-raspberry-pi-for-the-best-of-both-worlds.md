#"Connecting an Arduino to Raspberry Pi for the best of both worlds"

Rather than struggle with the very basic unprotected IO pins on the Raspberry Pi and the lack of real-time performance in Linux, the ideal setup for many real-world-interfacing projects is Raspberry Pi + Arduino.

After pricing a multitude of combinations of microcontroller boards and Wifi adapters, I found that the Raspberry Pi + USB Wifi + Arduino is the absolute best value for money if you need both wireless internet access and easy sensor data handling. (Note: I'll be investigating the <a href="http://beagleboard.org/Products/BeagleBone%20Black">Beaglebone Black</a> soon to see how it compares).

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/06/2013-06-05-07.32.44.jpg"><img class="aligncenter size-large wp-image-1088" alt="2013-06-05 07.32.44" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/06/2013-06-05-07.32.44-1024x576.jpg" width="584" height="328" /></a>

There are four basic ways to connect Arduino to Raspberry Pi:
<ol>
	<li><span style="line-height: 15px;">Buy an add-on board like the Gertboard which has an Arduino compatible IC on it. Pricey.</span></li>
	<li>Plug a standard Arduino like an Uno or Nano into the USB port of the RPi. This is by far the easiest method and minimises wiring and hassle. However it requires the more expensive Arduinos.</li>
	<li>Use a <a href="http://cgi.ebay.co.uk/ws/eBayISAPI.dll?ViewItem&amp;item=250893154137&amp;ssPageName=ADME:L:OU:IE:3160">USB to Serial adapter</a> with a cheaper/smaller Arduino like a Pro Mini or a self-made <a href="http://shrimping.it/blog/">Shrimp</a>. This is the best DIY option and has the same advantage of method 2 that you can power the Arduino/Shrimp from USB. For a Model B RPi, I'd recommend this route.</li>
	<li>Use the Serial Pins on the Raspberry Pi to connect to a cheaper/smaller Aruduino like a Pro Mini or a self-made Shrimp. This is theoretically the cheapest method but by far the most hassle. This is also the best method if you are using the cheaper Raspberry Pi Model A and its single USB port is being used for Wifi.</li>
</ol>
I won't go into the details of 1 since I haven't done it. 2 and 3 are plug n play and require no instructions. 4 is the awkward one, so here are some notes to save you the hassle I went through.

The basic steps are identical to those described <a href="http://blog.oscarliang.net/raspberry-pi-and-arduino-connected-serial-gpio/">here</a>. In hardware terms You connect the 3.3V/GND/TX/RX pins on the Raspberry Pi via <a href="http://dx.com/p/jy-mcu-5v-3v-iic-uart-spi-level-4-way-converter-module-adapter-178286?Utm_rid=73941134&Utm_source=affiliate">a level converter</a> to 5V/GND/RX/TX pins on an Arduino. Alternatively you buy a 3.3V Arduino and avoid the need for a level converter. I powered the Arduino separately to avoid overloading the RPi pins (this seems to be causing intermittent issues with RPi booting tho).

RPi software changes involve commenting out this line in /etc/inittab with a #
<pre>T0:23:respawn:/sbin/getty -L ttyAMA0 115200 vt100</pre>
and removing the following parts of the one line in /boot/cmdline.txt
<pre>console=ttyAMA0,115200 kgdboc=ttyAMA0,115200</pre>
You also need to create a link to the serial port so that the Arduino IDE recognises it:
<pre>sudo ln -s /dev/ttyAMA0 /dev/ttyUSB9</pre>
<span style="text-decoration: underline;">That last step has to be done after every reboot</span>. I should find a way to make it permanent.

Unfortunately this still isn't enough to be able to program the Arduino from the IDE running on the RPi. We need to be able to toggle the reset pin on the Arduino to initiate programming. Normally that's done by the USB-Serial adapters or the USB-Serial chip on the more expensive Arduinos. To do this in our setup requires <a href="http://www.deanmao.com/2012/08/12/fixing-the-dtr-pin/">following the instructions here</a>where one of the Arduino tools is wrapped in a script which does the pin toggling at exactly the right moment. In summary:
<ol>
	<li><span style="line-height: 15px;">Connect Pin 11 (GPIO 17) of the RPi to the DTR Pin on the Arduino Pro Mini via the level converter</span></li>
	<li>Run the following commands to download and configure <a href="https://github.com/deanmao/avrdude-rpi">avrdude-rpi</a>:</li>
</ol>
[bash]
sudo apt-get update
sudo apt-get install python-dev
sudo apt-get install python-rpi.gpio
wget https://raw.github.com/deanmao/avrdude-rpi/master/autoreset
wget https://raw.github.com/deanmao/avrdude-rpi/master/avrdude-autoreset
sudo cp autoreset /usr/bin
sudo cp avrdude-autoreset /usr/bin
sudo mv /usr/bin/avrdude /usr/bin/avrdude-original
sudo ln -s /usr/bin/avrdude-autoreset /usr/bin/avrdude
sudo chmod 755 /usr/bin/avrdude-autoreset
sudo chmod 755 /usr/bin/autoreset
[/bash]

I was getting a warning about "Channel already in use" from /usr/bin/autoreset so I added this to the end of the file:
<pre>GPIO.cleanup()</pre>
<span style="text-decoration: underline;">Note you must run the Arduino IDE as root from now on</span>. i.e. in LXTerminal:
<pre>sudo arduino</pre>
If you haven't already, reboot the RPi to make the earlier steps kick in. You should now be able to program whatever you like on to the Arduino using the IDE running on the Raspberry Pi. I even have this running headless by connecting to the RPi across the network using the Windows Remote Desktop Connection tool.

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/06/2013-06-05-084448_1920x1080_scrot.png"><img class="aligncenter size-large wp-image-1092" alt="2013-06-05-084448_1920x1080_scrot" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/06/2013-06-05-084448_1920x1080_scrot-1024x576.png" width="584" height="328" /></a>

Any questions, pop them in the comments.