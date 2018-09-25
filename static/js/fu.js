//  前端页面简略检测xss攻击 定死数字字母开头
$("input[name='username']").change(function(){
    var changeVal=$("input[name='username']").val();
    var reg=/^[0-9a-zA-Z]+$/
    if(!reg.test(changeVal)){
     $("input[name='username']").val("").focus();
     alert("只允许数字加英文的组合");
    }
 })
 $("input[name='password']").change(function(){
    var changeVal=$("input[name='username']").val();
    var reg=/^[0-9a-zA-Z]+$/
    if(!reg.test(changeVal)){
     $("input[name='password']").val("").focus();
     alert("只允许数字加英文的组合");
    }
 })

$("#xiala_username").mouseover(function(){

})
