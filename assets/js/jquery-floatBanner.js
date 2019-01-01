(function ($) {
$.fn.floatBanner = function(imgUrl,width,height,speed,angle,targetUrl) { //定义插件的名称，这里为floatBanner

    /*  需求分析
    ** 进入站点首页，出现一个悬浮广告
    ** 悬浮广告会在窗口上漂浮，碰撞到窗口边缘会自动弹回
    ** 鼠标移到广告上方，则漂浮停止；鼠标离开后，则漂浮继续
    ** 封装成为一个jquery 插件
    */

    /*  使用方法
    **  1.在需要使用插件的页面中
    **      引入jquery库<script src="assets/js/jquery-1.9.1.min.js"></script>
    **      引入插件文件<script src="assets/js/jquery-floatBanner.js"></script>
    **  2.直接在页面中添加js代码调用插件方法 或者 在js文件中编写代码，并在页面中引入js文件
    **  对body元素调用hoverBanner()方法，并设置相关参数
    **  例如：$("body").floatBanner("assets/image/fixed-side-menu4.png",200,200,2,30,"aboutme.html");
    */

    /*  插件参数
    **  imgUrl: 设置广告框的图片
    **  以下为可选项，若需要采用默认值的参数处于中间位置，请填false
    **  width:  设置广告框宽度,单位为px，写参数时不要带单位,默认值200
    **  height: 设置广告框高度,单位为px，写参数时不要带单位,默认值200
    **  speed:  设置广告框移动速度，单位px/10毫秒，写参数时不要带单位,默认值2
    **  angle:  设置广告框移动角度，单位度（°），写参数时不要带单位,默认值30
    **  targetUrl: 设置广告跳转的目标页面，默认值#即不跳转
    */

    /*  功能介绍
    **  除需求分析中的功能外，本插件还有以下功能
    **  点击广告图片，跳转到相应页面
    **  点击关闭按钮，关闭广告框
    */

//参数初始化
    width  = width?width:200;
    height = height?height:200;
    speed  = speed==false?speed:2;
    angle  = angle==false?angle*2*Math.PI/360:30*2*Math.PI/360;
    targetUrl = targetUrl ? targetUrl:"#";

//获取可视界面的宽高
    var W = document.documentElement.clientWidth;
    var H = document.documentElement.clientHeight;
//往容器中加一个参数可设置的广告框
    //获取初始坐标
    var x = W * Math.random();
    var y = H * Math.random();
    //修正xy坐标，防止图片出界
    if(x>W-width){
        x = W-width;
    }
    if(y>H-height){
        y = H-height;
    }
    //设置img样式
    var imgstyle =  'style="'   +
                    'width:'    + width   + 'px;' +
                    'height:'   + height  + 'px;' +
                    'top:'      + y       + 'px;' +
                    'left:'     + x       + 'px;' +
                    'position: fixed'     + ';'   +
                    'z-index: 100'        + ';'   +
                    '"';
    //创建带超链接的img元素
    var img   = '<a href="'+ targetUrl + '">'   +     
                '<img '    + imgstyle     +
                'id="bannerImg"'       +
                'src="'    + imgUrl    + '" '  +
                'alt="banner"'         + '">'  +
                "</a>";
    
    //设置关闭按钮样式
    x=x+width-20;
    var btnstyle =  'style="'           +
                    'width:20px;'       +
                    'height:20px;'      +
                    'top:'      +   y   + 'px;' +
                    'left:'     +   x   + 'px;' +
                    'position: fixed'   + ';'   +
                    'z-index: 101'      + ';'   +
                    'cursor: pointer'   + ';'   +  
                    '"';
    //创建关闭按钮div
    var btn   = '<div '   + btnstyle    +  
                'id="bannerBtn"'       +
                '>X'                   +
                "</div>";            
    //往容器中添加img元素
    $(this).append(img);
    $(this).append(btn);

//为广告框添加漂浮动画
    var speed_x = speed*Math.cos(angle);
    var speed_y = speed*Math.sin(angle);

    //封装jquery动画函数
    function move(){
        $("#bannerImg").animate({
            left:   '+='+speed_x+'px',
            top:    '+='+speed_y+'px',
        },0);
        //使关闭按钮和广告框同步运动
        $("#bannerBtn").animate({
            left:   '+='+speed_x+'px',
            top:    '+='+speed_y+'px',
        },0);
    }

    function draw(){

        var bannerfn = function(){

            //判断广告框是否到达边界
            var x = parseFloat($("#bannerImg").css("left"));
            var y = parseFloat($("#bannerImg").css("top"));
            if(x>W-width){
                speed_x = speed_x>0?-speed_x:speed_x;
            }
            if(y>H-height){
                speed_y = speed_y>0?-speed_y:speed_y;
            }
            if(x<0){
                speed_x = speed_x<0?-speed_x:speed_x;
            }
            if(y<0){
                speed_y = speed_y<0?-speed_y:speed_y;
            }

            //移动
            move();
        }

        //添加计时器使广告框持续运动
        var bannertimer = setInterval(() => {
            bannerfn();
        },10);


        //为广告框添加鼠标事件监听，实现鼠标移入时广告框停止移动，移出时广告框继续移动
        $("#bannerImg").hover(function(){
            clearInterval(bannertimer);
        })
        $("#bannerImg").mouseout(function(){
            bannertimer = setInterval(() => {
                bannerfn();
            },10);
        })

        //为关闭按钮添加鼠标事件监听
        //因为关闭按钮的z-index大于广告框的z-index，
        //所以需要添加以下鼠标事件监听，防止鼠标移入关闭按钮的时候广告框还在运动
        $("#bannerBtn").hover(function(){
            clearInterval(bannertimer);
        })
        $("#bannerBtn").mouseout(function(){
            bannertimer = setInterval(() => {
                bannerfn();
            },10);
        })
        //点击关闭按钮，删除广告框和关闭按钮
        $("#bannerBtn").click(function(){
            $("#bannerImg").remove();
            $("#bannerBtn").remove();
        })
    }

    draw();

}
})(jQuery);