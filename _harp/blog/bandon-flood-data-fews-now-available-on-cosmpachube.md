#"Bandon Flood Data (FEWS) now available on Cosm/Pachube"

When <a href="http://conoroneill.com/2011/11/17/bandon-flood-fews-open-data-now-available/">I announced the availablity of Open Data</a> on Google Fusion Tables for the <a href="http://bandonfloodwarning.ie/">Bandon Flood Early Warning System (FEWS)</a> last year, one suggestion that was made to me by Imogen Bertin was to put it up on <a href="http://cosm.com">Pachube</a> (now renamed to the slightly less obscure <a href="http://cosm.com">Cosm</a>). I gave it a go but couldn't figure it out. Despite providing it with the CSV link to the Fusion Table, it never did anything with the data. So I gave up due to busyness.

This evening, I had another go. This time it was worse. Anything I tried on the data feed resulted in both Chrome and Firefox hanging. I decided to bite the bullet and figure out how to post data directly rather than having them poll. Turns out it's pretty easy.

<a href="https://cosm.com/feeds/40004"><img class="size-large wp-image-766 aligncenter" title="cosm" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2012/06/cosm-1024x709.png" alt="" width="584" height="404" /></a>

Now I know this isn't exactly the model that people have in mind for the <a href="http://www.wired.com/beyond_the_beyond/2012/06/the-provisional-declaration-of-the-open-internet-of-things-assembly/">Open Internet of Things</a> but it works:
<ol>
	<li>A meter on the bridge in Bandon measures the river level.</li>
	<li>Somehow that is sent to the Bandon Flood Warning site (mobile?)</li>
	<li>It updates the level on the home page once per hour</li>
	<li>I then run a script also once per hour on an Amazon EC2 instance in Dublin, to screen scrape that value</li>
	<li>The script then saves it to a <a href="https://www.google.com/fusiontables/DataSource?docid=103YIcARoxuaWT7NfZ8mVBzY554sF_3ONYC1N3DE">Google Fusion Table</a> somewhere on the planet.</li>
	<li>I now also send that via http POST to the Cosm API</li>
	<li>You can then <a href="https://cosm.com/feeds/40004">access that data</a>via<a href="https://api.cosm.com/v2/feeds/40004.json">JSON</a>,<a href="https://api.cosm.com/v2/feeds/40004.xml">XML</a>and<a href="https://api.cosm.com/v2/feeds/40004.csv">CSV</a></li>
</ol>
Realtime it ain't! But it's a river so that speed of reporting should be fine.

I'm still waiting for someone to do a mashup with that data, rainfall data at Cork Airport and tidal data. I would but I'm having too much fun playing with Raspberry Pi and Arduino. Eventually I may join the dots and create a little Arduino+RPi weather station out in the garden which reports directly to Cosm using wifi to my house.

In the meantime, <a href="https://cosm.com/feeds/40004">enjoy</a>!

&nbsp;