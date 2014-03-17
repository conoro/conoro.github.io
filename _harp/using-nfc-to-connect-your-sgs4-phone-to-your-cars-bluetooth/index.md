#"Using NFC to connect your #SGS4 phone to your car's Bluetooth"

I've been wanting to play with NFC for ages so when I got an SGS4 recently, my chance finally came. I ordered a pack of 10 stickers from <a href="http://www.shop4nfc.com/product-details/NTAG203-type-2-nfc-tags-shop4nfc">Shop4NFC.com</a> in China for $8.99 and they arrived about a week later.

To try them out, I installed the <a href="https://play.google.com/store/apps/details?id=com.jwsoft.nfcactionlauncher&amp;hl=en">NFC Task Launcher</a> and <a href="https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&amp;feature=search_result#?t=W251bGwsMSwxLDEsIm5ldC5kaW5nbGlzY2guYW5kcm9pZC50YXNrZXJtIl0.">Tasker</a> Apps. The former enables you to do things like change Wifi settings, volume, display, sync email or even Tweet when it detects a configured NFC sticker. One of the most common use cases is for people to have a sticker at work which puts the phone on mute when you lay the phone on top of it.

Tasker is a general automation app that is not reliant on NFC and can do a ton of different complex things based on context and actions. The reason I installed it is that it can do more complex stuff with Bluetooth than NFC Task Launcher.

I was really disappointed to discover that Bluetooth on the SGS4 is as buggy and glitchy as every other Android phone I've owned. Google's announcement at I/O yesterday that they are going to improve things this year doesn't convince me. They've had 4 years to get it right. The fact that they broke access to Wiimotes etc in 4.2 tells you just how bad they are at Bluetooth.

The place where this causes me the most grief is in the car. All I want is for the bloody phone to auto-connect over A2DP to my Lidl Car stereo when the car is on so I can play my podcasts and listen to music. In theory the SGS4 can do this but simply fails to, 9 times out of 10. HTC's Android was similarly bad. AOSP/Cyanogen in some versions worked perfectly but it was a crapshoot whether any version would work or not.

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/05/nfc.jpg"><img class="aligncenter size-full wp-image-1041" alt="nfc" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/05/nfc.jpg" width="500" height="707" /></a>

So I thought NFC might solve this. Rather than letting Android itself auto-connect, use Tasker to force a connection. And whaddya know, it seems to work. I tap the phone off the sticker after I turn on the ignition and it connects over Bluetooth to the car stereo. It's only failed once in 10 and I'm pretty sure that's because I didn't hold the phone to the sticker long enough.

Actually, that's really the only downside of NFC that I've seen so far. A swipe or momentary tap is not good enough, it requires a very distinct touch and hold for a moment before the tag powers up and sends its ID info to the phone. You can tell by the audio cue on the SGS4 whether it worked or not.

Now I need to find uses for the other 9 stickers. Suggestions?

&nbsp;