DaoSkin
=======

仿百度首页换肤效果jQuery插件DaoSkin

演示demo：http://yiye.me/example/baidu/baidu.html

使用方向：

    在页面中载入插件文件jQuery.DaoSkin.js以及css文件DaoSkin.css
    
    将需要使用的背景图片放入bgImg文件夹中
    
    在页面中将图片信息保存入imgs对象中，格式参见参数说明或demo
    载入插件函数
    /*
		 * $.DaoSkin(backImg,opacity,imgs,t,backFn,ajustFn)
		 * 
		 * 参数设置
		 *	backImg ：预设的背景图名称，如 img01.jpg 
		 *	opacity ：预设透明度，0-1之间小数
		 *	imgs ：展示图片集，格式为{'图片名称':'展示名称', .... }
		 *	t ：背景图更换时过渡效果 r:圆形 w：斜度 h：横向 v：竖直
		 *	backFn ：接受新更换背景图片名称作为参数的自定义函数
		 *  ajustFn ：接受新设置透明度的值作为参数的自定义函数
		 */

    $.DaoSkin('img01.jpg','0.9',imgs,t,function(img){},function(p){});
    
更多参见demo

老道 dao@yiye.me
