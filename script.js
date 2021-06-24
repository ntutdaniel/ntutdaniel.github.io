// Drawing with text. Ported from Generative Design book - http://www.generative-gestaltung.de - Original licence: http://www.apache.org/licenses/LICENSE-2.0

// Application variables
var position = {x: 0, y: window.innerHeight/2};
var counter = 0;
var minFontSize = 3;
var angleDistortion = 0;
var letters = "祝福01 -> 尚蓁: 生日快樂~~挖賽想當初在論壇認識你，就覺得你很會介紹，後來才發現你是講師，真的太猛拉。新的一年，要升碩士了，加油耶~~，希望你全部願望都成真，然後趕快受洗哈哈哈，然後生日那天準你吵我哈哈哈"
+"祝福02 -> To尚蓁：生日快樂啊啊啊啊啊啊~ 已經忘記是怎麼認識妳了，雖然跟你年齡差距很大，但是沒有太多的隔閡，一定是因為你太成熟了XD 雖然沒辦法實體跟你一起過生日，等疫情結束再好好的一起去大吃特吃(前提是耀允也要可以吃的)，願神大大的祝福妳!!!!!!!!!!!  因為他必將長久的日子，生命的年數與平安，加給你。（箴言3：2）"
+"祝福03 -> 尚蓁老師~這年真的很開心有更多時間和你一起相處，更看見熱愛科技跟音樂是上帝在你身上放下美好的特質，每當討論到程式教育充滿熱情跟耐心教會每個小小孩(也包含我們助教大小孩XD)，不只是達文西的封號，你也是過於同齡常人有邏輯的名偵探。祝福你新的一年更多真實經歷天父爸爸的愛跟帶領，一起做神兒女（受洗）奔走天路。：﹚zizi"
+"祝福04 -> 尚蓁：謝謝妳總是很熱心幫忙技術課程的內容，也很開心妳來到我們小組。要祝福多才多藝又常常帶著歡笑的尚蓁，生日快樂！祝尚蓁能夠深入研究所有感興趣的領域，並且在當中經歷上帝智慧的帶領！";

// Drawing variables
var canvas;
var context;
var mouse = {x: 0, y: 0, down: false}

function init() {
  canvas = document.getElementById( 'canvas' );
  context = canvas.getContext( '2d' );
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup',   mouseUp,   false);
  canvas.addEventListener('mouseout',  mouseUp,  false);  
  canvas.addEventListener('dblclick', doubleClick, false);
  
  window.onresize = function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function mouseMove ( event ){
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  draw();
}

function draw() {
 if ( mouse.down ) {
    var d = distance( position, mouse );
    var fontSize = minFontSize + d/2 + 4;
    var letter = letters[counter];
    var stepSize = textWidth( letter, fontSize );
    
    if (d > stepSize) {
      var angle = Math.atan2(mouse.y-position.y, mouse.x-position.x);
      
      context.font = fontSize + "px Georgia";
    
      context.save();
      context.translate( position.x, position.y);
      context.rotate( angle );
      context.fillText(letter,0,0);
      context.restore();

      counter++;
      if (counter > letters.length-1) {
        counter = 0;
      }
    
    //console.log (position.x + Math.cos( angle ) * stepSize)
      position.x = position.x + Math.cos(angle) * stepSize;
      position.y = position.y + Math.sin(angle) * stepSize;

      }
  }     
}

function distance( pt, pt2 ){
  
  var xs = 0;
  var ys = 0;
 
  xs = pt2.x - pt.x;
  xs = xs * xs;
 
  ys = pt2.y - pt.y;
  ys = ys * ys;
 
  return Math.sqrt( xs + ys );
}

function mouseDown( event ){
  mouse.down = true;
  position.x = event.pageX;
  position.y = event.pageY;
  
  document.getElementById('info').style.display = 'none';
}

function mouseUp( event ){
    mouse.down = false;
}

function doubleClick( event ) {
  canvas.width = canvas.width; 
}

function textWidth( string, size ) {
  context.font = size + "px Georgia";
  
  if ( context.fillText ) {
    return context.measureText( string ).width;
  } else if ( context.mozDrawText) {
    return context.mozMeasureText( string );
  }
  
 };

init();