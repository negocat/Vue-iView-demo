
import { Notice } from 'iview';

// 向标签内添加html
function appendElement(h, str) {
  let el = document.createElement("div");
  el.innerHTML = str;
  for (let i = 0; i < el.childNodes.length; i++) {
    // console.log(el.childNodes[i])
    h.appendChild(el.childNodes[i]);
  }
}

let loading = {
  index: 0,
  open: function () {

    let stmp = '<div style="width: 100%;height: 100%;position: fixed;z-index: 999999;background: #000;opacity: 0.7;top: 0;left: 0;" id="loading" class="loadNow" background><img style="width: auto;height: 7%;position: relative;margin: auto;top: 45%;left: 45%;animation: loadNow_img 1.5s linear both infinite;-webkit-animation: loadNow_img 1.5s linear both infinite;" src="/static/css/patterns/loading.png" class="loadNow_img"></div>';
    appendElement(document.getElementsByTagName("body")[0], stmp);
  },
  close: function () {
    let loadingDiv = document.getElementById("loading");
    if (loadingDiv != null) {
      loadingDiv.classList.add('loadClose');
      setTimeout(function () {
        let loadingDiv = document.getElementById("loading");
        if (loadingDiv != null) {
          if (loadingDiv.remove != undefined) {
            loadingDiv.remove()
          } else {
            document.getElementsByTagName('body')[0].removeChild(loadingDiv);
          }
          loading.close();
        }
      }, 800);
    }
  }
}

let Msg = {
  showSuccess: function (value) {
    Notice.success(value);
  },
  showInfo: function (value) {
    Notice.info(value);
  },
  showError: function (value) {
    Notice.error(value);
  },
  confirm: function (value, callback) {
    swal({
      title: "确定?",
      text: value,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "确定",
      closeOnConfirm: true
    },
      callback
    );
  }
};

export { loading, Msg };
