//百度搜索接口
function baiduSearch(oContainer ,index ,cbName){
	var searchInput=document.getElementsByClassName(oContainer)[index];
	searchInput.onkeyup = function(){
		var value=this.value;
		var oScript = document.createElement("script");
		oScript.src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+value+"&json=1&p=3&cb="+cbName+"&t";
		document.body.appendChild(oScript);
	}
	
}

function test(data){
	var tipList=document.getElementsByClassName("tipList")[0];
	tipList.innerHTML="";
	var arr=data.s;
	for(var i in arr){
		var oLi=document.createElement("li");
		oLi.innerHTML = arr[i];
		tipList.appendChild(oLi);
	}
}

baiduSearch("search_box",0,"test");

$(".tipList").delegate("li","mouseover",function(){
	$(this).css({background:"#f00",color:"#fff"}).siblings().css({background:"#fff",color:"#f00"});
	$(".search_box").val($(this).html());
})
$(".tipList").delegate("li","click",function(){
	$(".tipList").html("");
})
$(".search_box").blur(function(){
	$(".tipList").html("");
})

//分页加载
fenye("../data/goodList/list0.json");
$(".waterfall").html("");
$(".list ul li").eq(0).css({background:"#999",color:"#fff"});
$(".list ul li").click(function(){
	$(this).css({background:"#999",color:"#fff"}).siblings().css({background:"#fff",color:"#000"});
	$(".waterfall").html("");
	var i = $(this).index();
	// console.log(i);
	var aName = "../data/goodList/list"+i+".json";
	fenye(aName);
})

function fenye(url){
	$.get(url,function(data){
		for(var key in data){
			$(".waterfall").append('<div class="good">'+
									'<a class="good_pic" href="##">'+
										'<img src="'+data[key].img+'"/>'+
									'</a>'+
									'<a class="good_detail">'+
										'<p>'+data[key].name+'</p>'+
										'<div>'+
											'<b>'+data[key].price+'</b>'+
											'<span>'+data[key].id+'</span>'+
										'</div>'+
									'</a>'+
								'</div>');
			bangding();
		}
	})
}


// function fenye(url){

// 	$.ajax({
// 		type:"get",
// 		url:url,
// 		async:false,
// 		success:function(data){
// 			// console.log(data)
// 			// for(var key in data){
// 				console.log(data["g0"].img)
// 				// $(".waterfall").html('<div class="good">'+
// 				// 	'<a class="good_pic" href="">'+
// 				// 		'<img src="'+data["g0"].img+'"/>'+
// 				// 	'</a>'+
// 				// 	'<a class="good_detail">'+
// 				// 		'<p>'+data["g0"].name+'</p>'+
// 				// 		'<div>'+
// 				// 			'<b>'+data["g0"].price+'</b>'+
// 				// 			'<span>'+data["g0"].id+'</span>'+
// 				// 		'</div>'+
// 				// 	'</a>'+
// 				// '</div>')
//  				$(".waterfall").append("<img src ='../img/index/index(42).jpg'/>")
// 			// }
// 		}
// 	})
// }


//导航栏下的数据加载


//导航栏加载
$(".nav ul li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
})


// //商品点击存入cookie，进入详情页
function bangding(){
	$(".good").click(function(){
		var goodId = $(this).index();
		var goods = {};
		var goodid = $(this).find(".good_detail div span").html();
		var goodName = $(this).find(".good_detail p").html();
		var goodPrice = $(this).find(".good_detail div b").html();
		var goodsrc = $(this).find(".good_pic img").attr("src");
		goods[goodId] = {
			id: goodId,
			name: goodName,
			price: goodPrice,
			img: goodsrc
		}
		$.cookie("gooddetail", JSON.stringify(goods), {expires: 7, path: "/"});
		location.href="goodDetail.html";
	})
}



if($.cookie("userName")!=""&&$.cookie("pwd")!=""){
	console.log($(".subnav_right li"))
	var a = $.cookie("userName").split("\"")[1];
	$(".subnav_right li").eq(0).html("欢迎").css({marginLeft:-120});;
	$(".subnav_right li").eq(1).html(a).css({marginLeft:-80});
} 