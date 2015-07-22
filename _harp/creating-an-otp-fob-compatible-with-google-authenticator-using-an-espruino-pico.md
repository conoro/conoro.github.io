Now that the [Espruino Pico](http://www.espruino.com/) has (beta) HID support, it can pretend to be a keyboard or mouse (or other HID compatible device). This makes it possible to send characters to the active window on your Windows/Linux/Mac PC. I've cobbled together some code which turns the Pico into a device like a YubiKey. Press the button and get the latest auth code pasted automatically for you.

![Espruino Pico OTP](http://conoroneill.net.s3.amazonaws.com/wp-content/uploads/2015/07/espruino_otp.jpg)

This code is basically just from three sources, merged together with a few tiny tweaks by me.

* [jsSHA, a JavaScript implementation of SHA/HMAC](https://github.com/Caligatio/jsSHA)
* [Generate Time-Based One-Time Passwords With JavaScript](https://blog.nraboy.com/2014/10/generate-time-based-one-time-passwords-javascript/)
* [Espruino HID Example](http://www.espruino.com/USB)

(Note I've just discovered that Espruino has its own hmac implementation so I can possibly drop jsSHA)

The main thing you need for this is your Google Authenticator Secret. Unfortunately you can only get this when you have access to the original QR code that you scanned (it's in the URL). But if you are setting up 2FA access to a new service e.g. Digital Ocean, then you can grab the secret and save it in the code. If your system also uses a PIN (e.g. SSO on some corporate sites), save that in the code too.

You'll need a very recent pre-release Firmware for this to work at all e.g. [from here](http://www.espruino.com/binaries/git/commits/d3b43aab7efcc42e6f1584c340bd855b1e5af4c6/)

Once that's flashed, go into Settings on the Web IDE and make sure "Set Current Time" is ticked in the Communications section. Auth Fobs rely on having an accurate time and that setting keeps unsetting itself on my PC.

Now copy the code below onto the Espruino using the Web IDE and then type save() to make sure it can survive a power-cycle. Remove and re-insert the Pico, press the button and you should get the auth code you need.

Now for the bad news: This currently doesn't work on my Windows 8.1 PC but works semi-reliably on my work MBP. Once the HID code makes it to production, I'm sure it will work fine.

```javascript
// Code assembled by Conor O'Neill from three sources. None of it copyright me.
// This code copyright Brian Turek https://github.com/Caligatio/jsSHA https://github.com/Caligatio/jsSHA/blob/master/LICENSE
'use strict';(function(E){function t(c,a,e){var g=0,b=[],d=0,f,k,l,h,m,w,n,q=!1,r=!1,p=[],t=[],v,u=!1;e=e||{};f=e.encoding||"UTF8";v=e.numRounds||1;l=y(a,f);if(v!==parseInt(v,10)||1>v)throw Error("numRounds must a integer >= 1");if("SHA-1"===c)m=512,w=z,n=F,h=160;else throw Error("Chosen SHA variant is not supported");k=x(c);this.setHMACKey=function(a,b,d){var e;if(!0===r)throw Error("HMAC key already set");if(!0===q)throw Error("Cannot set HMAC key after finalizing hash");if(!0===u)throw Error("Cannot set HMAC key after calling update");
f=(d||{}).encoding||"UTF8";b=y(b,f)(a);a=b.binLen;b=b.value;e=m>>>3;d=e/4-1;if(e<a/8){for(b=n(b,a,0,x(c));b.length<=d;)b.push(0);b[d]&=4294967040}else if(e>a/8){for(;b.length<=d;)b.push(0);b[d]&=4294967040}for(a=0;a<=d;a+=1)p[a]=b[a]^909522486,t[a]=b[a]^1549556828;k=w(p,k);g=m;r=!0};this.update=function(a){var c,e,f,h=0,n=m>>>5;c=l(a,b,d);a=c.binLen;e=c.value;c=a>>>5;for(f=0;f<c;f+=n)h+m<=a&&(k=w(e.slice(f,f+n),k),h+=m);g+=h;b=e.slice(h>>>5);d=a%m;u=!0};this.getHash=function(a,e){var f,l,m;if(!0===
r)throw Error("Cannot call getHash after setting HMAC key");m=A(e);switch(a){case "HEX":f=function(a){return B(a,m)};break;case "B64":f=function(a){return C(a,m)};break;case "BYTES":f=D;break;default:throw Error("format must be HEX, B64, or BYTES");}if(!1===q)for(k=n(b,d,g,k),l=1;l<v;l+=1)k=n(k,h,0,x(c));q=!0;return f(k)};this.getHMAC=function(a,e){var f,l,p;if(!1===r)throw Error("Cannot call getHMAC without first setting HMAC key");p=A(e);switch(a){case "HEX":f=function(a){return B(a,p)};break;case "B64":f=
function(a){return C(a,p)};break;case "BYTES":f=D;break;default:throw Error("outputFormat must be HEX, B64, or BYTES");}!1===q&&(l=n(b,d,g,k),k=w(t,x(c)),k=n(l,h,m,k));q=!0;return f(k)}}function G(c,a,e){var g=c.length,b,d,f,k,l;a=a||[0];e=e||0;l=e>>>3;if(0!==g%2)throw Error("String of HEX type must be in byte increments");for(b=0;b<g;b+=2){d=parseInt(c.substr(b,2),16);if(isNaN(d))throw Error("String of HEX type contains invalid characters");k=(b>>>1)+l;for(f=k>>>2;a.length<=f;)a.push(0);a[f]|=d<<
8*(3-k%4)}return{value:a,binLen:4*g+e}}function H(c,a,e){var g=[],b,d,f,k,g=a||[0];e=e||0;d=e>>>3;for(b=0;b<c.length;b+=1)a=c.charCodeAt(b),k=b+d,f=k>>>2,g.length<=f&&g.push(0),g[f]|=a<<8*(3-k%4);return{value:g,binLen:8*c.length+e}}function I(c,a,e){var g=[],b=0,d,f,k,l,h,m,g=a||[0];e=e||0;a=e>>>3;if(-1===c.search(/^[a-zA-Z0-9=+\/]+$/))throw Error("Invalid character in base-64 string");f=c.indexOf("=");c=c.replace(/\=/g,"");if(-1!==f&&f<c.length)throw Error("Invalid '=' found in base-64 string");
for(f=0;f<c.length;f+=4){h=c.substr(f,4);for(k=l=0;k<h.length;k+=1)d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(h[k]),l|=d<<18-6*k;for(k=0;k<h.length-1;k+=1){m=b+a;for(d=m>>>2;g.length<=d;)g.push(0);g[d]|=(l>>>16-8*k&255)<<8*(3-m%4);b+=1}}return{value:g,binLen:8*b+e}}function B(c,a){var e="",g=4*c.length,b,d;for(b=0;b<g;b+=1)d=c[b>>>2]>>>8*(3-b%4),e+="0123456789abcdef".charAt(d>>>4&15)+"0123456789abcdef".charAt(d&15);return a.outputUpper?e.toUpperCase():e}function C(c,
a){var e="",g=4*c.length,b,d,f;for(b=0;b<g;b+=3)for(f=b+1>>>2,d=c.length<=f?0:c[f],f=b+2>>>2,f=c.length<=f?0:c[f],f=(c[b>>>2]>>>8*(3-b%4)&255)<<16|(d>>>8*(3-(b+1)%4)&255)<<8|f>>>8*(3-(b+2)%4)&255,d=0;4>d;d+=1)8*b+6*d<=32*c.length?e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(f>>>6*(3-d)&63):e+=a.b64Pad;return e}function D(c){var a="",e=4*c.length,g,b;for(g=0;g<e;g+=1)b=c[g>>>2]>>>8*(3-g%4)&255,a+=String.fromCharCode(b);return a}function A(c){var a={outputUpper:!1,b64Pad:"="};
c=c||{};a.outputUpper=c.outputUpper||!1;a.b64Pad=c.b64Pad||"=";if("boolean"!==typeof a.outputUpper)throw Error("Invalid outputUpper formatting option");if("string"!==typeof a.b64Pad)throw Error("Invalid b64Pad formatting option");return a}function y(c,a){var e;switch(a){case "UTF8":case "UTF16BE":case "UTF16LE":break;default:throw Error("encoding must be UTF8, UTF16BE, or UTF16LE");}switch(c){case "HEX":e=G;break;case "TEXT":e=function(e,b,d){var f=[],c=[],l=0,h,m,p,n,q,f=b||[0];b=d||0;p=b>>>3;if("UTF8"===
a)for(h=0;h<e.length;h+=1)for(d=e.charCodeAt(h),c=[],128>d?c.push(d):2048>d?(c.push(192|d>>>6),c.push(128|d&63)):55296>d||57344<=d?c.push(224|d>>>12,128|d>>>6&63,128|d&63):(h+=1,d=65536+((d&1023)<<10|e.charCodeAt(h)&1023),c.push(240|d>>>18,128|d>>>12&63,128|d>>>6&63,128|d&63)),m=0;m<c.length;m+=1){q=l+p;for(n=q>>>2;f.length<=n;)f.push(0);f[n]|=c[m]<<8*(3-q%4);l+=1}else if("UTF16BE"===a||"UTF16LE"===a)for(h=0;h<e.length;h+=1){d=e.charCodeAt(h);"UTF16LE"===a&&(m=d&255,d=m<<8|d>>>8);q=l+p;for(n=q>>>
2;f.length<=n;)f.push(0);f[n]|=d<<8*(2-q%4);l+=2}return{value:f,binLen:8*l+b}};break;case "B64":e=I;break;case "BYTES":e=H;break;default:throw Error("format must be HEX, TEXT, B64, or BYTES");}return e}function r(c,a){return c<<a|c>>>32-a}function p(c,a){var e=(c&65535)+(a&65535);return((c>>>16)+(a>>>16)+(e>>>16)&65535)<<16|e&65535}function u(c,a,e,g,b){var d=(c&65535)+(a&65535)+(e&65535)+(g&65535)+(b&65535);return((c>>>16)+(a>>>16)+(e>>>16)+(g>>>16)+(b>>>16)+(d>>>16)&65535)<<16|d&65535}function x(c){if("SHA-1"===
c)c=[1732584193,4023233417,2562383102,271733878,3285377520];else throw Error("No SHA variants supported");return c}function z(c,a){var e=[],g,b,d,f,k,l,h;g=a[0];b=a[1];d=a[2];f=a[3];k=a[4];for(h=0;80>h;h+=1)e[h]=16>h?c[h]:r(e[h-3]^e[h-8]^e[h-14]^e[h-16],1),l=20>h?u(r(g,5),b&d^~b&f,k,1518500249,e[h]):40>h?u(r(g,5),b^d^f,k,1859775393,e[h]):60>h?u(r(g,5),b&d^b&f^d&f,k,2400959708,e[h]):u(r(g,5),b^d^f,k,3395469782,e[h]),k=f,f=d,d=r(b,30),b=g,g=l;a[0]=p(g,a[0]);a[1]=p(b,a[1]);a[2]=p(d,a[2]);a[3]=p(f,a[3]);
a[4]=p(k,a[4]);return a}function F(c,a,e,g){var b;for(b=(a+65>>>9<<4)+15;c.length<=b;)c.push(0);c[a>>>5]|=128<<24-a%32;c[b]=a+e;e=c.length;for(a=0;a<e;a+=16)g=z(c.slice(a,a+16),g);return g}"function"===typeof define&&define.amd?define(function(){return t}):"undefined"!==typeof exports?"undefined"!==typeof module&&module.exports?module.exports=exports=t:exports=t:E.jsSHA=t})(this);

// This code copyright Nic Raboy https://blog.nraboy.com/2014/10/generate-time-based-one-time-passwords-javascript/
TOTP = function() {

    var dec2hex = function(s) {
        return (s < 15.5 ? "0" : "") + Math.round(s).toString(16);
    };

    var hex2dec = function(s) {
        return parseInt(s, 16);
    };

    var leftpad = function(s, l, p) {
        if(l + 1 >= s.length) {
            s = Array(l + 1 - s.length).join(p) + s;
        }
        return s;
    };

    var base32tohex = function(base32) {
        var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        var bits = "";
        var hex = "";
        for(var i = 0; i < base32.length; i++) {
            var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
            bits += leftpad(val.toString(2), 5, '0');
        }
        for(var i = 0; i + 4 <= bits.length; i+=4) {
            var chunk = bits.substr(i, 4);
            hex = hex + parseInt(chunk, 2).toString(16) ;
        }
        return hex;
    };

    this.getOTP = function(secret) {
        try {
            var epoch = Math.round(new Date().getTime() / 1000.0);
            var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, "0");
            var hmacObj = new jsSHA("SHA-1", "HEX");
			hmacObj.setHMACKey(base32tohex(secret), "HEX")
			hmacObj.update(time);
            var hmac = hmacObj.getHMAC("HEX");
            var offset = hex2dec(hmac.substring(hmac.length - 1));
            var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec("7fffffff")) + "";
            otp = (otp).substr(otp.length - 6, 6);
        } catch (error) {
            throw error;
        }
        return otp;
    };

}

var totpObj = new TOTP();

// This code copyright Gordon Williams, Pur3 Ltd.,  https://github.com/espruino/Espruino/blob/master/LICENSE
var kb = require("USBKeyboard");

setWatch(function() {
  // These two lines by Conor O'Neill :-)
	var pin = "put_your_PIN_Prefix_here";
  kb.type(pin + totpObj.getOTP("put_your_google_authenticator_secret_here").toString(), function() {
        kb.tap(kb.KEY.ENTER);
    });
}, BTN, {debounce:100,repeat:true, edge:"rising"});

```
