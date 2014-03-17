I'll shortly be moving this entire blog from WordPress to [HarpJS](http://harpjs.com/docs/deployment/github-pages) generated static pages over on GitHub. It hasn't been as smooth a process as I'd hoped but I've learned lots. We're also using HarpJS in a work context and it works great there running under Node. I'll write it all up either this weekend or next.

Then this evening I asked myself the silly question "I wonder can I run Node.js on Android?". It turns out you can. But it's a teensy bit fiddly to get going. The biggest problem turned out to be Android 4.4 KitKat which made the first few steps the hardest.

![Debian on Android](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/03/harp_android_02.jpg "Debian and Harp")

You are going to be running Debian Linux in a chrooted environment. For some weird reason I never even knew this was possible until today! In fact there are multiple projects out there that enable this. The main thing, of course, is that your phone must be rooted. A Stock Samsung ROM is fine and I'm sure GPE and Cyanogen would also work.

I initially tried "Linux Deploy" from the Android Play Store but hit a brick wall with it mounting the external SD card on the S4. I then tried [Linux On Android](https://play.google.com/store/apps/details?id=com.zpwebsites.linuxonandroid), also from the Play Store and hit similar problems, so I dug a bit deeper and got to the bottom of it. 

All of this is easier if you connect up an external keyboard to your S4. I've found that a [cheap USB OTG](http://dx.com/p/micro-usb-otg-cable-for-android-tablet-gps-mp3-phone-black-276901) cable works brilliantly for thumbdrives, mice, keyboards and even the 2.4GHz combo keyboards you get with Android TV sticks.

* Install [Complete Linux Installer](https://play.google.com/store/apps/details?id=com.zpwebsites.linuxonandroid), [BusyBox](https://play.google.com/store/apps/details?id=stericson.busybox), [Chainfire SuperSU](https://play.google.com/store/apps/details?id=eu.chainfire.supersu), [Terminal Emulator](https://play.google.com/store/apps/details?id=jackpal.androidterm) and  [androidVNC](https://play.google.com/store/apps/details?id=android.androidVNC) from the Play Store 
* Download the "Small EXT4" LinuxOnAndroid [Debian Jessie image](http://sourceforge.net/projects/linuxonandroid/files/Debian/Testing/Small/) from Sourceforge. Unzip that. Create a directory on your phone's SD card called debian and copy over the two unzipped files into that directory
* Using a File Explorer on your S4 that can enter root mode (e.g. [ES File Explorer](https://play.google.com/store/apps/details?id=com.estrongs.android.pop)), browse to /data/data/com.zpwebsites.linuxonandroid/files/
* rename busybox to busybox.bak
* edit bootscript.sh 

find this bit:

    elif [ -d /Removable/MicroSD ]; then
    echo "mounting /Removable/MicroSD to $mnt/external_sd..."
    $bbox mount -o bind /Removable/MicroSD  $mnt/external_sd

and change it to the following:

    elif [ -d /storage/extSdCard ]; then
    echo "mounting /storage/extSdCard to $mnt/external_sd..."
    $bbox mount -o bind /storage/extSdCard  $mnt/external_sd


* Save that
* Then run the Complete Linux Installer App which mainly consists of instructions. The only important step is to pick Debian in the drop-down list and change the settings so that the image directory is set to where you copied those image files to e.g. /storage/extSdCard/debian
* Then just tap the Start Linux button
* You may see some initial errors but if all is basically ok, you'll get a first-time-run set of Debian questions asking for password etc.
* And you are done from a Debian perspective. You can even setup the VNC server to have a basic UI but I haven't got that working properly yet (blank screen with X pointer).

So now that we have an almost bog-standard Linux setup, you can pretty much do what you normally would. I have run into some small glitches but found workarounds quickly for them all. I should probably setup a non-root user at some point too. In any case, this is how I setup HarpJS:

    apt-get update
    apt-get install nodejs nodejs-legacy
    apt-get install git curl build-essential openssl libssl-dev
    wget https://npmjs.org/install.sh
    chmod 755 install.sh
    ./install.sh
    npm install --unsafe-perm -g harp
    mkdir gitwork
    cd gitwork
    git clone https://github.com/conoro/conoro.github.io.git
    cd conoro.github.io
    harp compile _harp ./

The two bits of oddness above were getting an error from curl trying to install npm, so I used wget. Also, very very strange node-gyp permissions errors installing Harp globally when it came to node-sass (hence the --unsafe-perm). Node-sass also causes problems on Windows I've noticed.

![Harp on Android](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/03/harp_android.jpg "Harp and Android")
And that's it about it. Except for.......

```
apt-get install emacs
```

How could I not? :-)

![Emacs on Android](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/03/emacs.png "Emacs and Android")

So I edit Markdown blogposts in Emacs, compile with Harp and commit to GitHub to publish. Simples.
