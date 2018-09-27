//将以下代码放入window.onload或者把js文件在body底部引用，不然会获取不到元素

var bannerLeft = document.getElementsByClassName("bannerLeft");
var bannerRight = document.getElementsByClassName("bannerRight");
function hover(){
    
    bannerRight[0].onmouseover = function(){
        loseHover(1);
        loseHover(2);
        loseHover(3);
        loseHover(4);
        getHover(0);
    }
    bannerRight[1].onmouseover = function(){
        loseHover(0);
        loseHover(2);
        loseHover(3);
        loseHover(4);
        getHover(1);
    }
    bannerRight[2].onmouseover = function(){
        loseHover(1);
        loseHover(0);
        loseHover(3);
        loseHover(4);
        getHover(2);
    }
    bannerRight[3].onmouseover = function(){
        loseHover(1);
        loseHover(2);
        loseHover(0);
        loseHover(4);
        getHover(3);
    }
    bannerRight[4].onmouseover = function(){
        loseHover(1);
        loseHover(2);
        loseHover(3);
        loseHover(0);
        getHover(4);
    }
    
}
function getHover(i){
    bannerLeft[i].style.zIndex = "1";
    opacity(1,i);
    blockSwitch(i);
         
}
function loseHover(i){
    bannerLeft[i].style.zIndex = "-2";
    bannerLeft[i].style.opacity = 0;
}

//实现透明渐变
var opacity_alpha = [1,0,0,0,0];
var opacity_speed = 0;
var opacity_timer = null;
function opacity(target,i){
    opacity_alpha[i] = 0;
    clearInterval(opacity_timer);
    opacity_timer = setInterval(function(){
        if(target > opacity_alpha[i]){
            opacity_speed = 0.02;
        }else if(target < opacity_alpha[i]){
            opacity_speed = -0.02;
        }
        if(opacity_alpha[i] > target - 0.01){
            opacity_speed = 0;
            clearInterval(opacity_timer);
        }else{
            opacity_alpha[i] += opacity_speed;
            
            bannerLeft[i].style.opacity = opacity_alpha[i];
        }

    },50);
}

//实现滑块滑动
var switch_marginTop = 0;
var switch_speed = 0;
var switch_timer = null;
var switch_target = 0;
var switchBlock = document.getElementsByClassName("hover-bg");
function blockSwitch(i){
    
    switch_target = 60 * i;
    console.log(switch_target);
    clearInterval(switch_timer);
    switch_timer = setInterval(function(){
        if(switch_target > switch_marginTop){
            switch_speed = 4;
        }else if(switch_target < switch_marginTop){
            switch_speed = -4;
        }
        if(switch_marginTop == switch_target ){
            switch_speed = 0;
            clearInterval(switch_timer);
        }else{
            switch_marginTop += switch_speed;
            //注意 + "px"          
            switchBlock[0].style.marginTop = switch_marginTop + "px";
        }
    },30);
}

function auto(){
    
}



hover();