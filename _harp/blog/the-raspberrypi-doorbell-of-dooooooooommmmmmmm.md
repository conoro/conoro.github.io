#"The @RaspberryPi Doorbell of Dooooooooommmmmmmm"

We had some good fun last night with the neighbourhood kids making use of ourDoorbell of Dooooooooommmmmmmm.

<img class="alignnone" src="https://lh5.googleusercontent.com/-Dwcpjbp-xsk/UJJ1_hkQBhI/AAAAAAAAjQs/elUv6hKPHfI/s800/IMG_20121031_162253.jpg" alt="" width="600" height="800" />

I've had a bigger doorbell project planned for quite a while but 2 weeks ago decided we should do a simpler Halloween one. Using various bits bought from Sparkfun and Maplin along with <a href="http://learn.adafruit.com/playing-sounds-and-using-buttons-with-raspberry-pi">a great tutorial from Adafruit</a> (more below), I finally got something we were happy with, working late last week. Then yesterday evening I put it in place on the door. Unfortunately, with all the pulling, taping and general movement, one of the five buttons stopped working. But the other 4 were fine.

<img class="alignnone" src="https://lh5.googleusercontent.com/-X97KKH4-a-Q/UJJ2EtigEnI/AAAAAAAAjQ0/g9hVVb7geOo/s800/IMG_20121031_162245.jpg" alt="" width="800" height="600" />

The sounds used were pulled from various online sources. Sibal came up with the Mr Burns idea and Oisn thought of the Home Alone one. I used Audacity to clip some of them and ffmpeg to convert some of the YouTube videos to audio. The cheques are in the post :-)

Originally I was going to use Arduino for this but considering a Waveshield for playing audio costs more than a Raspberry Pi, I changed direction. I then thought I'd use the Arduino for the button detection andcommunicateover USB to the RPi but I finally realised I should just use the GPIO pins directly on the RPi itself. My worry about killing it accidentally were unfounded.

<img class="alignnone" src="https://lh3.googleusercontent.com/-9myanqq6Ods/UJJ2Lf_TDjI/AAAAAAAAjRE/H-o0MiUDh04/s800/IMG_20121031_162214.jpg" alt="" width="800" height="600" />

The first version was done on a breadboard to make sure I made no mistakes. It worked well. But it was never going to work stuck to a doorframe so I moved to a strip of veroboard and soldered it together. This had a few, ahem, glitches, which took a while to sort out due to my soldering incompetence.

<img class="alignnone" src="https://lh6.googleusercontent.com/-Vu64htXLUPQ/UJJ2StT1LtI/AAAAAAAAjRU/30aCSiV3KZk/s800/IMG_20121026_155921.jpg" alt="" width="600" height="800" />

The final setup was really simple:
<ol>
	<li>One button per sound</li>
	<li>Each button connected to a GPIO pin on the RPi along with connection to 3.3V and GND on the RPi (pull up resistors there too but apparently not necessary?)</li>
	<li>An old 40-core IDE cable from a dead PC used to safely connect the wires from the buttons to the pins on the RPi.</li>
	<li>Extremely simple Python code running in a loop on the RPi which checked to see if any of the connected pins were pulled low by the button being pressed.</li>
	<li>If so, it made an external call to mplayer to play one of our selected audio clips</li>
</ol>
<img class="alignnone" src="https://lh5.googleusercontent.com/-rAmfSFYFwwI/UJJ2Pff5PdI/AAAAAAAAjRM/98cJyIoqW5o/s800/IMG_20121031_162206.jpg" alt="" width="800" height="600" />

The only real change from the <a href="http://learn.adafruit.com/playing-sounds-and-using-buttons-with-raspberry-pi">Adafruit tutorial</a> was to use mplayer instead of mpg123. This allowed me to use any audio format including WAV, rather than just MP3s. Also some of the instructions are a little redundant with the latest version of Debian on RPi, but they do no harm.

This is the trivial script to set the volume and call the Python script:

[bash]
#!/bin/bash
amixer cset numid=3 1
nohup ./raspi-audio-button.py &gt; /dev/null 2&gt;&amp;1 &amp;
[/bash]

This is the code, it uses the <a href="http://pypi.python.org/pypi/RPi.GPIO">RPi.GPIO</a> library (the latest version works fine):

[python]
#!/usr/bin/env python
from time import sleep
import os
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(23, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(24, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(25, GPIO.IN, pull_up_down=GPIO.PUD_UP)
while True:
    if ( GPIO.input(22) == False ):
        os.system('mplayer /home/pi/haunted_sounds/Howl.mp3 &amp;')
        sleep(3);
#    if ( GPIO.input(17) == False ):
#        os.system('mplayer /home/pi/haunted_sounds/HomeAloneCountOf10.mp3 &amp;')
#        sleep(3);
    if ( GPIO.input(23) == False ):
        os.system('mplayer /home/pi/haunted_sounds/ReleaseTheHounds.wav &amp;')
        sleep(3);
    if ( GPIO.input(24) == False ):
        os.system('mplayer /home/pi/haunted_sounds/Scream.wav &amp;')
        sleep(3);
    if ( GPIO.input(25) == False ):
        os.system('mplayer /home/pi/haunted_sounds/CastleThunder.wav &amp;')
        sleep(4);

[/python]

This diagram of the RPi pin-out was invaluable:

<a href="http://elinux.org/RPi_Low-level_peripherals#Referring_to_pins_on_the_Expansion_header"><img class="alignnone size-full wp-image-894" title="GPIOs" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2012/11/GPIOs.png" alt="" width="254" height="581" /></a>

Once everything was setup at the door yesterday, we then found that the volume on the Lidl iPod Dock was far too low. I had to put a tiny battery powered speaker outside, taped to the postbox. But even that wasn't great so I added a Fiio amplifier. Of course then we couldn't hear it inside, so I split the audio and used one audio device inside and one outside.

I didn't have time to setup wireless on the RPi so I used a wired network connection. This enabled me to SSH to the RPi from my PC and start the Python program. It also allowed me to remotely change the Home Alone clip to the howl from An American Werewolf in London after it got a bit tiresome, 2 hours later.

I made a video of it all in action but the bloody version of CM10 on my phone corrupted it. To give you a taste of what it was like, I extracted the audio from it. Enjoy:

<iframe src="http://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F65641747&amp;show_artwork=true" frameborder="no" scrolling="no" width="100%" height="166"></iframe>

Changes? Instead of externally calling mplayer, it'd be better to use some sort of audio library that would allow a follow-on button-press to interrupt whatever is playing. Also, approx 75% of kids pressed the top button so the next time we'll randomise what is played.

Next steps? Well that'd be our Social-Enabled Doorbell. It'll probably be Christmas before I finish it tho.

&nbsp;