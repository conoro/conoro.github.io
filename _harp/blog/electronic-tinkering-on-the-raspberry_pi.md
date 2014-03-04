#"Electronic Tinkering on the @Raspberry_Pi and @Arduino"

I've been lucky to-date that I haven't killed the RPi stone dead with my little projects. I find the simplest way to help avoid any catastrophic shorts is to use an old 40-core IDE cable (note, the "newer" 80-core ones don't work even tho they fit). I Dremeled mine last week to fit in this <a href="http://www.ebay.co.uk/itm/Pi-Box-Case-Box-Enclosure-for-Raspberry-Pi-Computer-New-From-PiWorks-/390538699061?pt=UK_Computing_DesktopComponents_RL&hash=item5aedeba135">very nice inexpensive case</a>.

<a href="http://conoroneill.net/wp-content/uploads/2013/02/IMG_20130210_102511.jpg"><img class="alignnone size-large wp-image-931" title="IMG_20130210_102511" src="http://conoroneill.net/wp-content/uploads/2013/02/IMG_20130210_102511-1024x768.jpg" alt="" width="584" height="438" /></a>

In many ways, that GPIO header on the RPi is like the expansion port on the ZX Spectrum. So much possibility, so much danger :-)

I'm finding myself jumping back and forth between the RPi and Arduino a lot recently. Arduino is amazing because of the huge body of code and boards that are available. Interfacing to most things often just requires wiring it straight in and pasting some code off the web. In the picture above you can see an Arduino Nano which is both tiny and cheap ($10). Where Arduino falls down is when complexity is required. A 8-bit CPU can't just be connected straight to the internet or to a Bluetooth USB dongle. This means that some of the add-on boards (particularly Wifi) cost multiples of the Arduino itself.

TheArduinocode for Nunchuck worked perfectly first time, but right now I'm waiting on a Bluetooth Master module from China to connect it to the i-Racer ($10 module vs $2 USB BT dongle). Whilst I'm waiting, I've been trying to get the Nunchuck working on the Raspberry Pi. I'll do a full post in a few weeks but suffice to say it has not been straightforward. Scanning I2C reliably with Python is proving a struggle and I don't know if it's HW or SW related. Having a Python runtime and Linux kernel between your code and the Nunchuck may not be the best for realtime performance. Compare that to the Arduino code which is raw machine code with no OS, reading its pins directly on a bullet-proof I2C bus.

There are many types of boards out there to make interfacing to the Raspberry Pi easier. They range from simple breakout boards converting male headers to female headers all the way up to big motor control boards with their own microcontrollers. I haven't bought any of these yet, so it's up to you to figure out what is most appropriate for your project.

<a href="http://shop.ciseco.co.uk/slice-of-pi-add-on-for-raspberry-pi/">Slice of Pi</a>
Only 3.90, this is a breakout board which just makes it easier to connect jumper wires and less likely that you'll short anything out. One of its headers is XBee compatible. Probably worth getting no matter what you are doing. Very simple self-soldering to assemble and comes with all the parts

UPDATE 1 - 16/02/2013: <a href="http://shop.ciseco.co.uk/k002-slice-of-pi-o/">Slice of Pi/O</a>
Big thanks to <a href="https://twitter.com/conorjh">Conor Houghton</a> for pointing out this board which I had missed. It is the Slice of Pi with an IO expander chip. The basic idea is that you communicate to the chip using I2C and it handles all the actual interfacing and buffering. So your RPi is much less likely to be damaged. If you damage the MCP23017 chip itself, you just pop it out and put in a new one for 1.53 from Farnell. Lots of info about it <a href="http://nathan.chantrell.net/20120602/raspberry-pi-io-expander-board/">here</a>. <em>This is in fact the board that I ended up buying</em>. It is only 7.89 delivered to Ireland which is in keeping with the low price point of the RPi itself.

<a href="http://picru.st">PiCrust</a>
This is similar to the basic Slice of Pi but has more headers. However you have to order all the parts separately yourself. Still very inexpensive.

<a href="http://www.adafruit.com/products/801">Adafruit Prototyping Plate</a>
This is the same idea again but with lots of connectors and plenty of space to permanently solder things on. $16 in US and I'm sure someone is selling on this side of the pond too.

