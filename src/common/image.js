
//图片上传预览    IE是用了滤镜。
let previewImage = function (file, mid, w, h) {
  let img;
  let MAXWIDTH = w;
  let MAXHEIGHT = h;
  file = document.getElementById(file);
  let div = document.getElementById(mid);
  if (file.files && file.files[0]) {
    div.innerHTML = '<img id="imghead_' + mid + '">';
    img = document.getElementById('imghead_' + mid);
    if (w === 0) {
      img.style.width = '100%';
    } else {
      img.style.width = w + 'px';
    }
    if (h !== 0) {
      img.style.height = h + 'px';
    }
    img.onload = function () {
      let rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
      // img.style.width = '100%'
      //                 img.style.marginLeft = rect.left+'px';
      // img.style.marginTop = rect.top+'px';
    };
    let reader = new FileReader();
    reader.onload = function (evt) { img.src = evt.target.result; }
    reader.readAsDataURL(file.files[0]);
  }
  else { //兼容IE
    let sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
    file.select();
    let src = document.selection.createRange().text;
    div.innerHTML = '<img id=imghead>';
    img = document.getElementById('imghead');
    img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
    let rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
    status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
    div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
  }
};

let clacImgZoomParam = function (maxWidth, maxHeight, width, height) {
  let param = { top: 0, left: 0, width: width, height: height };
  if (width > maxWidth || height > maxHeight) {
    let rateWidth = width / maxWidth;
    let rateHeight = height / maxHeight;

    if (rateWidth > rateHeight) {
      param.width = maxWidth;
      param.height = Math.round(height / rateWidth);
    } else {
      param.width = Math.round(width / rateHeight);
      param.height = maxHeight;
    }
  }

  param.left = Math.round((maxWidth - param.width) / 2);
  param.top = Math.round((maxHeight - param.height) / 2);
  return param;
};
export { previewImage };
