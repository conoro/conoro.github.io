#"Patriot PBO Core is a very nice cheap Media Player device"

I've written at length about our media setup at home. The main box remains a low-end PC with a decent graphics card and HDMI-out. It mainly runs <a href="http://xbmc.org/">XBMC</a>but we switch over to Windows Media Centre for playing/recording satellite/terrestial.

We have had two old XBOXes running XBMC for years and they are awesome. Their only drawback is that they don't have enough welly to play h.264 so no MP4s, MKVs, 720p or 1080p.

Last year I got a tiny media playing box called the HDVP-2. I put a 500GB harddisk inside it and it plays everything. It has HDMI, Composite, LAN, USB and an option for WIFI. It's our travel media box and is perfect for hotels or visiting parents and in-laws. However, it has four problems:
<ol>
	<li>It can't browse networks shares over SMB, it only does UPNP. We have all media centralised and shared out over SMB. I use TVersity for UPNP sharing but I just hate the whole UPNP approach.</li>
	<li>It loses audio-video sync on many AVIs very quickly and doesn't have a manual audio-offset like XBMC</li>
	<li>It doesn't spin down the internal harddisk so you have to unplug it except when playing videos</li>
	<li>They aren't making it any more so there will be no bug-fixes or updates and I haven't been able to find any Open Source software that runs on it.</li>
</ol>
Then two weeks ago, one of the XBOXes died, the one we have setup for the treadmill. I refused to use the HDVP-2 due to the AV sync problem and wondered what the best approach might be. I was tempted by one of those dirt-cheap ROKU boxes and discovered they can play local media using a Private Channel trick, in addition to Netflix, but I figured it'd be as fiddly as UPNP on the HDVP-2.

Then Irememberedthe <a href="http://www.amazon.co.uk/Patriot-PCMPBO25-Office-Definition-Player/dp/B002Q4U9PY/ref=sr_1_1?ie=UTF8&amp;qid=1329660253&amp;sr=8-1">Patriot PBO Core</a> that I'd discussed with <a href="http://twitter.com/swhelband">@swhelband</a> last year. He had bought one and tweeted very positively about it. A quick check revealed it was still for sale on amazon.co.uk for 60. I made sure it had SMB support and then happily ordered. It's a very similar spec to the HDVP-2 but executed far better, so you get:
<ol>
	<li>Very high quality metal case which can take an internal 2.5" hard-disk if you want</li>
	<li>HDMI-out</li>
	<li>Composite-out</li>
	<li>Up to 1080p</li>
	<li>Plays every format you can throw at it</li>
	<li>LAN with playing of both SMB and UPNP sources</li>
	<li>USB</li>
	<li>Remote control</li>
</ol>
<a href="http://www.patriotmemory.com/products/detailp.jsp?prodline=6&amp;catid=69&amp;prodgroupid=159&amp;id=895"><img class="alignnone size-large wp-image-592" title="PBO_Core_IsoRight" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2012/02/PBO_Core_IsoRight-1024x1024.jpg" alt="" width="584" height="584" /></a>

We've have it for over a week now and the experience has been mixed. The core functionality is rock solid and I'm sure it works perfectly as a local media player. The main issues we've had have been around network playing. The default firmware has some features which become really annoying, such as:
<ol>
	<li>Insists on checking size etc of every file in a directory as you scroll through. Unbearably slow when doing this over the network.</li>
	<li>Pops-up network access speed as you scroll through files. As if you care!</li>
	<li>Doesn't have an "already watched" indicator which is a bit of a pain</li>
	<li>Won't let you add top-level shortcuts to specific directories on specific networked machines so you can jump quickly to your stuff after power-on.</li>
</ol>
Luckily the PBO Core is using a reference design (I assume from Realtek) and there are other boxes out there with the same hardware but improved software. I finally found one that avoids all thenetworkproblems <a href="http://patriot-box-office.wikidot.com/pbo-alternative-custom-firmwares">here</a>. (I used the v3.2 Mod from Shizzl of the MedeBO firmware). Upgrading is doddle and you just pop the file onto a USB stick and select "System Update" on the PBO.

I'm now a very happy bunny and have exactly what I need. Sure it's nowhere near as slick as XBMC but for 60 I'm not going to complain too much.

Unfortunately it shares one downside with the HDVP-2. It's pretty much end-of-lifed and hasn't had a software update since early in 2011. I read recently that Patriot is releasing a much higher-spec Android-based device soon. But if the PBO Core meets your needsthen the lack of updates is not a problem.

Speaking of Android devices, Richard Hearne spotted <a href="http://www.iboum.com/pr/him900a.php">this awesome looking piece of kit</a>. It is more than double the price of the PBO but the feature list is damned impressive.

I also finally gave in and replaced the 10 year old Philips portable 14" TV as the display and got a really nice <a href="http://www.amazon.co.uk/LG-IPS225V-Advanced-Performance-Widescreen/dp/B0060LCBRI/ref=sr_1_1?s=computers&amp;ie=UTF8&amp;qid=1329660920&amp;sr=1-1">LG 22" IPS, LED 1080p</a> display from Amazon for 110 last week too. The picture quality with this combo is amazing.

Of course if you have an Android phone like a HTC Sensation, you could just use the MHL HDMI-out to achive most of the above. I bet one of the Bluetooth remotes or headset controls would do the trick for selecting the movies etc. I must try mine in a network streaming configuration.

Oh I'll also blog shortly about using a US VPN and PlayOn to deliver Netflix over UPNP to the PBO Core. To be honest it was so much hassle you should just buy a Roku.

&nbsp;