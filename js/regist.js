//手机号码验证
var isPhone = false;
isPhone = $("#userphone").blur(function(){
	if($(this).val()==""){
		$("#errorbox").css({display:"block"}).html("请输入手机号");
		return false;
	} else if(regs.mobile.test($(this).val())){
		return true;
	} else {
		$("#errorbox").css({display:"block"}).html("号码格式错误");
	}
})
$("#userphone").focus(function(){
	$(this).val()=="";
	$("#errorbox").css({display:"none"}).html("");
})

var regs={
	mobile:/^1[3|4|5|7|8]\d{9}$/
}


//动态密码发送
// var timer;
// $("#get_code").click(function(){
// 	clearInterval(timer);
// 	var	yanzhengma = yanzhengCode(4);
// 	// console.log(yanzhengma);
// 	//发送请求
// 	var i = 60;
// 	timer = setInterval(function(){
// 		i--;
// 		// console.log(i)
// 	},1000)
// 	if(i==0){
// 		clearInterval(timer);
// 		//再次发送请求
// 	}
// })

$("#get_code").click(function(){
	var yanzhengma = yanzhengCode(4);
	$("#errorbox").css({display:"block"}).html(yanzhengma);
	$("#userphone").html($('#userphone').html(''));
})

function yanzhengCode(n){
	var tmp;
	var sum = ""
	for(var i=0 ;i<n;i++){
		tmp = parseInt(Math.random()*10)
		sum += tmp;
	}
	return sum;
}

//动态密码验证
var isYanzheng = false;
isYanzheng = $("#yanzheng").blur(function(){
	if($(this).val()==""){
		$("#errorbox").css({display:"block"}).html("请输入验证码");
		return false;
	} else if($(this).val()==$("#errorbox").html()){
		$("#errorbox").css({display:"none"}).html("");
		return true;
	} else {
		$("#errorbox").css({display:"block"}).html("验证码错误");
	}
})


//数据库写入用户
$("#sub").click(function(){
	// alert(11)
	$.cookie("userName", JSON.stringify($("#userphone").val()), {expires: 14, path: "/"});
	// console.log(JSON.parse($.cookie("userName")))
})


$("#sub").click(function(){
	location.href="login.html";
})