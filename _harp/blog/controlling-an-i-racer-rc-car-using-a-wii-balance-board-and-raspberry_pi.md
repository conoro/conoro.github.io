#"Controlling an i-racer RC car using a Wii Balance Board and @Raspberry_Pi"

I love watching ideas bounce back and forward between people on Twitter and see them grow. The best for me recently started when <a href="http://www.theverge.com/2013/5/2/4292712/fitscales-wii-fit-balance-board-connected-scale">The Verge posted a story</a> about an OpenSource Android App which basically turned a <a href="http://wiibrew.org/wiki/Wii_Balance_Board">Wii Balance Board</a> into a Withings weighing scales, including RunKeeper and Fitbit integration. I retweeted it and it was picked up by <a href="https://twitter.com/joedesbonnet">Joe Desbonnet</a>. He realised you could also do some interesting things with the Balance Board and a Raspberry Pi and started hacking. Which of course made me realise I could control the i-racer with it!
 
Here's a wee video of it in action:

httpv://youtu.be/8cdn_LFKQXI

Apologies for the mobile interference in the audio. I was using my new SGS4 to SSH to the Raspberry Pi to kick off the Python code. The ConnectBot guys really need to fix the microscopic font on screens like the SGS4!

The car isn't very fast in the video as the Lego added a lot of weight and I hardcoded the speed to 50%. We'll try again next weekend using a lighter shell, full speed and tarmac instead of cobblelock.

<h2>Technical Nitty Gritty (not too Gritty!)</h2>
My initial experiments with the Balance Board did not go well. Eventually I discovered that the version of the cwiid Wii library that is available on Raspberry Pi (and Ubuntu etc) is not able to deal with the Balance Board. See <a href="https://bugs.launchpad.net/ubuntu/+source/cwiid/+bug/509246">this bug</a>. I applied <a href="https://launchpadlibrarian.net/115501163/balanceboard.patch">the patch</a> and re-built my own deb files. To use them, just unzip them on the raspberry pi and install like so:

[code]
wget https://github.com/conoro/iracer-controllers/raw/master/iracer_balance_board/cwiid_for_balance_board.zip
unzip cwiid_for_balance_board.zip
sudo dpkg -i *.deb
[/code] 

The rest of the time was just spent tweaking the numbers so that I could interpret someone leaning in various directions irrespective of their weight. It's still not great but works for me, a 7yo and a 6yo.

All the old i-racer Bluetooth code carried over unchanged from our <a href="http://conoroneill.net/makey-makey-raspberry-pi-iracer-bluetooth-cheese-controlled-car-ccc/">Cheese Controlled Car</a>. Follow the instructions there for installing various Bluetooth bits and bobs on the Raspberry Pi.

I was very surprised that I could talk to both the i-racer and the Balance Board over the same $2 Bluetooth adapter. I was sure I'd end up having to use two adapters.

You can, as ever, <a href="https://github.com/conoro/iracer-controllers/tree/master/iracer_balance_board">grab the code from Github</a>. The only changes you need to make in the code are to set the Bluetooth MAC addresses of both the Balance Board and the i-racer.

Sidenote: The Android App was a dead end. It doesn't work on Android 4.2 because Google decided to upgrade their broken Bluetooth stack and actually managed to make it worse.

Any questions, leave a comment.

<h2>Only if you really need it: Building those cwiid libraries yourself</h2>

[code]
sudo nano /etc/apt/sources.list
[/code]

Add the following line:
[code]
deb-src http://archive.raspbian.org/raspbian wheezy main contrib non-free rpi
[/code]

Then do the following:

[code]
mkdir ~/build
cd build
apt-get source python-cwiid
apt-get build-dep python-cwiid
cd cwiid-0.6.00+svn201/
[/code]

Then edit these three files and add the changes from https://launchpadlibrarian.net/115501163/balanceboard.patch (or run "patch" if you are familiar with that)

[code]
nano libcwiid/cwiid_internal.h
nano libcwiid/process.c
nano libcwiid/thread.c
dpkg-source --commit
dpkg-buildpackage -us -uc
cd ..
sudo apt-get remove python-cwiid
sudo dpkg -i *.deb
[/code]