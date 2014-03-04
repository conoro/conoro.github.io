#"Using a Wii Nunchuck instead of Cheese to control i-Racer RC car on @Raspberry_Pi and @Arduino"

<h2>Following up from the Cheese</h2>
After the enormous attention that the Cheese Controlled Car got, my thoughts moved to what else we could use with the i-racer. Two immediately came to mind: the Wiimote and a mousepad. But both went in directions I didn't expect. I'll write up the mousepad at a later stage but this post is about the Wii.

The Wiimote is an amazing device. I don't think the average person realises that it has a VGA infrared camera at the front, has a bunch of accelerometers inside and communicates with the Wii using Bluetooth.

The bit I didn't know until recently was that it also talks to the Nunchuck using I2C (I squared C, not I two C). This is a brilliant low-level communications protocol invented by Philips many years ago to make it very easy for inter-IC communication using just two wires. I spent a lot of the 1990s writing and debugging I2C drivers.

This made me realise I could dump the full Wiimote and just use a Nunchuck. Both Raspberry Pi and Arduino support I2C and there is tons of code on the web for both platforms.

TL;DR - If you want to jump straight to the outcome, here's a really rough video of it in action:

httpv://www.youtube.com/watch?v=pEPdQ4GKqdY

Whilst there are <a href="www.sparkfun.com/products/9281">adapters out there</a> to get at the Nunchuck's pins, I decided to just cut the cable and go direct. A lot of our Nunchucks have rusty connectors due to the kids blowing on them to get a "better" connection. So they are basically spittle-filled. Gross I know.

A few minutes of soldering and I had the Arduino happily reading the joystick, buttons and accelerometer of the Nunchuck. But then I sussed that the simple serial Bluetooth dongle I had bought on DX to talk to the i-racer was Slave-mode only (HC-06) whereas I needed the more expensive Master-Slave one (HC-05). I managed to find the right one on <a href="http://www.elecfreaks.com/store/bluetooth-modem-minimum-passthrough-module-p-229.html">Elec Freaks</a>.
<h2>Using Raspberry Pi and Python</h2>
Whilst I waited for that to arrive, I decided to return to the Raspberry Pi and use that. Its I2C interface is available on some of the external PINs as follows:
<ul>
	<li>Pi pin 1 is 3.3V and connects to the Nunchuck Red Wire</li>
	<li>Pi pin 6 is Ground and connects to the White wire</li>
	<li>Pi pin 3 is the I2C Data Line and connects to the Green wire</li>
	<li>Pi pin 5 is the I2C Clock Line and connects to the Yellow wire</li>
</ul>
<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/02/IMG_20130210_102511.jpg"><img class="alignnone size-large wp-image-931" title="IMG_20130210_102511" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/02/IMG_20130210_102511-1024x768.jpg" alt="" width="584" height="438" /></a>

Then you need to do some simple installs on the Raspberry Pi to enable I2C and access it with Python:

[bash]
sudo modprobe i2c_dev
sudo modprobe i2c-bcm2708
sudo apt-get install i2c-tools
sudo apt-get install python-pip
sudo apt-get install python-smbus
[/bash]

[bash]
sudo nano /etc/modules
[/bash]

Add these lines, save and reboot:

[code]
i2c-bcm2708
i2c-dev
[/code]

[bash]
sudo nano /etc/modprobe.d/raspi_blacklist.conf
[/bash]

Comment these lines out with a #

[code]
blacklist spi-bcm2708
blacklist i2c-bcm2708
[/code]

If all is working well you should see 52 mentioned when you type this:

[bash]
sudo i2cdetect 0
[/bash]

(use a 1 instead of a 0 if you have a newer Raspberry Pi)

Then you can use Python like the following (courtesy of <a href="http://www.raspberrypi.org/phpBB3/viewtopic.php?f=44&amp;t=28231">sidb on the RPi site</a>) to report on what the Nunchuck is doing:

[python]
import smbus
import time
bus = smbus.SMBus(0)

bus.write_byte_data(0x52,0x40,0x00)
time.sleep(0.1)
while True:
  try:
    bus.write_byte(0x52,0x00)
    time.sleep(0.1)
    data0 =  bus.read_byte(0x52)
    data1 =  bus.read_byte(0x52)
    data2 =  bus.read_byte(0x52)
    data3 =  bus.read_byte(0x52)
    data4 =  bus.read_byte(0x52)
    data5 =  bus.read_byte(0x52)
    joy_x = data0
    joy_y = data1
    accel_x = (data2 &lt;&lt; 2) + ((data5 &amp; 0x0c) &gt;&gt; 2)
    accel_y = (data3 &lt;&lt; 2) + ((data5 &amp; 0x30) &gt;&gt; 4)
    accel_z = (data4 &lt;&lt; 2) + ((data5 &amp; 0xc0) &gt;&gt; 6)
    buttons = data5 &amp; 0x03
    button_c = (buttons == 1) or (buttons == 2)
    button_z = (buttons == 0) or (buttons == 2)
    print 'Jx: %s Jy: %s Ax: %s Ay: %s Az: %s Bc: %s Bz: %s' % (joy_x, joy_y, accel_x, accel_y, accel_z, button_c, button_z)
  except IOError as e:
    print e
