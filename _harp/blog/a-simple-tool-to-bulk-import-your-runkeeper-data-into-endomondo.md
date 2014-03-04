#"A simple tool to bulk import your RunKeeper data into Endomondo"

UPDATE 17th Aug 2013: The tool should now be able to import Sports Tracker files into Endomondo too.

TL;DR - <a href="https://github.com/conoro/runkeeper2endomondo/blob/master/runkeeper2endomondogui.exe?raw=true">Download</a> the Windows RunKeeper to Endomondo tool.

<a href="https://github.com/conoro/runkeeper2endomondo"><img class="size-full wp-image-942 aligncenter" title="rk2em_01" alt="" src="http://conoroneill.net/wp-content/uploads/2013/03/rk2em_01.jpg" width="467" height="339" /></a>

I've been using <a href="http://runkeeper.com/">RunKeeper</a> as my main mobile running app since January of last year. I liked it so much, I moved to the paid "Elite" tier pretty quickly. For almost a year, I really couldn't fault it and liked the social interactions with other Irish users along with its rock solid stability.

Then in December, it all went to hell. Whatever they changed in the Android App around the end of the year made a complete mess of the GPS tracking. Every run looked like I was a drunk Mr Incredible, staggering from one side of the road to the other in a single step.

I ran a bunch of tests and compared the data to other tracking apps like Google My Tracks. They confirmed that the problem wasn't the phone/OS/location/weather/time/mood or even the moon, the problem was RunKeeper. Even worse, my wife's RK on iPhone was showing similar rubbish data on the same route! Given the terrible mobile signal in Old Chapel, is it possible that RK's inability to live upload location actually trashes the location data itself?

After bitching and moaning for a few weeks and submitting a problem report, the RunKeeper people told me the all-new V3.0 should be better. And overall the accuracy was much improved, but now the altitude data is rubbish. And for some bizarre reason, they have removed functionality like the Map view in Android.

I expressed my annoyance in a status update on RK and was interested to find two other Irish runners who are equally annoyed by the problems of the past few months and RK's seeming lack of urgency with fixing the core functionality of their product. And we are all paid users, not freeloaders.

I decided to check out alternatives and quickly landed on <a href="http://www.endomondo.com">Endomondo</a>. Initial impressions are that the mobile app is nice but very laggy on a HTC Sensation, the web-app is dog-ugly but very functional and there are a _lot_ more of my Facebook friends on it than on RunKeeper. It also seems to be more of a generic activity app and I like the challenges they set.

But then I ran into a problem. I'm not moving Apps unless I can keep my running history. I keep a record of all my activity on a Google Doc spreadsheet but that obviously doesn't have the GPS data. RunKeeper have an excellent API and also provide a full dump of all your GPS traces as a zipped GPX file. The problem is Endomondo, it can only import one GPX file at a time. And life is too short for that nonsense.

So I sat down and decided to create a simple importer which takes all of your unzipped GPX files and concatenates them into one large GPX file which Endomondo can handle. Once imported into Endomondo, the activities all appear separately as you'd expect.

I did my usual programming-by-Google-Search and found some simple generic Python GPX concatenation code (on GitHub, natch) which I had to modify to work with RK data. Of course I realised that the average runner is not going to be able to use a Python script with installation dependencies so I used <a href="http://www.py2exe.org/">Py2Exe</a> to build an executable. Then I realised that most people nowadays won't be comfortable with a command line app and I had a quick poke around <a href="http://qt-project.org/wiki/PySide">PySide</a>. A bit of messing with some example code and I had a nice GUI. Thennnnn I found <a href="http://www.pyinstaller.org">PyInstaller</a> which gives me a single windows EXE without needing an installer etc.

And so finally I get to the point. A simple Windows App which you point to a directory containing all your unzipped GPX files from RunKeeper and which generates a single endomondo.gpx file which you can import into Endomondo.
<h2>Converting from RunKeeper to Endomondo</h2>
<ol>
	<li>You export from RunKeeper as follows:
<ol>
	<li>Click on your name in the top right of the main screen</li>
	<li>Select My Settings</li>
	<li>Scroll down and you'll see a small blue link on the bottom left to "Export Data"</li>
	<li>Click that and follow the instructions</li>
</ol>
</li>
	<li><a href="https://github.com/conoro/runkeeper2endomondo/blob/master/runkeeper2endomondogui.exe?raw=true">Download runkeeper2endomondogui.exe</a></li>
	<li>This is a Windows Executable. You don't know me from Adam. Please run a virus checker on it after you download.</li>
	<li>runrunkeeper2endomondogui.exe</li>
	<li>Use the File menu to select the directory with all of your RK GPX files</li>
	<li>Currently the import only does those GPX files. So it is missing all of my manually entered treadmill runs (and there are a lot of those).</li>
	<li>My code is very rough and may show "not responding" as it grinds through larger files. It tells you what it is doing in the main window so just be a bit patient, particularly if you have an older PC.</li>
	<li>When it is done, you'll have a new endomondo.gpx file in the same directory as the exisiting files</li>
	<li>I've read that Endomodo craps-out on files over 10MB, so if the endomondo.gpx file is bigger than that, you'll have to do this process in batches with sub-sets of the RK files. As a guide, my 47 GPX files including several half marathons and a full marathon come in at 4MB.</li>
	<li>You import into Endomondo as follows:
<ol>
	<li>Once my tool is done, go to Endomondo and select "New Workout"</li>
	<li>Select the "Import from File" option</li>
	<li>Point it to the endomondo.gpx file</li>
	<li>Endomondo will appear to hang when you do the import. Leave it running and then open another browser tab and check your activity history. When it is fully populated with the imported activities, you can then safely close the original browser tab.</li>
	<li>That's it, you're done</li>
</ol>
</li>
</ol>
<a href="https://github.com/conoro/runkeeper2endomondo"><img class="size-full wp-image-943 aligncenter" title="rk2em_02" alt="" src="http://conoroneill.net/wp-content/uploads/2013/03/rk2em_02.jpg" width="466" height="339" /></a>

The code has a few path dependencies on Windows but it should be trivial to change it to work on OS X and Linux.

All of the source code is, as always, <a href="https://github.com/conoro/runkeeper2endomondo">up on GitHub</a>, for you to change as you see fit

Questions or Problems or Expressions of Horror at the awfulness of the code? Leave a comment here. Not on Facebook or Twitter.