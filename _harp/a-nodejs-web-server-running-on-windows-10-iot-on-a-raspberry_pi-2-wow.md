I've been Snarky McSnarkenstein about Windows 10 IoT on Raspberry Pi for quite a while. When it was originally announced, everyone seemed to think they were getting full-blown Windows for free on Pi. Many still think this. What you actually get is a GUI-less version of Windows on to which you can deploy Universal Apps (and others). So unlike Raspbian on Pi, you can't actually develop on it, you have to have full Windows 10 running somewhere else to develop, compile, deploy and debug. Or as I said on Twitter:

<blockquote class="twitter-tweet" lang="en"><p lang="en" dir="ltr">&quot;Install Visual Studio 2015 on your PC to develop Win10 IoT Apps for <a href="https://twitter.com/Raspberry_Pi">@Raspberry_Pi</a>&quot;. Install Fortran on your PDP-11 to use your ZX Spectrum?</p>&mdash; Conor O&#39;Neill (@conoro) <a href="https://twitter.com/conoro/status/593662573347794944">April 30, 2015</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

OK, snark over. Let's give this thing a go.

Several hours later......

Installation is still a nightmare in this Preview version. Between clicking on hidden EULAs and installers failing with nonsense errors, not to mention having to install Windows 10 Preview in VirtualBox, this is not for the faint of heart. The RaspberryPi bit was ok and creating the image on an SD Card worked fine. Win 10 IoT booted first time with no issues.

After several more rounds of messing with Visual Studio, I followed the Hello World Tutorial and pointed it at my Pi.

![Win 10 IoT](http://conoroneill.net.s3.amazonaws.com/wp-content/uploads/2015/05/Win_10_IOT_RPi.jpg)

I was rather shocked to see it worked!

![Screen](http://conoroneill.net.s3.amazonaws.com/wp-content/uploads/2015/05/Win_10_IOT_RPi_02.jpg)

That was the point the scales fell from my eyes. This is actually a very powerful offering to anyone who uses Microsoft tools already. You can build Drag n Drop Universal Apps which deploy just as easily to the Pi as they do to Windows Desktop/Tablets/Phones. I think Kiosks and Control Dashboards could be a big seller here, particularly for the Pi Compute Module. Obviously Visual Studio itself is damned powerful and is considered by most people, even MSFT haters, to be the most powerful IDE available today.

Then I decided to go a step further. Could I get a Node.js program to deploy?

A bunch more stupid installers later........

![Node.js on Vis Studio](http://conoroneill.net.s3.amazonaws.com/wp-content/uploads/2015/05/Win_10_IOT_RPi_04.jpg)

Deploy the code, annnnnnd

![Node.js on Pi](http://conoroneill.net.s3.amazonaws.com/wp-content/uploads/2015/05/win10_iot.jpg)


Oh wow, that is a bit brain melting. So now I have a web-server on Node.js on Windows on Pi on ARM, all debuggable with some kick-ass tools on my PC.

The only major criticism I can make is that I'd like every single piece including VisStudio and all the add-ons to be installable with a command-line package manager. Much easier for everyone.

I doff my cap to you Mr Nadella, this really is the new Microsoft.

![Cap](http://conoroneill.net.s3.amazonaws.com/wp-content/uploads/2015/05/doff_cap.gif )
