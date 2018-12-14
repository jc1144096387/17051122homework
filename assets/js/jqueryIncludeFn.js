function include(tpl){
    //传入模板文件的名称
    //页面中需要有一个id与模板文件同名的容器
    $.get("./tpl/"+ tpl +".tpl", function(result){      
        $("#"+tpl).html(result);
      });
}