<a href="http://ie.farnell.com/jsp/search/displayproduct.jsp?SKU=2218566&amp;CMP=SOM-FB-PiFace-Launch">PiFace</a>
This is more complex and has relays, motor control, switches etc. At 25 it won't break the bank and comes fully assembled. You can program in Python, C and Scratch. The last one is verrrrry interesting for something like Coder Dojos. I showed my RPi at Bandon Coder Dojo last week and got a ton of interest from kids and parents. Being able to do robotics in Scratch would blow a lot of their minds.

UPDATE 2 - 17/02/2013: <a href="https://www.sparkfun.com/products/11561">RaspiRobot Board</a>
This was <a href="https://www.sparkfun.com/news/1074">just announced by Sparkfun</a> on Friday. It's specifically for robotics and seems decent value at $29.95. After you've assembled it, it provides dual bi-directional motor controllers, two open collector outputs, two switch inputs and a voltage regulator capable of powering the Pi itself. A LiPo battery or 6 x AA batteries should provide the juice you need. Obviously Model A is the one to go with for robotics due to the much reduced power consumption.

<a href="http://www.cooking-hacks.com/index.php/shop/raspberry-pi/raspberry-pi-to-arduino-shield-connection-bridge.html">Arduino Shield Bridge</a>
This is a neat idea. It makes it possible to connect Arduino Shields (shields are the Arduino add-on boards) to your Raspberry Pi. Whilst boards like Wifi are expensive on Arduino, there are tons of control and interfacing boards which are very cheap. Things like Joystick boards, environmental sensors, heavy-duty motor control, RFID, XBee etc. They have created an Arduino-compatible library so you can use some of the same Wiring code on the Raspberry Pi that you would use on Arduino. Note that this can't work with everything but their site is good in explaining what will work. It is 40 which isstartingto get pricey for something which may only be suitable in a subset of cases.

<a href="http://www.seeedstudio.com/depot/alamode-arduino-compatible-raspberry-pi-plate-p-1285.html?cPath=132_133">Alamode</a>
This takes the same Arduino idea and extends it further by basically giving you a full Arduino board which plugs neatly into the Raspberry Pi. You can see it as either adding Arduino functionality to the RPi or giving the Arduino very inexpensive Ethernet capabilities. However at $50, we are now at twice the price of a Model-A Raspberry Pi and many Arduino boards. So youreallyneed to be sure this is something you need and will use. I've hooked Arudino up to RPi but only using USB. Clunkier, simpler but a lot cheaper.

<a href="http://www.element14.com/community/docs/DOC-51726/l/assembled-gertboard-for-raspberry-pi">Gertboard</a>
This is probably the best known board as it was designed by one of the people originally involved in the RPi design. Whilst it is not "the official board", many people see it as such. It is a very high end board with lots of functionality, particularly around motor control for robotics etc. It even includes the same ATMega MCU as an Arduino. Originallya kit, you can now buy pre-assembled for 30. My guess is that it will see the most community support due to its high profile. But like so many of the other boards I'd point to the fact that it's more expensive than the RPi itself.

If I've missed any others, please let me know in the comments. At the minute I'm tending towards the simpler breakout boards. With a little care, you should be ok and they aren't adding much to the overall cost of the RPi. The power requirements of the Pi mean that using it for robotics etc probably isn't a runner for me and I'll stick with the Arduino for that. Ditto anything that I want to do outdoors. But for projects where you need to get the data online, an RPi is ideal.

I'mparticularlyexcited by the idea of using Scratch to both interface to the real world and maybe even access the web. I wonder is anyone working on web services functionality for Scratch? I was disappointed that no-one did the same for <a href="http://appinventor.mit.edu/">MIT App Inventor</a> and the<a href="https://www.sparkfun.com/products/11343"> IOIO board</a>.

Actually, that reminds me I meant to blog about <a href="http://www.modk.it/">ModKit</a>. An absolutelybrilliantArduino project to bring Scratch-style/App-Inventor-Style development to that platform.

<iframe src="http://player.vimeo.com/video/42436411" width="400" height="300" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

You install a simple program on your PC and then do everything else in the browser (desktop app optional). It's amazing to drag a few blocks in a browser IDE which say "blink LED" and then the LED on the Arduino on your desk starts blinking! It's projects like this that will get kids interested in hardware and electronics big time. Perhaps it might eventually support RPi plus one of the boards above.