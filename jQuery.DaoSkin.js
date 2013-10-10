/* 
 * @ name : DaoSkin
 * @ author : laodao
 * @ email : dao@yiye.me
 * @ introduction : 网页换肤jQuery插件
 * @ time : 2013/10/5
 * 
*/
;(function($){
    $.extend({
        "DaoSkin" : function(backImg,opacity,imgs,t,backFn,ajustFn){
         
         /**
          * 获取给定图片
          * 
          * 每六张为一页
          * 
          * 不足凑成一页的图片将被排除
          * */
         var imgNum = 0;
         var bacImgNum = '-1';
         var imgSrc = new Array();
         for( var imgIndex in imgs)
         {
               imgSrc[imgNum] = imgIndex;
               if(imgIndex === backImg)
               {
                  bacImgNum = imgNum; 
               }
               imgNum++;
         }
         var imgRow = Math.floor(imgNum/6);
         var imgLis = '';
         for(var i=0;i < imgRow;i++)
         {
              for(var j=0;j < 6;j++)
              {
                  imgLis += '<li><img src="./bgImg/'+imgSrc[i*6+j]+'"/><div class="d-skin-img-name">'+imgs[imgSrc[i*6+j]]+'</div><div class="d-skin-add-tag"></div></li>';
              }
         }
        
        /**
         * 在页面底部插入插件内容，完成初始化
         * 
         * 内容主要包括：
         *      入口图片
         *      设置面板
         *      背景图片层
         * */
        $('body').append('<div id="d-skin-layer" style="display: none;"><div id="d-skin-layer-content"><div id="d-skin-title"><em>轻松换肤，与众不同</em><span id="d-skin-ajust-container">'
                          +'<span class="d-skin-ajust-work">设置不透明度：<span>透明</span></span><span id="d-skin-ajust-bar"><span id="d-skin-ajust-btn"><em>100%</em>'
                          +'</span></span><span class="d-skin-ajust-work"><span>不透明</span></span></span>'
                          +'</div><div id="d-skin-wraper"><div id="d-skin-noimg"><div></div></div><div id="d-skin-imgs"><ul id="d-skin-imgs-ul">'
                          +imgLis+
                          '</ul></div></div><div id="d-skin-left"><a href="javascript:;" title="上一页"></a></div><div id="d-skin-right"><a href="javascript:;" title="下一页"></a></div></div><div id="d-skin-layer-close"><a></a></div>'
                          +'</div><div id="d-skin-entrance"><a href="javascript:;" title="设置背景"></a></div>'
                          +'<div class="d-skin-container"></div><div class="d-skin-container"></div>');
         
         
         //设定包含图片的ul的总宽度
         $('#d-skin-imgs-ul').css('width',884*imgRow+'px');
         
         //点击图片页滚动效果
         var imgPage = 0;
         $('#d-skin-left a').click(function(){
             if(imgPage > 0)
             {
                     imgPage -= 1;
                     $('#d-skin-imgs-ul').animate({'margin-left': -884*imgPage},900);
             }
         });
         $('#d-skin-right a').click(function(){
             if(imgPage < imgRow-1)
             {
                     imgPage += 1;
                     $('#d-skin-imgs-ul').animate({'margin-left': -884*imgPage},900);
             }
         });
         
         //页脚入口图片点击进入换肤面板
         $('#d-skin-entrance a').click(function(){
               $('#d-skin-layer').css('display','block');  
         });
         
         //关闭换肤设置面板
         $('#d-skin-layer-close a').click(function(){
               $('#d-skin-layer').css('display','none');  
         });
         
         /**
          * 透明度控制条
          * 
          * 具体控制通过moveAjustBtn函数
          */
         //初始化透明度
         if(0<=opacity<=1)
         {
             if(ajustFn instanceof Function)
             {
                    ajustFn(opacity); 
                    $('#d-skin-ajust-btn').css('left',Math.round(opacity*100)+'px');
                    $('#d-skin-ajust-btn em').text(Math.round(opacity*100)+'%');
             }
         }
         $('#d-skin-ajust-bar').on('click',function(e){
               moveAjustBtn(this,e);
         });
         $('#d-skin-ajust-btn').on('mousedown',function(e){
                 e.preventDefault();
                 $(document).bind('mousemove',function(e){
                    moveAjustBtn($('#d-skin-ajust-bar'),e);
                 });
         });
         $(document).on('mouseup',function(){
                 $(document).unbind('mousemove');
         });
         
         /**
          * 更换背景渐变效果
          * 
          * r : 圆形渐变
          * w : 斜度渐变
          * h : 水平渐变
          * v : 竖直渐变
          * 
          * 渐变参数未设定的情况下，渐变类型随即产生
          * 
          * 渐变时间为1.5秒
          * 
          * 在渐变过程中点击事件被锁定
          * */    
         locked = false;
         //初始化背景
         if((backImg !== undefined)&&(backImg !== '')&&bacImgNum !== '-1')
         {
             $('.d-skin-container').eq(1).css('backgroundImage','url(./bgImg/'+backImg+')');
             $('#d-skin-imgs-ul li').eq(bacImgNum).addClass('add');
         }
         else
         {
             $('.d-skin-container').eq(1).css('backgroundImage','none');
         }
         transition = new Array();
         transition['r'] = 'd-skin-radi';
         transition['w'] = 'd-skin-wipe';
         transition['h'] = 'd-skin-horizontal';
         transition['v'] = 'd-skin-vertical';
         if(t !== undefined && /^[rwhv]$/.test(t))
         {
             transitionCss = transition[t];
         }
         else
         {
             t = Math.floor(Math.random() * 4);
             transitionCss = transition[t];
         }
         $('#d-skin-imgs-ul li').click(function(){
                     if(!locked)
                     {
                         if(!$(this).is('.add'))
                         {
                             lock();
                             $(this).addClass('add').siblings('.add').removeClass('add');
                             $('.d-skin-container').eq(0).css('backgroundImage',$('.d-skin-container').eq(1).css('backgroundImage'));
                             $('.d-skin-container').eq(1).addClass(transitionCss);
                             $('.d-skin-container').eq(1).css({'background-image' : 'url('+$(this).find('img').attr('src')+')'});
                             setTimeout(function(){
                                   if(backFn instanceof Function)
                                   {
                                        backFn($(this).find('img').attr('src'));
                                   }
                                   $('.d-skin-container').eq(1).removeClass(transitionCss);
                                   unlock();
                             },1500); 
                         }   
                     }
                     
                 }); 
          $('#d-skin-noimg div').click(function(){
                if(!locked)
                {
                        lock();
                        $('#d-skin-imgs-ul li').removeClass('add');
                        $('.d-skin-container').eq(1).css({'background-image' : 'none'});
                        if(backFn instanceof Function)
                        {
                                backFn('none');
                        }          
                        unlock(); 
              }
          });
                 
         //背景渐变过程中的锁函数
         function unlock(){ 
				locked = false;
			}
	 function lock(){
				locked = true;
			}
                        
         //透明度调节按钮移动函数
         function moveAjustBtn(bar,e){
               btnLeft = e.pageX - $(bar).offset().left;
               if(btnLeft>=100) 
               {
                      btnLeftTxt = 100;
                      btnLeft = 100;
               }
               else if(btnLeft<=5)
               {
                      btnLeftTxt = 0;
                      btnLeft = 0;
               }
               else
               {
                      btnLeftTxt = Math.floor(btnLeft/5)*5;
                      btnLeft -= 5;
               }
               $('#d-skin-ajust-btn').css('left',btnLeft+'px');
               $('#d-skin-ajust-btn em').text(btnLeftTxt+'%');
               if(ajustFn instanceof Function)
               {
                    ajustFn(btnLeftTxt/100);
               }
         }
      }
    });
})(jQuery);

