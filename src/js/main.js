// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("./calculator");

var $ = require("./lib/qsa");
var debounce = require("./lib/debounce");
var Camera = require("savage-camera");
var savage = require("savage-query");

var keyStage = document.querySelector("main.scroll-content");
var map = document.querySelector(".backdrop svg");
var camera = new Camera(map);
var stages = $(".layer").reverse();
var current = null;
var existing = document.querySelector("#Existing");

var onScroll = function() {
  var scrollBounds = keyStage.getBoundingClientRect();
  for (var i = 0; i < stages.length; i++) {
    var stage = stages[i];
    var bounds = stage.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      var layerID = stage.getAttribute("data-layer");
      if (layerID == current) return;
      var layer = document.querySelector("#" + layerID);
      if (!layer) return;
      savage(map).addClass("zoomed");
      var active = document.querySelector(".activated");
      if (active) savage(active).removeClass("activated");
      savage(layer).addClass("activated");
      current = layerID;
      camera.zoomTo(layer, 200, 500);
      return;
    }
  }
  savage(map).removeClass("zoomed");
  camera.zoomTo(existing, 50, 500);
}

window.addEventListener("scroll", debounce(onScroll));
onScroll();