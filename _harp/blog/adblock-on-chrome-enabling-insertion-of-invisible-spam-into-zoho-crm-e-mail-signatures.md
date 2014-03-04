#"AdBlock on Chrome enabling insertion of invisible spam into Zoho CRM e-mail signatures"


 <p>I emailed a potential client yesterday who replied that she couldn't read my email as it had crashed her email client. She also said that the email was huge.I had sent the email using Zoho CRM and when I checked it, it looked fine. Only a few lines long.So I sent myself a test message which also looked fine.</p>
<p>Then I did view-source on the message. Holy Crap. Hundreds of lines of HTML with ads inserted all over it. Now wonder her email crashed.</p>
<p>The bit that had me really worried was the I sent it from an Ubuntu machine which "shouldn't" suffer from such exploits.</p>
<p>I went into Zoho and couldn't see where it could have happened. Then I had the aha moment (no, not Morten) and checked my Signature setting. Damn it looked fine. Wait, try view-source again. All the bastard HTML there in all it's glory.</p>
<p>I was able to reliably replicate the problem. Paste text signature in Zoho field, save, re-open, view-source, see spam.</p>
<p>I then tried it on Firefox. It didn't have the problem. Weird.</p>
<p>Then Windows 7. Chrome - bad. Firefox - good. And in a shocker, IE8 - good.</p>
<p>WTF?</p>
<p>So I went over to a netbook which I booted up with a clean Ubuntu USB stick and installed Chrome. And all was well, no problem. WTF x2?</p>
<p>OK, so what is common amongst two machines but not a third, despite operating system differences? Aha, the browser extensions. Luckily I only have 3 installed so it was easy to test.</p>
<p>First I uninstalled AdBlock which I run mainly to block Flash ads since they cripple the CPU on netbooks and Ubuntu boxes.</p>
<p>Job done! Problem gone.</p>
<p>This is very very <strong>very</strong> serious. Something you install to block ads ends up causing the mailing of spam ads to your customers. Very very serious indeed.</p>
<p>I have reported it to Zoho in case they can block the problem at their end and ditto to the AdBlock people since it is more likely to be an exploit of them rather than dodgy behaviour. Here is a screen shot of some of what it was inserting:</p>
<p><div class='p_embed p_image_embed'>
<a href="http://getfile5.posterous.com/getfile/files.posterous.com/temp-2010-05-26/fmAgtvfrJJahIwiccGfHFytFlGbFFawfxyBArCgadDjFHsEeecJkmnuHkbpv/spamads.png.scaled1000.png"><img alt="Spamads" height="319" src="http://getfile4.posterous.com/getfile/files.posterous.com/temp-2010-05-26/fmAgtvfrJJahIwiccGfHFytFlGbFFawfxyBArCgadDjFHsEeecJkmnuHkbpv/spamads.png.scaled500.png" width="500" /></a>
</div>
</p>
<p></p>
 