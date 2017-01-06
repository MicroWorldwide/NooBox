console.log('yo');
var screenshotDataURL;
var drag = {
  elem: null,
  x: 0,
  y: 0,
  state: false
};
var delta = {
  x: 0,
  y: 0
};
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request=='loaded'){
      sendResponse('yes');
    }
    if('job' in request){
      if(request.job=='screenshotSearch'){
        var div=$('<div id="NooBox-screenshot" style="margin:0px;border:0px;padding:0px;z-index:999999999999999999999;border: 6px solid #6e64df;position:absolute;left:0px;top:'+document.body.scrollTop+'px;" ></div>');
        var img=new Image;
        img.src=request.data;
        img.onload=function(){
          console.log('load');
          div.append('<div class="NooBox-screenshot-search" style="margin:0px;border:0px;padding:0px;cursor:pointer;height: '+($(window).height()-52-($(window).height()-250)/2)+'px;width: 35px;float: right;padding-top: '+($(window).height()-250)/2+'px;text-align: center;background-color:rgba(130,255,130,0.8);font-size: 44px;word-wrap: break-word;line-height: 44px;">GO!!!</div>');
          div.append('<canvas width='+img.width+' height='+img.height+' style="margin:0px;border:0px;padding:0px;margin:0px;border:6px dashed pink;height:'+($(window).height()-52)+'px" class="NooBox-screenshot-canvas"></canvas>');
          div.append('<div class="NooBox-screenshot-switch" style="margin:0px;border:0px;padding:0px;margin-top:-3px;cursor:pointer;user-select: none;width: 100%;height: 29px;font-size: 30px;text-align: center;line-height: 30px;background: rgba(255,133,155,0.7);">XXX</div>');
          div.append('<div class="NooBox-screenshot-cursorTopLeft NooBox-shiny" style="margin:0px;border:0px;padding:0px;z-index:3;cursor:crosshair;left:-7px;top:-7px;position:absolute;border-radius:50%;width:13px;height:13px"></div>');
          div.append('<div class="NooBox-screenshot-cursorBottomRight NooBox-shiny" style="margin:0px;border:0px;padding:0px;z-index:3;cursor:crosshair;left:'+($(window).height()-52)/img.height*img.width+'px;top:'+($(window).height()-52)+'px;position:absolute;border-radius:50%;width:13px;height:13px"></div>');
          div.append('<div class="NooBox-screenshot-coverTop" style="margin:0px;border:0px;padding:0px;position:absolute;top:7px;background-color:rgba(0,0,0,0.618)"></div>');
          div.append('<div class="NooBox-screenshot-coverRight" style="margin:0px;border:0px;padding:0px;position:absolute;right:41px;background-color:rgba(0,0,0,0.618)"></div>');
          div.append('<div class="NooBox-screenshot-coverBottom" style="margin:0px;border:0px;padding:0px;position:absolute;bottom:35px;background-color:rgba(0,0,0,0.618)"></div>');
          div.append('<div class="NooBox-screenshot-coverLeft" style="margin:0px;border:0px;padding:0px;position:absolute;left:6px;background-color:rgba(0,0,0,0.618)"></div>');
          $('body').append(div);
          $('body').append('<style>@keyframes shiny{0%{background-color:white}20%{background-color:yellow}40%{background-color:red}60%{background-color:black}80%{background-color:blue}} .NooBox-shiny{animation: shiny 5s infinite}</style>');
          $('.NooBox-screenshot-switch').on('click',function(e){
            $(e.target).parent().remove();
          });
          $('.NooBox-screenshot-cursorTopLeft').on('mousedown',function(e){
            if(!drag.state){
              drag.elem = this;
              drag.x = e.pageX;
              drag.y = e.pageY;
              drag.state = true;
            }
          });
          $('.NooBox-screenshot-cursorBottomRight').on('mousedown',function(e){
            if(!drag.state){
              drag.elem = this;
              drag.x = e.pageX;
              drag.y = e.pageY;
              drag.state = true;
            }
          });
          $(document).mousemove(function(e) {
            if (drag.state) {
              delta.x = e.pageX - drag.x;
              delta.y = e.pageY - drag.y;
              var cur_offset = $(drag.elem).offset();
              $(drag.elem).offset({
                left: (cur_offset.left + delta.x),
                top: (cur_offset.top + delta.y)
              });
              drag.x = e.pageX;
              drag.y = e.pageY;
              var left1=$(e.target).parent().find('.NooBox-screenshot-cursorTopLeft').offset().left;
              var top1=$(e.target).parent().find('.NooBox-screenshot-cursorTopLeft').offset().top;
              var left2=$(e.target).parent().find('.NooBox-screenshot-cursorBottomRight').offset().left;
              var top2=$(e.target).parent().find('.NooBox-screenshot-cursorBottomRight').offset().top;
              var canvasTop=$(e.target).parent().find('.NooBox-screenshot-canvas').offset().top;
              var canvasLeft=$(e.target).parent().find('.NooBox-screenshot-canvas').offset().left;
              var canvasWidth=$(e.target).parent().find('.NooBox-screenshot-canvas').width();
              var canvasHeight=$(e.target).parent().find('.NooBox-screenshot-canvas').height();
              var left=Math.min(left1,left2);
              var top=Math.min(top1,top2);
              var width=Math.abs(left1-left2);
              var height=Math.abs(top1-top2);
              var temp;
              $(e.target).parent().find('.NooBox-screenshot-coverTop').css({left:(left-canvasLeft+7)+'px',width:(canvasWidth-(left-canvasLeft))+'px',height:(top-canvasTop)+'px'});
              temp=Math.max((top-canvasTop+7),6);
              $(e.target).parent().find('.NooBox-screenshot-coverRight').css({top:temp+'px',width:(canvasWidth-(left+width)+6)+'px',height:(canvasHeight-temp+6)+'px'});
              $(e.target).parent().find('.NooBox-screenshot-coverBottom').css({left:'6px',width:(canvasWidth-(canvasWidth-(left+width))-6)+'px',height:(canvasHeight-height-top+canvasTop)+'px'});
              $(e.target).parent().find('.NooBox-screenshot-coverLeft').css({top:'6px',width:(left-4)+'px',height:(top+height-canvasTop+1)+'px'});
            }
          });
          $(document).mouseup(function() {
            if (drag.state) {
              drag.state = false;
            }
          });
          $('.NooBox-screenshot-search').on('click',function(e){
            var left1=$(e.target).parent().find('.NooBox-screenshot-cursorTopLeft').offset().left;
            var top1=$(e.target).parent().find('.NooBox-screenshot-cursorTopLeft').offset().top;
            var left2=$(e.target).parent().find('.NooBox-screenshot-cursorBottomRight').offset().left;
            var top2=$(e.target).parent().find('.NooBox-screenshot-cursorBottomRight').offset().top;
            var left=Math.min(left1,left2)+2;
            var top=Math.min(top1,top2)+1;
            var width=Math.abs(left1-left2);
            var height=Math.abs(top1-top2);
            var canvasTop=$(e.target).parent().find('.NooBox-screenshot-canvas').offset().top;
            var canvasLeft=$(e.target).parent().find('.NooBox-screenshot-canvas').offset().left;
            var ratio=img.height/$(e.target).parent().find('.NooBox-screenshot-canvas').height();
            var imgData=$(e.target).parent().find('.NooBox-screenshot-canvas')[0].getContext('2d').getImageData((left-canvasLeft)*ratio,(top-canvasTop)*ratio,(width)*ratio,(height)*ratio);
            var canvas1 = document.createElement("canvas");
            canvas1.width=(width)*ratio;
            canvas1.height=(height)*ratio;
            var ctx=canvas1.getContext('2d');
            ctx.putImageData(imgData,0,0);
            var dataURL=canvas1.toDataURL();
            chrome.extension.sendMessage({job: 'imageSearch_upload',data:dataURL});
          });
          setTimeout(loadScreenshot,300);
        }
        var loadScreenshot=function(){
          var canvas=$('.NooBox-screenshot-canvas').last()[0];
          if(!canvas){
            setTimeout(loadScreenshot,300);
          }
          else{
            var ctx=canvas.getContext('2d');
            ctx.drawImage(img,0,0);
          }
        }
      }
    }
  }
);