(function() {
  var framerate = Math.floor( 1000 / 60 );

  $( document ).ready( function() {
    controller.init();
    setInterval( function() {
      controller.update();
    }, framerate );
  });
})();
