var share = document.getElementById('share');
let imageSize = document.getElementById('imageSize');
let clear = document.getElementById('clear');
let canvasColor = document.getElementById('backgroundColor');
let ratio = document.getElementById('ratio');
let border = document.getElementById('borderClick');
let check = document.getElementById('border');

function el(id) {
  return document.getElementById(id);
}

let imageNum = 5;
let cSizing;
let multiplier;
let borderArr = [];
let caption = 'Fondbox';
let captionColor = '#4267b2';
let borderWidth = 0;

if (window.innerWidth >= 360 && window.innerWidth <= 420) {
  cSizing = 340;
} else if (window.innerWidth >= 420 && window.innerWidth <= 564) {
  cSizing = 380;
} else if (window.innerWidth >= 564 && window.innerWidth <= 764) {
  cSizing = 420;
} else if (window.innerWidth >= 764 && window.innerWidth <= 1024) {
  cSizing = 560;
} else if (window.innerWidth >= 1024 && window.innerWidth <= 1500) {
  cSizing = 664;
} else if (window.innerWidth >= 1500) {
  cSizing = 724;
} else cSizing = 315;

if (window.innerWidth <= 1024) {
  multiplier = 2;
} else multiplier = 4;

var canvas = new fabric.Canvas('canvas');
canvas.setHeight(cSizing);
canvas.setWidth(cSizing);
canvas.backgroundColor = 'yellow';

document.getElementById('file').addEventListener(
  'change',
  function (e) {
    let files = e.target.files;
    for (let i = 0; i < imageNum; i++) {
      if (true) {
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
              stroke: '#fff',
            });
            image.scaleToHeight(280);
            image.scaleToWidth(280);
            canvas.add(image);
            image.sendToBack();
            canvas.renderAll();

            borderArr.push(image);
          });
          img.src = e.target.result;
        };
        if (e.target.files && e.target.files[i]) {
          FR.readAsDataURL(this.files[i]);
        }
      }
    }
  },
  false
);

document.getElementById('save').addEventListener('click', function (e) {
  canvas.discardActiveObject();
  canvas.renderAll();
  let block = canvas.add(
    new fabric.Rect({
      left: 0,
      top: 0,
      fill: '#fff',
      width: 160,
      height: 20,
      rx: 2,
      ry: 2,
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      lockMovementX: true,
      lockMovementY: true,
      strokeWidth: 0,
    })
  );

  let text = canvas.add(
    new fabric.Text(`#${caption}`, {
      fontFamily: 'Delicious_500',
      left: 5,
      top: 5,
      fontSize: 11,
      textAlign: 'left',
      strokeWidth: 0,
      fill: captionColor,
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      lockMovementX: true,
      lockMovementY: true,
    })
  );

  canvas.enableRetinaScaling = true;
  setTimeout(() => {
    let image = canvas.toDataURL({
      pixelRatio: 3,
      format: 'png',
      multiplier: multiplier,
    });

    downloadURI(image, 'collage');
  }, 400);
});

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  link.click();
}

function aspectRation(event, width = 1, height = 1) {
  canvas.setHeight(cSizing / width);
  canvas.setWidth(cSizing / height);

  canvas.renderAll();

  event.preventDefault();
}

clear.addEventListener('click', function () {
  canvas.remove(...canvas.getObjects());
});

canvasColor.addEventListener('click', function (e) {
  canvas.backgroundColor = $('#backgroundColor').val();
  canvas.renderAll();
});

el('delete').addEventListener('click', (e) => {
  canvas.remove(canvas.getActiveObject());
});

// Borderr Setting==

el('noBorder').addEventListener('click', (e) => {
  e.preventDefault();
  borderWidth = 0;
  borderArr.map((item) => {
    item.strokeWidth = parseInt(borderWidth);
  });
  canvas.renderAll();
});

el('border-sm').addEventListener('click', (e) => {
  e.preventDefault();
  borderWidth = 30;
  borderArr.map((item) => {
    item.strokeWidth = parseInt(borderWidth);
  });
  canvas.renderAll();
});

el('border-md').addEventListener('click', (e) => {
  e.preventDefault();
  borderWidth = 40;
  borderArr.map((item) => {
    item.strokeWidth = parseInt(borderWidth);
  });
  canvas.renderAll();
});

el('border-lg').addEventListener('click', (e) => {
  e.preventDefault();
  borderWidth = 50;
  borderArr.map((item) => {
    item.strokeWidth = parseInt(borderWidth);
  });
  canvas.renderAll();
});

// CAPTIO==

el('captionText').addEventListener('change', (e) => {
  caption = e.target.value;
});

el('textColor').addEventListener('click', (e) => {
  captionColor = e.target.value;
});

