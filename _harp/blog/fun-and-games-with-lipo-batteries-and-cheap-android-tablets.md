#"Fun and games with LiPo batteries and cheap Android Tablets"

The <a href="http://www.ebay.com/itm/3-7V-3500mAh-lithium-Battery-Rechargeable-Polymer-Li-Po-For-Tablet-PC-B-3768112-/321105035375?ssPageName=ADME:L:OC:IE:3160">replacement LiPo battery</a> arrived for my daughter's Eken T02A ultra-cheap Android tablet yesterday. Only 2 weeks from China which isn't bad.

<a href="http://conoroneill.net/what-the-inside-of-an-e88-android-tablet-looks-like/">As I mentioned before</a>, the Eken's battery life iscatastrophic Sometimes less than 45 mins. Even at idle, it dies in no time at all. I'm guessing one of its two cells isn't actually functional.

The eBay replacement quotes 3500mAh which I'll take with a big grain of salt. But at least it was bigger and heavier than the 2x "2000mAh" that were in the Eken.

<a href="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/05/T2eC16hHJIQE9qUHu0VFBRZTd8Hccw60_12.jpg"><img class="aligncenter size-full wp-image-1024" alt="$T2eC16hHJIQE9qUHu0VFBRZTd8Hccw~~60_12" src="https://s3-eu-west-1.amazonaws.com/conoroneill.net/wp-content/uploads/2013/05/T2eC16hHJIQE9qUHu0VFBRZTd8Hccw60_12.jpg" width="500" height="475" /></a>

Swapping out seemed to be a doddle, just two wires to solder. Most of the eBay batteries come with a PCM (Protection Circuit Module) built-in. This ensures that the battery never completely drains and also doesn't get overcharged. Both are lethal for LiPo batteries.

I charged the Eken up with the new battery, which took forever on USB. But I saw this as a good thing. Then I pulled the power and tried to boot. Zip. Nada. Not even a flicker.

I started getting paranoid that the 2x batteries in the Eken were actually wired to give 7.4V and not 3.7V. But some multi-metering confirmed 3.7V on the originals. I wired them back in and the Eken booted fine. Weird. When I checked the new one disconnected from the Eken on the multimeter, it reported 3.7V too. But when it was connected to the Eken it said 0.8V.

Then I had a brainwave. I tested the connections on the battery side of the PCM. Aha, 3.7V. So something weird was happening with the PCM. My worry was that is was actually doing it's job and the battery couldn't supply enough current to power the Eken.

But deep intake of breath and I swapped the PCM from the old battery and put it on the new one. Result! Eken booted and battery did not explode or melt.

I've been unable to figure out if all PCMs are generic for a particular voltage or if they are specific to a battery type. I'm hoping the former. Anyone know? I'd hate for something to go wrong with this one.

And now for the really good news. 2.5hrs mixed usage with the new battery and we're still at 64%!

&nbsp;