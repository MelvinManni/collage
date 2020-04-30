var share = document.getElementById('fbShare');
let imageSize = document.getElementById('imageSize');
let clear = document.getElementById('clear');
let imageNum = 5;
var canvas = new fabric.Canvas('canvas');
canvas.setHeight(315);
canvas.setWidth(315);
canvas.backgroundColor = '#ffdf00';
canvas.set({
  strokeWidth: 10,
  stroke: '#4267b2',
});

let block = canvas.add(
  new fabric.Rect({
    left: 0,
    top: 0,
    fill: '#fff',
    width: 150,
    height: 20,
    rx: 5,
    ry: 5,
    hasBorders: false,
    hasControls: false,
    hasRotatingPoint: false,
    lockMovementX: true,
    lockMovementY: true,
  })
);

let text = canvas.add(
  new fabric.Text('#CovidFondBox #KuchCorona', {
    fontFamily: 'Delicious_500',
    left: 5,
    top: 5,
    fontSize: 11,
    textAlign: 'left',
    fill: '#4267b2',
    hasBorders: false,
    hasControls: false,
    hasRotatingPoint: false,
    lockMovementX: true,
    lockMovementY: true,
  })
);


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
  canvas.toBlob(function (blob) {
    saveAs(blob, 'Image.png');
  });

  if (window.innerWidth <= 800) {
    var image = document.getElementById('image');
    var overlayResult = document.getElementById('overlayResult');
    image.src = canvas.toDataURL('image/jpeg', 0.9);
    image.width = canvas.width;
    image.height = canvas.height;
    overlayResult.className = 'open zoomInUp';
  }
});

document.getElementById('back').addEventListener('click', function (e) {
  var overlayResult = document.getElementById('overlayResult');
  overlayResult.className = 'close';
});

clear.addEventListener('click', function () {
  canvas.remove(...canvas.getObjects());
});

share.addEventListener('click', sharefbimage);

function sharefbimage() {
  var canvas = document.getElementById('canvas');
  image = canvas.toDataURL('image/jpeg', 0.9);
  FB.init({ appId: `your appid`, status: true, cookie: true });
  FB.ui(
    {
      method: `share`,
      name: 'Facebook Dialogs',
      href: $(location).attr('href'),
      link: 'https://developers.facebook.com/docs/dialogs/',
      picture: `${image}`,
      caption: 'Ishelf Book',
      description: 'your description',
    },
    function (response) {
      if (response && response.post_id) {
        alert('success');
      } else {
        alert('error');
      }
    }
  );
}
