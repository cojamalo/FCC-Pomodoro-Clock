var α = 0;
var seconds = 1;
t = (seconds/360 * 1000);
var first_run = false;
var timing = false;
var tmp;
var loader = document.getElementById('loader')
  , π = Math.PI
  , t = (seconds/360 * 1000);
//$('.title').text(α);
var playing = false;

function play() {
  document.getElementById('alarm').play();
  playing = true;
}

function stop() {
  document.getElementById('alarm').pause();
  document.getElementById('alarm').currentTime = 0;
  playing = false;
}


function getTimeSetting() {
  var clockSet = α;
  if (clockSet < 0) {
    clockSet *= -1;
  }
  else if (clockSet >= 180) {
    clockSet = 360 - clockSet;
  }
  else if (clockSet < 180 && clockSet > 0) {
    clockSet = (180 - clockSet) +180;
  }
 
  return clockSet;
}

function draw() {
  
  if (α <= -180) {
      α *=-1;
      α -= 2;
      }
  
  α+=(1/10);
  α %= 360;
if (α > -0.0000001 && α <=0) {
   α = 0;
 }
  //console.log("the alpha is "+α);
  var raw = (getTimeSetting()*(1/6)).toFixed(2);
  var mins = Math.floor(raw);
  var secs;
  
  if (!timing) {
  secs = (raw % 1)*60;
  secs = Math.floor(secs);
  tmp = secs;}
  else {secs = tmp-1;
       tmp--;
       if (tmp < 0) {
         tmp = 59;
         secs = 59;
         
       }
       }
 
  
  $('#readout').text(mins + " mins, "+secs+" secs");
  
  //$('.title').text(α);
  var r = ( α * π / 180 )
    , x = Math.sin( r ) * 125
    , y = Math.cos( r ) * -125
    , sweep = 0
    , lrg = ( α > 0 && α < 180) ? 1 : 0 
    , anim = 'M 0 0 v -125 A 125 125 1 ' 
           + lrg +' '+sweep+' '+ 
           +  x  + ' ' 
           +  y  + ' z';
  //[x,y].forEach(function( d ){
  //  d = Math.round( d * 1e3 ) / 1e3;
  //});
 
  loader.setAttribute( 'd', anim );
 
};

function approx() {
   α = Math.round(α/6)*6;
  α-=(1/10);
  draw();
}

function zeroOut() {
  α = -0.1;
  draw();
}

function point_it(event){
  timing = false;
  //thanks to EMANUELE FERONATO for parts of this script
  pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("pointer_div").offsetLeft;
  pos_y = event.offsetY?(event.offsetY):event.pageY-document.getElementById("pointer_div").offsetTop;
  //document.getElementById("cross").style.left = (pos_x-1) ;
  //document.getElementById("cross").style.top = (pos_y-15) ;
  //document.getElementById("cross").style.visibility = "visible" ;
  //document.pointform.form_x.value = pos_x;
  //document.pointform.form_y.value = pos_y;
  console.log(pos_x + ", " + pos_y);
  var deltaX = (pos_x- 303);
  var deltaY = (pos_y - 303);
  var rad = Math.atan2(deltaY, deltaX);
  var deg = rad * (180 / Math.PI);
  deg +=90;
  console.log("The degree is "+ deg);
  α = deg;
  first_run = true;
  approx();
  var img = document.getElementById('pointer_div');
  var width = img.clientWidth;
  var height = img.clientHeight;
  console.log("the width is "+width+" and the height is: "+height);
}

$('#more').click(function(event) {
  α-=30.1;
  draw();
});
$('#less').click(function(event) {
  α+=29.9;
  draw();
});

var timeouts = [];
function startTimer() {
  play();
  stop();
  var clockSet = getTimeSetting();
  timing = true;
  timeouts = [];
  $('.control').text('Stop');
  $('.control').css('background-color', 'red');
   
  for ( var i = 1; i < (clockSet*10); i++) {
    var timer = setTimeout(draw, i*(500/3)/(1/6));
    timeouts.push(timer);
  }
  
  timer = setTimeout(play,((clockSet*10))*(500/3)/(1/6));
  timeouts.push(timer);
  timer = setTimeout(zeroOut, ((clockSet*10))*(500/3)/(1/6));
  timeouts.push(timer);
  
  /*if (-0.55 > α  && α < 0.55) {
   doPlay = true;
 }
  else {doPlay = false}*/
}

function endTimer() {
    for (var i = 0; i <= timeouts.length; i += 1) {
            clearTimeout(timeouts[i]);
        }
  $('.control').text('Begin');
  $('.control').css('background-color', 'white');
    stop();
    timing = false;
}
 
$('.control').click(function() {
  if (!timing) {
    startTimer();
  }
  else {endTimer();}
}) 
                         
 
$('#pointer_div').click(function() {
    endTimer();
});
var zero_clicked = false;
$('#zero').click(function() {
  if (!zero_clicked) {
  α = -.09;
  draw();
  zero_clicked = true;  
  }
  else {
   α = 0;
  approx();
    zero_clicked = false;
  }
 
})
$('#five').click(function() {
  α = 330;
  approx();
})

$('#ten').click(function() {
  α = 300;
  approx();
})

$('#fifteen').click(function() {
  α = 270;
  approx();
})
$('#twenty').click(function() {
  α = 240;
  approx();
})
$('#twenty-five').click(function() {
  α = 210;
  approx();
})
$('#thirty').click(function() {
  α = 180;
  approx();
})
$('#thirty-five').click(function() {
  α = 150;
  approx();
})
$('#fourty').click(function() {
  α = 120;
  approx();
})
$('#fourty-five').click(function() {
  α = 90;
  approx();
})
$('#fifty').click(function() {
  α = 60;
  approx();
})
$('#fifty-five').click(function() {
  α = 30;
  approx();
})