[/python]

You interpret the Nunchuck data as follows:

[code]
Byte    Description                                     Values of sample Nunchuk
1       X-axis value of the analog stick                Min(Full Left):0x1E / Medium(Center):0x7E / Max(Full Right):0xE1
2       Y-axis value of the analog stick                Min(Full Down):0x1D / Medium(Center):0x7B / Max(Full Right):0xDF
3       X-axis acceleration value                       Min(at 1G):0x48 / Medium(at 1G):0x7D / Max(at 1G):0xB0
4       Y-axis acceleration value                       Min(at 1G):0x46 / Medium(at 1G):0x7A / Max(at 1G):0xAF
5       Z-axis acceleration value                       Min(at 1G):0x4A / Medium(at 1G):0x7E / Max(at 1G):0xB1
6       Button state (Bits 0/1) / acceleration LSB 	Bit 0: &quot;Z&quot;-Button (0 = pressed, 1 = released) / Bit 1: &quot;C&quot; button (0 = pressed, 1 = released) / Bits 2-3: X acceleration LSB / Bits 4-5: Y acceleration LSB / Bits 6-7: Z acceleration LSB
[/code]

However, despite multiple attempts, I haven't been able to read reliably from the Nunchuck on the Raspberry Pi. An appreciable percentage of the data comes back as 0xFF. I have no idea if it's the wiring, the RPi CPU, the I2C driver in Linux, the I2C library in Python, timing or the code above. I don't believe the problem is the Nunchuck as I now have it working 100% reliably on the Arduino. In any case, the RPi was only ever going to be the proof of concept platform as we obviously need something more portable and less power hungry if we are going to chase a remote control car around the house.
<h2>Using Arduino and HC-05</h2>
Last week the HC-05 module finally arrived from China and I was able to start playing with it on an itty bitty <a href="http://arduino.cc/en/Main/ArduinoBoardNano">Arduino Nano</a> yesterday. Using <a href="http://cu.rious.org/make/hc-05-bluetooth-with-arduino/">the basic instructions and code from here</a>, after a lot of misunderstanding what pin did what, I was able to connect to the HC-05 and it was able to connect over Bluetooth to the i-racer.

I pulled in <a href="http://www.windmeadow.com/node/42">the Arduino Nunchuck code from here</a> and converted my Raspberry Pi Python to Arduino Processing (basically a C variant). My code maps the wide range of movement in the Nunchuck joystick to the basic 6 degrees of freedom plus speed on the i-racer. It took quite a few hours of Googling before I finally sussed that "arccos" was the mathematical function I needed. So the code splits 360 degrees into 6 segments of 60 degrees. That gives us Stop/Right Forward/Forward/Left Forward/Left Backwards/Backwards/Right Backwards. Speed ranges from 0 to 15.

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/02/IMG_20130224_1512541.jpg"><img class="alignnone size-full wp-image-935" title="IMG_20130224_151254" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/02/IMG_20130224_1512541.jpg" alt="" width="800" height="600" /></a>

It was a real delight to see the i-racer responding with no delay to my thumb movements but the code definitely needs tuning and I'm pretty sure the Nunchuck is not giving a full range of motion. It's pretty ancient and so hard-left does not give the same value as hard-right for example.

Fionn was thrilled as I've been promising him I'd get it working for the past month! Interestingly, his first instinct was to use the accelerometer in the Nunchuck instead of the joystick. This must be how most Wii games work. It shouldn't be too hard to switch the code over to using the accelerometer but we'll use this for a while.

After a few more goes, both Fionn and Oisn pointed out that their natural action was to move the joystick in the direction they wanted the car to go, relative to them. I think I'll leave that for another day :-)

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/02/IMG_20130224_1634171.jpg"><img class="alignnone size-full wp-image-936" title="IMG_20130224_163417" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/02/IMG_20130224_1634171.jpg" alt="" width="800" height="600" /></a>

Being able to run the whole thing off 4 rechargeable AA batteries is a real plus. I'm also a huge fan of the <a href="http://shrimping.it">Shrimping It</a> project which is a minimalist Arduino setup using little more than the ATMega itself. I have two and the idea is to replace the Arduino Nano with one and make the whole thing even smaller again. The i-racer runs out of juice way faster than the remote ever will so I may be able to try AAA rechargeables or maybe a little Lipo battery.

You can find the <a href="https://github.com/conoro/iracer-controllers/tree/master/iracer_nunchuck_arduino">Arduino code on Github</a>.


Next up is probably a left-over Nintendo DS touch-screen as the controller. I also think we'll start adding "headlights" and an ultrasonic detector for collision avoidance. These will require changes to the i-racer firmware itself so you'll probably hear from me again in 2017!