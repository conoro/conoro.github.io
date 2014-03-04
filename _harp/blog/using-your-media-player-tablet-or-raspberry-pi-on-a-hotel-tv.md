#"Using your Media Player, Tablet or Raspberry Pi on a Hotel TV"

One thing that has driven me mad for the past several years is hotels making it hard to connect your gear to their TVs. Older TVs are usually easier and have a SCART at the back. LCDs bolted into a wall-unit tend to be the worst.

I usually travel with a media player, a variety of cables and a universal remote control. Most of the time I can get something working. I've only been beaten once by a recessed LCD where I was very tempted to take my leatherman tool to the entire wall unit to disassemble it. But I managed to stop myself.

Last week I thought I was stymied again. It took me a good 15 mins of my arm up the back of the LCD to find a HDMI socket but I finally did. However I couldn't get the TV to switch to the AV ports no matter what I did on my or their remote.

The culprit is that Hotel TV system. You know the one, with the welcome video and the "premium" channels. It locks the TV down so you can only see what they want you to see. Very frustrating.

But I do hate to be beaten so I did a bit of googling and hurrah, <a href="http://www.rownet.co.uk/hacking-philips-hotel-televisions/">it's a doddle to work around</a>. This should work for any Philips Hotel TV setup and possibly others.
<ol>
	<li>Connect your media player, Android Tablet with HDMI-out or Raspberry Pi to the TV</li>
	<li>Go to a high numbered channel, ideally one that is used for nothing</li>
	<li>Quickly type <strong>3 1 9 7 5 3 mute</strong> on the TV remote and you'll get access to a secret admin menu.</li>
	<li>Choose Program Install and then cycle through the inputs until you see the expected screen of your connected device</li>
	<li>Exit out and your're done!</li>
</ol>
To avoid annoying the hotel, you should do the decent thing and re-run the procedure above just before you leave and change the input back to tuner (or whatever it was set to originally).

I smugly used my Raspberry Pi running the <a href="http://www.raspbmc.com/">Raspbmc distribution</a> to play a variety of videos in my hotel room last week using XBMC.

<a href="http://conoroneill.net/wp-content/uploads/2012/07/2012-06-26-18.42.21.png"><img class="size-full wp-image-776 aligncenter" title="2012-06-26 18.42.21" src="http://conoroneill.net/wp-content/uploads/2012/07/2012-06-26-18.42.21.png" alt="" width="800" height="600" /></a>