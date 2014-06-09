var writeFileSync = require('fs').writeFileSync;

HTMLCanvasElement = window.HTMLCanvasElement;
var qrcode = require('jsqrcode')();

// prevent default behavior from changing page on dropped file
window.ondragover = function(e) {
  e.preventDefault();
  return false;
};
window.ondrop = function(e) {
  e.preventDefault();
  return false;
};

var holder = document.getElementById('holder');
holder.ondragover = function () { this.className = 'hover'; return false; };
holder.ondragend = function () { this.className = ''; return false; };
holder.ondrop = function (e) {
  e.preventDefault();
  var fileName = e.dataTransfer.files[0].path;

  var image = new Image();
  holder.innerText = 'Loading...';

  image.onload = function () {
    var result;
    try{
      result = qrcode.decode(image);
      holder.innerText = 'Result of scanning QR code: ' + result;
    } catch(e) {
      holder.innerText = 'Unable to read QR code.';
    }
  };

  image.src = fileName;

  return false;
};
