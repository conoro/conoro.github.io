For some odd reason, Google and others stopped auto-generating armhf binaries of [Chromium](https://www.chromium.org/Home) last year. Version 37 was the last one I could find. Luckily the Ubuntu guys have been building it all along and their version 45 installs really easily on the [all-new Debian/Raspbian Jessie](https://www.raspberrypi.org/blog/raspbian-jessie-is-here/) on your Raspberry Pi 2.

![Pi loves Chromium](http://conoroneill.net.s3.amazonaws.com/wp-content/uploads/2015/09/pi_heart_chrome.png)

This was a surprise as this kind of thing usually degenerates into dependency hell.

Here you go:

```bash
wget http://launchpadlibrarian.net/218525709/chromium-browser_45.0.2454.85-0ubuntu0.14.04.1.1097_armhf.deb
wget http://launchpadlibrarian.net/218525711/chromium-codecs-ffmpeg-extra_45.0.2454.85-0ubuntu0.14.04.1.1097_armhf.deb
sudo dpkg -i chromium-codecs-ffmpeg-extra_45.0.2454.85-0ubuntu0.14.04.1.1097_armhf.deb
sudo dpkg -i chromium-browser_45.0.2454.85-0ubuntu0.14.04.1.1097_armhf.deb
```

It even appears correctly in your desktop menus!

Apart from security fixes and the latest Chromium features, you also get full access to most of the Apps and Extensions in the Chrome Web Store. This includes the [Espruino](http://www.espruino.com/Order#distributors) Chrome [App](https://chrome.google.com/webstore/detail/espruino-web-ide/bleoifhkdalbjfbobjackfdifdneehpo), which means you or your kids now have everything you need to develop and deploy Embedded and IoT projects for under €100. Honestly, that's revolutionary.

![Pi loves Espruino](http://conoroneill.net.s3.amazonaws.com/wp-content/uploads/2015/09/pi_plus_espruino_small.jpg)
