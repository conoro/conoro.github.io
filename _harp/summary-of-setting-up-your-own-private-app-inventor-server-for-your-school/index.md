#"Summary of Setting Up Your Own Private App Inventor Server For Your School"

It turns out that the setup of a private App Inventor server is easier than I thought. If you are used to Amazon EC2, it'll be a doddle for you. The Google App Engine bit is absolutely trivial. Full <a href="https://docs.google.com/document/d/124V0q-Jzs8n9LqAlFKnSWxGLei_KZAUQGJUZwlALVws/edit?hl=en_US">MIT documentation is here</a>.
<ol>
	<li>Go to appengine.google.com and sign-up with a GMail/GApps address.</li>
	<li>Create an App. This only means giving the App an name.You'll have to confirm your identity by SMS from Google. We used a variation of the name of our school as the app name so that our private App Inventor will be accessible at http://nameofourschool.appspot.com</li>
	<li>Download and install the <a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">latest Oracle/SUN JDK</a>on your PC</li>
	<li>Download the <a href="http://code.google.com/appengine/downloads.html#Google_App_Engine_SDK_for_Java">App Engine Java SDK</a></li>
	<li>Unzip it to somewhere like c:\apps\appengine-java-sdk-1.6.1</li>
	<li>Download the latest <a href="http://appinventoredu.mit.edu/download-jar-files">App Inventor zip</a> (currently Dec 20th 2011)</li>
	<li>Unzip</li>
	<li>Then un-gzip and un-tar theappinventor-Dec-20.tgz contained within. (Use 7-Zip for all these different archive formats if you are on a Windows PC)</li>
	<li>Navigate down into the the directory tree created by all this unzipping and copy the appinventor sub-directory you find so that it is at something like c:\apps\appinventor</li>
	<li>Now you need to setup a Build Server if you want to be able to download the Apps onto real phones. I did this on Amazon EC2</li>
<ol>
	<li>Go to <a href="http://aws.amazon.com">Amazon AWS</a> and Sign-Up for a new account</li>
	<li>You will have to provide a Credit Card but it won't be charged</li>
	<li>You will be verified by an automated phone call</li>
	<li>Once the account is fully live, go to the AWS Console and make sure you are viewing EC2 instances in EU-West (Ireland)</li>
	<li>Create a new Amazon Linux AMI Micro 32-Bit Instance in Ireland using their new Quick Wizard. (Go for 32-bit to save hassle)</li>
	<li>This is free for a year so you don't have to worry about cost. Maybe a tenner a month after that?</li>
	<li>Grab the PEM SSH Key and do the usual messing to convert it to a Putty ppk file so that you can SSH to the instance.</li>
	<li>SSH to the instance</li>
	<li>Grab that App Inventor zip from Step 6 using wget on the EC2 instance</li>
	<li>Do all the unzipping etc again, but this time you want the other file contained within (for-BuildServer.tgz). Un-tar and un-gzip thatfor-BuildServer.tgz file</li>
	<li>I found that the OpenJDK that comes pre-configured on the Amazon Linux instances threw an error when I tried to build using it. So I installed the Oracle/SUN JDK instead</li>
<ol>
	<li><del>Go to<a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk-7u2-download-1377129.html">http://www.oracle.com/technetwork/java/javase/downloads/jdk-7u2-download-1377129.html</a></del></li>
	<li>It appears Java 1.7 has issues with signing the Apps. So you have to use the older 1.6 instead</li>
	<li>Go to<a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk-6u30-download-1377139.html">http://www.oracle.com/technetwork/java/javase/downloads/jdk-6u30-download-1377139.html</a></li>
	<li>Download the 32-bit RPM bin for Linux using wget on the instance</li>
	<li>sudo sh thenameofthefile.rpm.bin</li>
	<li>sudo alternatives --install /usr/bin/java java /usr/java/latest/bin/java 1500</li>
	<li>sudo alternatives --set java /usr/java/latest/bin/java</li>
</ol>
	<li>Now you can run the build server by going to the for-BuildServer directory you created in Step J above and just running<strong>./launch-buildserver</strong></li>
	<li>In the AWS Console, Open up port 9990 in the security groups</li>
	<li>Copy the public DNS name of your server from the AWS console</li>
</ol>
	<li>Now back on your Windows machine, go to c:\apps\appinventor\war\WEB-INF\appengine-web.xml</li>
<ol>
	<li>Change localhost in&lt;property name="build.server.host" value="localhost:9990" /&gt; to the public DNS name of your build server</li>
	<li>Change&lt;property name="use.whitelist" value="false"/&gt; to be true</li>
	<li>Save the file</li>
</ol>
	<li>Now editc:\apps\appinventor\war\whitelist and add the GMail/GApps addresses of every account that you are allowing to use this App Inventor instance. In our case that it me, 2 teachers and 30 pairs of kids, all using the school Parent's Association GApps email addresses that I created.</li>
	<li>In a Windows Command Prompt, cd to the c:\apps\appengine (or whatever) directory and then enter <strong>c:\apps\appengine-java-sdk-1.6.1\bin\appcfg.cmd -A myapplicationID update war</strong> (where myapplicationID is obviously the name you picked in Step 2)</li>
	<li>The last step builds and uploads App Inventor to App Engine and runs it. If, after a few minutes, you get a Success message then you are in business! Just go to http://nameofyourapp.appspot.com and you can login with your GMail/GApps account and start using App Inventor just like on the original Google site.</li>
</ol>
As I said in the last post, the only major concern is what number of simultaneous users will kick us out of the free tier on App Engine. Also, if lots of people are packaging Apps for phones, the Micro EC2 instance will take an age to build them. This isn't a huge issue for us as we spend 99% of our time either using the emulator or a live non-packaged debug session on the phones.

Shout if you have any questions or comments.

My next App Inventor post will be a status report on how the pilot in our school is going.