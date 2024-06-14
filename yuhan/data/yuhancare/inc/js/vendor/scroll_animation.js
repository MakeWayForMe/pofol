

$(window).scroll( function(){
  $('.fi').each( function(i){
      var bottom_of_object = $(this).offset().top + $(this).outerHeight()/3;
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      if( bottom_of_window > bottom_of_object ){
          $(this).addClass('fade-in');}
      else { $(this).removeClass('fade-in'); }  });  });



      $(window).scroll( function(){
        $('.siu').each( function(i){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight()/3;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object ){
                $(this).addClass('slide-in-up');}
            else { $(this).removeClass(''); }  });  });
      















function autoType(elementClass, typingSpeed){
  var thhis = $(elementClass);
  thhis.css({

  });
  thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
  thhis = thhis.find(".text-js");
  var text = thhis.text().trim().split('');
  var amntOfChars = text.length;
  var newString = "";
  thhis.text("|");
  setTimeout(function(){
    thhis.css("opacity",1);
    thhis.prev().removeAttr("style");
    thhis.text("");
    for(var i = 0; i < amntOfChars; i++){
      (function(i,char){
        setTimeout(function() {        
          newString += char;
          thhis.text(newString);
        },i*typingSpeed);
      })(i+1,text[i]);
    }
  },2900);
}

$(document).ready(function(){
  // Now to start autoTyping just call the autoType function with the 
  // class of outer div
  // The second paramter is the speed between each letter is typed.   
  autoType(".type-js",200);
});
