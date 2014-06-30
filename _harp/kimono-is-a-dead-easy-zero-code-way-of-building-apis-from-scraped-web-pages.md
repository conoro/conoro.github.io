Back in 2011, I [created a simple scraper](http://conoroneill.com/2011/11/17/bandon-flood-fews-open-data-now-available/) in Python to take the river level reported by the Bandon Flood Early Warning System every 15 minutes and save it in [Google Fusion Tables](https://www.google.com/fusiontables/DataSource?docid=103YIcARoxuaWT7NfZ8mVBzY554sF_3ONYC1N3DE). In 2012, [I extended it](http://conoroneill.net/bandon-flood-data-fews-now-available-on-cosmpachube/) to also save the data on [Pachube/Cosm/Xively/Fleeglrheumazoid](https://xively.com/feeds/40004/?from_cosm=true) (or whatever insane name they have this week). So you have 2.5 years of river data in tabular and graphic form. 

The code itself is very simple and just involved walking through the page (actually a bloody iframe!) to get the element I needed. But it's brittle, single use and runs on a home server behind the firewall. I also have a gap in the data in 2012 where I didn't notice that the cronjob had screwed up for 2 weeks.

Last week I heard about [Kimono](https://www.kimonolabs.com/) and really liked the sound of it. You basically point it at any web-page and it gives you a version of the page where you can select elements and get API end-points for them. So any site that has info you'd like to use or open up but where there is no existing API, can be API-ified. You need no coding knowledge to do this.

![Kimono](https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2014/06/kimono.jpg "Web Scraping")

This has huge potential to generate even more Irish OpenData without relying on developers to do the work. Given how little data has been opened up here, either officially or by OpenData enthusiasts, this can only be a good thing.

If you'd like to access the Bandon River level programatically now, [it is here as JSON, CSV and RSS](https://www.kimonolabs.com/apis/cr79egwi).

As an exercise for the reader, why not try the truly hilarious [Cork County Council Planning Enquiry System](http://maps.corkcoco.ie/planningenquiryv3/LAResources/info.aspx) which works best with Internet Explorer 5.5 or newer :-) Of course, the "accept terms and conditions button" does not work with Chrome. It looks like the same web gurus who designed Bandon FEWS also did this site, since both use 1990s-style frames, which Kimono does not handle at all. I just spent 2 mins playing with it and picked out the [central frame](http://maps.corkcoco.ie/planningenquiryv3/enquiry.aspx). But Kimono-ifying it gives a session timeout error by the CorkCoCo site. I think a small bit of effort could get this working. Any takers or do you all prefer to just talk about OpenData?

