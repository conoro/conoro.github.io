#"First two trivial parts of getting App Inventor working on Raspberry Pi done"

I've been playing a small bit with the Raspberry Pi VM on VMware to see what's possible and what isn't. One thing I am eager to try when it arrives on the week of May 14th (YAY!), is to get App Inventor working on it.

There are three basic user parts to App Inventor. The browser-based Designer, the Java-based Blocks Editor and the Phone Emulator (if you don't have a phone).

Yesterday I got the first two bits working with about 2 minutes work. All you need to do is install the OpenJDK. <del>SUN</del>Oracle Java is not available yet.

<a href="http://conoroneill.net/wp-content/uploads/2012/04/appinventor_raspberrypi.png"><img class="alignnone size-large wp-image-706" title="appinventor_raspberrypi" src="http://conoroneill.net/wp-content/uploads/2012/04/appinventor_raspberrypi-1024x888.png" alt="" width="584" height="506" /></a>

The bit that will need more work is the emulator. I think. Ye see, I grabbed the code for the Linux version of the emulator and followed the simple instructions to build it. Then I saw it was building for i386 and of course the RPi is ARM-based. Damn.

A bit of poking around and I realised we were almost in a recursive loop. I was running ARM Linux in qemu i386 emulator on a Virtual Machine and I was trying to run an ARM emulator inside a another qemu i386 emulator inside that. Yes my head exploded too.

But then sense prevailed and I realised that Android is ARM and RPi is ARM, so do we need an emulator at all, or just an Android image compiled for ARM11 inside some sort of wrapper/container?

As an old Embedded guy I should be all over this but I've forgotten more than I ever learned about cross-compiling and building OS images. Anyone have any ideas on where to start? I popped a question on the relevant App Inventor Google Group too.

Of course all of this may be moot if the 256MB of RAM and 700MHz CPU is not enough to support all of this. But it's worth a try.