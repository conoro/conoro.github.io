Using an S4 on a Mac Book Pro is an exercise in futility now that it and other phones no longer appear as a disk drive but as a weird media device. The Samsung Kies software doesn't help and actually seems to make things worse. If you run Windows 7 inside VirtualBox you can see the phone's storage but doesn't see it when the phone is in upgrade mode. So you can't run the usual Odin software there.

Then I found out about Heimdall, an open source tool for upgrading Galaxy phones on Windows, Linux and OSX. It looks scary and the UI is a horror but once you find out the command required, the whole thing only takes a few minutes.

So assuming you want a Stock Android 4.2.2 ROM (rooted of course) on your phone and you are coming from some other ROM like the Google Play Edition ones, then the following will do the trick on An MBP.

* Uninstall Kies if it's installed. On a Mac, you stupidly have to re-download the [Kies installer](http://www.samsung.com/uk/support/usefulsoftware/KIES/JSP) to get to its uninstall routine. Oh FFS.
* Download and install [Heimdall](http://glassechidna.com.au/heimdall/)
* Download the new 4.4.2 ROM. I [used this one](http://forum.xda-developers.com/showthread.php?t=2250824)
* Rename that file from .rar.md5 to .rar
* Install an Un-Rar tool like [UnrarX](http://www.unrarx.com/)
* If you are coming from a wildly different ROM, you'll probably have to Factory Reset. Before you do that, backup your Apps/Data using Titanium Backup and make bloody sure it backs up to SD Card, not internal memory (unlike me!).
* Power-off the phone and re-boot it by pressing Volume-Up and Power. When the bootloader menu appears, pick the factory reset option and then power-down
* Un-rar the downloaded file and you'll get a directory with a bunch of files in it.
* Put your S4 in download mode by shutting it off, then restarting it by holding Volume-Down and Power. At the prompt, press Volume-Up. Then connect it by USB to the Mac
* Open a terminal in OSX, cd to the directory that you un-rarred and type the following

```
sudo heimdall flash --APNHLOS NON-HLOS.bin --ABOOT aboot.mbn --BOOT boot.img --HIDDEN hidden.img.ext4 --MDM modem.bin --RECOVERY recovery.img --RPM rpm.mbn --SBL1 sbl1.mbn --SBL2 sbl2.mbn --SBL3 sbl3.mbn --SYSTEM system.img.ext4 --TZ tz.mbn --CACHE cache.img.ext4
```

* That's it, after a few minutes you're done, the phone will reboot and give you an all clean setup.
* Optionally Run Titanium Backup to recover your Apps/Data
