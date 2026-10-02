/* Toast notifications. */
(function (H) {
  'use strict';
  var timer;
  H.toast = function (msg) {
    var el = H.$('#toast'); el.textContent = msg; el.classList.add('is-on');
    clearTimeout(timer); timer = setTimeout(function () { el.classList.remove('is-on'); }, 2400);
  };
})(window.HFT);
