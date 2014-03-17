#"Adding an audio amplifier to your @Raspberry_Pi"

We have a treadmill setup in our house which has always faced some sort of media centre setup. It's the only way I don't lose my mind with boredom when running during Irish bad weather (August to June).Originallyit was an XBOX-1 with XBMC on a 14" Philips portable CRT. Then it became a Patriot PBO connected with a HDMI-VGA adapter to an LCD monitor and now it's a <a href="http://www.raspberrypi.org/">Raspberry Pi</a> running <a href="http://www.raspbmc.com/">Raspbmc</a> connected to the same monitor.

The problem in all these setups has been audio volume. When I'm pounding my featherlight torso on the treadmill deck, I need lots and lots of volume to hear anything. I bought a 2.1 Speaker thingy from Lidl a good while back and that helped but it still wasn't loud enough on some media.

Then I got a <a href="http://dx.com/p/fiio-e3-3-5mm-earphone-volume-booster-power-amplifier-black-14823">Fiio E3</a> battery-powered headphone amp and that worked well with the PBO. The big downside was that it chewed through the single AAA battery in no time at all and was unusable with rechargeables.

I came up with a really coolsolutionto the battery problem. I got one of these <a href="http://dx.com/p/mini-dc-dc-voltage-stabilizer-regulator-module-red-126106">adjustable voltage regulators from DX</a>, cut the head off an old Nokia charger and wired it in. Then I used a multimeter on the output and twisted the potentiometer until I got 1.5V out. I used crocodile clips to then connect to the Fiio.

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/04/DSCF2592.jpg"><img class="aligncenter size-full wp-image-983" alt="DSCF2592" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/04/DSCF2592.jpg" width="500" height="375" /></a>

I can't recommend that voltage regulator highly enough. If you, like me, have tons of old power supplies from long dead electronics, it can scale down anything to the voltage you need. I'm getting another one to power the Raspberry Pi from an old Linksys 12V wall-wart as most of my phone chargers simply don't have enough juice. At 2.90, it's super value.

The problem with the PBO as a media player is that its UI is garbage. It feels like something from the 90s. In particular, it's missing a simple but crucial feature we love in XBMC - a tick mark to show you've already finished watching something or you are mid-watch. The PBO is also terribly crashy and struggles regularly with SMB network shares.

So we finally moved to Raspbmc and it works really well. Well almost. The only big problem is the analogue audio, it has no amplification on it at all. So even with the Fiio and the Lidl speakers up full, it is very hard to hear on the treadmill.

I had a go with using a <a href="http://dx.com/p/usb-2-0-virtual-7-1-channel-sound-card-adapter-45577">USB audio adapter</a> but that was a disaster. Audio out of sync and the GUI mis-behaved the whole time. It was louder tho!

Then I went looking for something with more welly than the Fiio. That company has other devices but they are even more expensive than the RPi itself.

I then built <a href="http://dx.com/p/2-channel-3w-pam8403-audio-amplifier-board-red-146300">this</a>:

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/04/IMG_20130302_190848.jpg"><img class="aligncenter size-full wp-image-984" alt="IMG_20130302_190848" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/04/IMG_20130302_190848.jpg" width="500" height="667" /></a>

But after much gnashing of teeth with no output and then mono output, I realised that a loudspeaker amp is totally different to an inline headphone amp and just cannot work in that configuration. So much for 6 years of Electronics in UCD ;-)

Weirdly I could only find loudspeaker amps on DX, eBay and Amazon. A bunch more googling and reading on audio/hifi/hobbyist sites and fiiiiiinally I found a headphone amp design called the <a href="http://tangentsoft.net/audio/cmoy-tutorial/">CMoy</a> which (a) looked easy to make (b) looked cheap to make and (c) had very detailed instructions for idiots like me.

I ordered the various bits online from the usual suspects (eBay, DX, Farnell) and put it together last week on a mini-breadboard. Shockingly for me, it worked first time! The only difficulty in the instructions is that they are customised for a very specific Radioshack board and I had to translate that to my simple breadboard.

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/04/IMG_20130407_203620.jpg"><img class="aligncenter size-full wp-image-985" alt="IMG_20130407_203620" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/04/IMG_20130407_203620.jpg" width="500" height="375" /></a>

Then yesterday I sat down to build the final circuit on some stripboard I got yonks ago in Maplin. I'll be honest, it took a while. Particularly translating the layout to a very small bit of board. But yet again, magically, it worked first time. I have it powered with another old Netgear 12V wall-wart. It'll take anything from around 9V to around 30V which is really handy.

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/04/DSCF2590.jpg"><img class="aligncenter size-full wp-image-986" alt="DSCF2590" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/04/DSCF2590.jpg" width="500" height="437" /></a>

A bit of glue-gunning on to the unused lid of a Raspberry Pi case and I have a finished product.And boy is it loud! We'll need to be careful we don't blow the amp inside the Lidl speakers or damage the speakers themselves. Mrs D'Wife, who ran 10 miles on the treadmill today (10 miles!), approves of the improved volume level too.

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/04/DSCF2596.jpg"><img class="aligncenter size-full wp-image-987" alt="DSCF2596" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/04/DSCF2596.jpg" width="500" height="375" /></a>

I highly recommend the <a href="http://tangentsoft.net/audio/cmoy-tutorial/assy.html">CMoy kit</a> if you are struggling with audio volume levels on anything, not just the RPi.At some point I'll draw out my layout to save others the hassle of figuring out the original layout. Hit me with any questions below.

UPDATE 1: I completely forgot to do a costing on this. Whilst the overall spend for me was 32.45 (incl P&amp;P), this includes some giant packs of resistors, capacitors and LEDs that I have been using on multiple projects. If you can manage to get exactly the amount of each thing you need, then the entire amplifier only costs 6.59. That's obviously excluding the power supply, solder, tools and the glue from the glue gun. You will find it difficult to just buy 1's and 2's of things. You can do it in Maplin but it'll cost you a lot more. You can also do it on sites like Farnell but they have a minimum order of 20.

So either buy the bigger packs on the basis that you'll be making other things or do it as part of something like a Coder Dojo where lots of you pitch in together to make lots of these.

<iframe width='500' height='300' frameborder='0' src='https://docs.google.com/spreadsheet/pub?key=0AlXqHmc-oA0odGZ2ZlVVTGRpZmpSM3IzS1U0N2pOY0E&single=true&gid=0&output=html&widget=true'></iframe>