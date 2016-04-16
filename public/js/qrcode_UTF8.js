//---------------------------------------------------------------------
// QR Code Generator for JavaScript UTF8 Support (optional)
// Copyright (c) 2011 Kazuhiko Arase
// URL: http://www.d-project.com/
// Licensed under the MIT license:
//  http://www.opensource.org/licenses/mit-license.php
// The word 'QR Code' is registered trademark of
// DENSO WAVE INCORPORATED
//  http://www.denso-wave.com/qrcode/faqpatent-e.html
//---------------------------------------------------------------------

!function(qrcode){qrcode.stringToBytes=function(s){function toUTF8Array(str){var utf8=[];for(var i=0;i<str.length;i++){var charcode=str.charCodeAt(i);if(charcode<0x80)utf8.push(charcode);else if(charcode<0x800){utf8.push(0xc0|(charcode>>6),0x80|(charcode&0x3f))}
else if(charcode<0xd800||charcode>=0xe000){utf8.push(0xe0|(charcode>>12),0x80|((charcode>>6)&0x3f),0x80|(charcode&0x3f))}
else{i++;charcode=0x10000+(((charcode&0x3ff)<<10)|(str.charCodeAt(i)&0x3ff));utf8.push(0xf0|(charcode>>18),0x80|((charcode>>12)&0x3f),0x80|((charcode>>6)&0x3f),0x80|(charcode&0x3f))}}
return utf8}
return toUTF8Array(s)}}(qrcode)