// 选项卡
$(".right_top a").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
	if($(this).index()==0){
		$(".one").css({display:"block"});
		$(".two").css({display:"none"});
	}else if($(this).index()==1){
		$(".two").css({display:"block"});
		$(".one").css({display:"none"});
	}
})
// 表单验证
//用户名
var isSure = false;
isSure = $("#userName").blur(function(){
	if($(this).val()==""){
		$("#errorbox").css({display:"block"}).html("请输入昵称/邮箱/手机号");
		return false;
	} else if(regs.userName.test($(this).val())){
		return true;
	} else {
		$("#errorbox").css({display:"block"}).html("汉字、字母、数字的组合，4-20个字符");
	}
})
$("#userName").focus(function(){
	$(this).val()=="";
	$("#errorbox").css({display:"none"}).html("");
})


//密码
var islogin = false;
islogin = $("#pwd").blur(function(){
	if($(this).val()==""){
		$("#errorbox").css({display:"block"}).html("请输入密码");
		return false;
	}else if(regs.pwd.test($(this).val())){
		return true;
	} else {
		$("#errorbox").css({display:"block"}).html("建议使用字母数字和特殊字符，在6到20位");
	}
})
$("#pwd").focus(function(){
	$(this).val()=="";
	$("#errorbox").css({display:"none"}).html("");
})

var regs={
		userName:/^(([\u4e00-\u9fa5])|[0-9a-zA-Z]){4,20}$/,
		mobile:/^1[3|4|5|7|8]\d{9}$/,
		pwd:/^.{6,20}$/
}

//两周内登录提交表单
$(".login").click(function(){
	if(isSure&&islogin&&($("#check input").prop("checked"))){
		
		$.cookie("userName", JSON.stringify($("#userName").val()), {expires: 14, path: "/"});
		$.cookie("pwd", JSON.stringify($("#pwd").val()), {expires: 14, path: "/"});
		// alert(11);
		
		
		$("#userName").val("");
		$("#pwd").val("");
		 location.href = "index.html";
	}
})   

if($.cookie("userName")||$.cookie("pwd")){
	$("#userName").val("");
	$("#pwd").val("");
	$("#userName").val($.cookie("userName").split("\"")[1]);
	$("#pwd").val($.cookie("pwd"));
}

// $(".login").click(function(){
// })
// $("form").submit(function(){
// 	location.href = "index.html";
// })

$(".login2").click(function(){
	if(isPhone&&($("#check input").prop("checked"))){
		$.cookie("userName", JSON.stringify($("#phone").val()), {expires: 14, path: "/"});
		$.cookie("pwd", JSON.stringify($("#pwd2").val()), {expires: 14, path: "/"});
		$("#phone").val("");
		location.href = "index.html";
	}
})   



//手机验证
var isPhone = false;
isPhone = $("#phone").blur(function(){
	if($(this).val()==""){
		$("#errorbox2").css({display:"block"}).html("请输入手机号");
		return false;
	} else if(regs.mobile.test($(this).val())){
		return true;
	} else {
		$("#errorbox2").css({display:"block"}).html("号码格式错误");
	}
})
$("#phone").focus(function(){
	$(this).val()=="";
	$("#errorbox2").css({display:"none"}).html("");
})


//动态密码(没有API接口做不了)
var timer;
$("#dongtaipwd").click(function(){
	clearInterval(timer);
	//发送请求
	var i = 60;
	timer = setInterval(function(){
		i--;
		console.log(i)
	},1000)
	if(i==0){
		clearInterval(timer);
		//再次发送请求
	}
})

// //刚进入页面查看是否有cookie？写入页面：不做操作
// // $(function(){
// // 	console.log(JSON.parse($.cookie("userName"))
// // })
// var userinfos = $.cookie("userinfo")? JSON.parse($.cookie("userinfo")) : {};
// for(var key in userinfos){
// 	$("#userName").html(userinfos[key].userName);
// 	$("#pwd").html(userinfos[key].password);
// }
// var userId = 0;

// if(userId in userinfos) {
// 	userinfos[userId].num++
// } else {
// 	var name = $("#userName").val("");
// 	var pwd = $("#pwd").val("");
// 	userinfos[userId] = {
// 		id: userId,
// 		userName: name,
// 		password: pwd,
// 	}
// }
// $.cookie("userinfo", JSON.stringify(userinfos), {expires: 14, path: "/"})
// // console.log($.cookie("userinfo"))

