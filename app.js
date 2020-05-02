var share = document.getElementById('share');
let imageSize = document.getElementById('imageSize');
let clear = document.getElementById('clear');
let imageNum = 5;
var canvas = new fabric.Canvas('canvas');
canvas.setHeight(315);
canvas.setWidth(315);
canvas.backgroundColor = '#ffdf00';
canvas.enableRetinaScaling = true;
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
              strokeWidth: 0,
            });
            image.scaleToHeight(280);
            image.scaleToWidth(280);
            canvas.add(image);
            image.sendToBack();
            canvas.renderAll();
          });
          img.src = e.target.result;
        };
        if (e.target.files && e.target.files[i]){
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
      width: 153,
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
    new fabric.Text('#CovidFondBox #KuchCorona', {
      fontFamily: 'Delicious_500',
      left: 5,
      top: 5,
      fontSize: 11,
      textAlign: 'left',
      strokeWidth: 0,
      fill: '#4267b2',
      hasBorders: false,
      hasControls: false,
      hasRotatingPoint: false,
      lockMovementX: true,
      lockMovementY: true,
    })
  );

  canvas.enableRetinaScaling = true;
  setTimeout(() => {
    document.getElementById('canvas').toBlob(function (blob) {
      saveAs(blob, 'image');
    });

    if (window.innerWidth <= 800) {
      // var image = document.getElementById('image');
      // var overlayResult = document.getElementById('overlayResult');
      let image = canvas.toDataURL();
      // image.width = canvas.width;
      // image.height = canvas.height;
      // overlayResult.className = 'open zoomInUp';

      downloadURI(image, 'image');
    }
  }, 400);
});

clear.addEventListener('click', function () {
  canvas.remove(...canvas.getObjects());
});

share.addEventListener('click', function () {
  var link = document.createElement('a');
  link.download = name;
  link.href = canvas.toDataURL();

  let metaImg = document.createElement('meta');
  let metalink = document.createElement('meta');
  metaImg.setAttribute('property', 'og:image')
  metaImg.setAttribute('content', `${canvas.toDataURL('image')}`)

  //LINK
  metaImg.setAttribute('property', 'og:image')
  let icon = './icon.png'

  var fakeLink = document.createElement('a');
  fakeLink.setAttribute('href', `whatsapp://send?text=${icon}`)
  fakeLink.setAttribute('data-action', 'share/whatsapp/share');
  fakeLink.click();

  // let src = canvas.toDataURL('image/jpeg', 0.9);

  // var accessToken;
  // FB.init({
  //   appId: '550217352560581',
  //   status: true,
  //   cookie: true,
  //   oauth: true,
  //   xfbml: true,
  // });
  // FB.getLoginStatus(function (response) {
  //   if (response.status == 'connected') {
  //     accessToken = response.authResponse.accessToken;
  //     doSomething();
  //   } else {
  //     FB.login(
  //       function (response) {
  //         if (response.status == 'connected') {
  //           accessToken = response.authResponse.accessToken;
  //           doSomething();
  //         } else {
  //           alert('Bye.');
  //         }
  //       },
  //       {
  //         scope: 'publish_stream,user_photos',
  //       }
  //     );
  //   }
  // });

  // CHOOSE WHAT YOU WANT TO DO. THIS FUNCTION IS CALLED AUTOMATICALLY ON PAGE LOADING
  function doSomething() {
    postImage1();
  }
  // POST A IMAGE WITH DIALOG using FB.api
  function postImage1() {
    var wallPost = {
      message: 'Test to post a photo',
      picture:
        'http://www.photographyblogger.net/wp-content/uploads/2010/05/flower29.jpg',
    };
    FB.api('/me/feed', 'post', wallPost, function (response) {
      if (!response || response.error) {
        alert(
          'Failure! ' + response.status + ' You may logout once and try again'
        );
      } else {
        alert('Success! Post ID: ' + response);
      }
    });
  }
});
function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  link.click();
}
