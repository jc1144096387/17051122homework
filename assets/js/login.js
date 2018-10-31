function validateForm(){
    var usename = document.forms["form-login"]["usename"].value;
    var password = document.forms["form-login"]["password"].value;
    if(validateUsename(usename)){
        validatePassword(password);
    }
}
function validateUsename(usename){
    if(!required(usename)){
        return false;
    }
    if(validateEmail(usename)||validatePhoneNumber(usename)){
        return true;
    }else{
        alert("用户名必须是邮箱或者手机号");
        return false;
    }
}
function validatePassword(password){
    if(!required(password)){
        return false;
    }
    var reg =/^\S{6,16}$/;
    if(reg.test(password)){
        return true;
    }else{
        alert("密码必须为6-16位且不能使用空格");
        return false;
    }
}
function required(x){
    console.log(x);
    if (x==null || x==""){
        alert("请填写必填内容");
        return false;
    }else{
        return true;
    }
}
function validateEmail(x){
    var atpos=x.indexOf("@");        
    var dotpos=x.lastIndexOf(".");        
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length){              
        return false;        
    }else{
        return true;
    }     
}
function validatePhoneNumber(x){
    var reg = /^[0-9]{11}$/;
    if(reg.test(x)){
        return true;
    }else{
        return false;
    }
}