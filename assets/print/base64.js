/*
 * Original code (c) 2010 Nick Galbreath
 * http://code.google.com/p/stringencoders/source/browse/#svn/trunk/javascript
 *
 * jQuery port (c) 2010 Carlo Zottmann
 * http://github.com/carlo/jquery-base64
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const createFunctions = () => {
  "use strict";
  jQuery.base64 = (function ($) {
    var _PADCHAR = "=",
      _ALPHA =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      _VERSION = "1.0";
    function _getbyte64(s, i) {
      var idx = _ALPHA.indexOf(s.charAt(i));
      if (idx === -1) {
        throw "Cannot decode base64";
      }
      return idx;
    }
    function _decode(s) {
      var pads = 0,
        i,
        b10,
        imax = s.length,
        x = [];
      s = String(s);
      if (imax === 0) {
        return s;
      }
      if (imax % 4 !== 0) {
        throw "Cannot decode base64";
      }
      if (s.charAt(imax - 1) === _PADCHAR) {
        pads = 1;
        if (s.charAt(imax - 2) === _PADCHAR) {
          pads = 2;
        }
        imax -= 4;
      }
      for (i = 0; i < imax; i += 4) {
        b10 =
          (_getbyte64(s, i) << 18) |
          (_getbyte64(s, i + 1) << 12) |
          (_getbyte64(s, i + 2) << 6) |
          _getbyte64(s, i + 3);
        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255, b10 & 255));
      }
      switch (pads) {
        case 1:
          b10 =
            (_getbyte64(s, i) << 18) |
            (_getbyte64(s, i + 1) << 12) |
            (_getbyte64(s, i + 2) << 6);
          x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255));
          break;
        case 2:
          b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12);
          x.push(String.fromCharCode(b10 >> 16));
          break;
      }
      return x.join("");
    }
    function _getbyte(s, i) {
      var x = s.charCodeAt(i);
      if (x > 255) {
        throw "INVALID_CHARACTER_ERR: DOM Exception 5";
      }
      return x;
    }
    function _encode(s) {
      if (arguments.length !== 1) {
        throw "SyntaxError: exactly one argument required";
      }
      s = String(s);
      var i,
        b10,
        x = [],
        imax = s.length - (s.length % 3);
      if (s.length === 0) {
        return s;
      }
      for (i = 0; i < imax; i += 3) {
        b10 =
          (_getbyte(s, i) << 16) |
          (_getbyte(s, i + 1) << 8) |
          _getbyte(s, i + 2);
        x.push(_ALPHA.charAt(b10 >> 18));
        x.push(_ALPHA.charAt((b10 >> 12) & 63));
        x.push(_ALPHA.charAt((b10 >> 6) & 63));
        x.push(_ALPHA.charAt(b10 & 63));
      }
      switch (s.length - imax) {
        case 1:
          b10 = _getbyte(s, i) << 16;
          x.push(
            _ALPHA.charAt(b10 >> 18) +
              _ALPHA.charAt((b10 >> 12) & 63) +
              _PADCHAR +
              _PADCHAR
          );
          break;
        case 2:
          b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8);
          x.push(
            _ALPHA.charAt(b10 >> 18) +
              _ALPHA.charAt((b10 >> 12) & 63) +
              _ALPHA.charAt((b10 >> 6) & 63) +
              _PADCHAR
          );
          break;
      }
      return x.join("");
    }
    return { decode: _decode, encode: _encode, VERSION: _VERSION };
  })(jQuery);

  /*
   * UTF-8 wrappers (c) PaperCut Software 2013
   */
  jQuery.base64.encodeUtf8 = function (string) {
    return $.base64.encode(unescape(encodeURIComponent(string)));
  };
  jQuery.base64.decodeUtf8 = function (utf8StringAsBase64) {
    return decodeURIComponent(escape($.base64.decode(utf8StringAsBase64)));
  };
};

try {
  createFunctions();
} catch (e) {
  setTimeout(createFunctions, 500);
}
