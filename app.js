var share = document.getElementById('fbShare');
let imageSize = document.getElementById('imageSize');
let imageNum = 2;
var canvas = new fabric.Canvas('canvas');
canvas.setHeight(315);
canvas.setWidth(315);
canvas.backgroundColor = "#fff";
canvas.set({
  strokeWidth: 20,
  stroke: '#4267b2',
});
document.getElementById('file').addEventListener(
  'change',
  function (e) {
    let files = e.target.files;
    for (let i = 0; i < imageNum; i++) {
      if (this.files && this.files[i]) {
        var FR = new FileReader();
        FR.onload = function (e) {
          var img = new Image();
          img.addEventListener('load', function () {
            let spacedX = Math.floor(Math.random() * 100);
            let spacedY = Math.floor(Math.random() * 100);
            var image = new fabric.Image(img);
            image.set({
              left: spacedX,
              top: spacedY,
              strokeWidth: 20,
              stroke: '#4267b2',
            });
            image.scaleToHeight(200);
            image.scaleToWidth(200);
            canvas.add(image);
            canvas.renderAll();
          });
          img.src = e.target.result;
        };
        FR.readAsDataURL(this.files[i]);
      }
    }
  },
  false
);

document.getElementById('save').addEventListener('click', function (e) {
  var canvas = document.getElementById('canvas');
  let a = canvas.toBlob(function (blob) {
    saveAs(blob, 'Image.png');
  });
});

imageSize.addEventListener('change', function () {
  imageNum = parseInt(imageSize.nodeValue);
});
