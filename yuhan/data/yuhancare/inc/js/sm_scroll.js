



$(function () { // wait for document ready
  // init controller
  var controller = new ScrollMagic.Controller();

  // build tween
var wipeAnimation = new TimelineMax()

  .to(".story_scroll2", 1, {opacity:1, delay:1,}) 
  .to(".story_scroll3", 1, {opacity:1, delay:1,})

  ;

  // build scene
    var scene = new ScrollMagic.Scene({triggerElement: "#tr_story", duration: 1800})
                    .setTween(wipeAnimation)
                    .setPin("#story_start")
                    .addIndicators({name: "rendize"}) // add indicators (requires plugin)
                    .addTo(controller);

    
});


