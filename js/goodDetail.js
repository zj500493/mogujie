//百度搜索接口  
function baiduSearch(oContainer ,cbName){
	var searchInput=document.getElementById(oContainer);
	searchInput.onkeyup = function(){
		var value=this.value;
		var oScript = document.createElement("script");
		oScript.src="https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+value+"&json=1&p=3&cb="+cbName+"&t";
		document.body.appendChild(oScript);
	}
	
}

function test(data){
	var tipList=document.getElementsByClassName("search_tip")[0];
	tipList.innerHTML="";
	var arr=data.s;
	for(var i in arr){
		var oLi=document.createElement("li");
		oLi.innerHTML = arr[i];
		tipList.appendChild(oLi);
	}
}

baiduSearch("J_SearchKey","test");


$(".search_tip").delegate("li","mouseover",function(){
	$(this).addClass("checked").siblings().removeClass("checked");
	$("#J_SearchKey").val($(this).html());
})
$(".search_tip").delegate("li","click",function(){
	$(".search_tip").html("");
})
$("#J_SearchKey").blur(function(){
	$(".search_tip").html("");
})


//楼梯
var offsetTop = [];

$(window).scroll(function(){
	var iScrollTop = $(this).scrollTop();
	var h1 = $(".module-graphic h1");
	for(var i=0;i<h1.length;i++){
		offsetTop[i] = $(".module-graphic h1").eq(i).offset().top;
	}
	var isLouti = $(".module-graphic").offset().top;
	if(iScrollTop>=isLouti){
		$("#extranav-list").eq(0).addClass("selected").parent().siblings().removeClass("selected");
	}  
})
var isClick = false;

$(".extranav-list li").click(function(){
	isClick = true;
	$(this).addClass("selected").siblings().removeClass("selected");
	var iTop = offsetTop[$(this).index()];
	$("html ,body").stop().animate({scrollTop:iTop},1000,function(){
		isClick = false;
	})
})

$(window).scroll(function(){
	if(!isClick){
		var iScrollTop = $(window).scrollTop();
		for(var i in offsetTop){
			if(iScrollTop>=offsetTop[i]){
				$(".extranav-list li").eq(i).addClass("selected").siblings().removeClass("selected");
			}
		}
	}
})

//吸顶
var iTop = $(".tabbar-box").offset().top;
$(window).scroll(function(){
	var iScrollTop = $(window).scrollTop();
	if(iScrollTop<iTop){
		$(".tabbar-box").removeClass("ui-fixed");
		$("#J_ModuleShop .shop-info .shop-hd").removeClass("ui-fixed");
		$("#J_ModuleCart .cart-info .cart-hd").removeClass("ui-fixed");
		$("#J_ModuleExtranav .extranav-bd").removeClass("ui-fixed");
	} else if(iScrollTop>=iTop){
		$(".tabbar-box").addClass("ui-fixed");
		$("#J_ModuleShop .shop-info .shop-hd").addClass("ui-fixed");
		$("#J_ModuleCart .cart-info .cart-hd").addClass("ui-fixed");
		$("#J_ModuleExtranav .extranav-bd").addClass("ui-fixed");
	}
})


//列表页跳转到详情页内容填充
$(function(){
	var gooddetail = JSON.parse($.cookie("gooddetail"));
	// console.log(gooddetail)
	for(var key in gooddetail){
		$(".jqcjk-container .sp-thumbs img").attr({src:gooddetail[key].img});  
		$(".primary-goods .info-box h1 span").html(gooddetail[key].name);
		$(".property-cont #J_NowPrice").html(gooddetail[key].price);
		$(".jqcjk-container img").each(function(){
			$(this).attr({src:gooddetail[key].img});
			$(this).parent().attr({href:gooddetail[key].img});
		})
		// console.log(gooddetail[key].id)
	}
})


 

//购物车
$("#J_BuyCart").click(function() {
	var good = $.cookie("gooddetail")? JSON.parse($.cookie("gooddetail")) : {};
	var goodsrc = "";
	var goodId = "";
	for(var key in good){
		goodId = good[key].id;
		goodsrc = good[key].img;
	}
	var goods = $.cookie("carts")? JSON.parse($.cookie("carts")) : {};
	if(goodId in goods) {
		// console.log(goods[goodId].num)
		goods[goodId].num++
	} else {
		var goodName = $(".goods-title span").html();
		var goodPrice = $("#J_NowPrice").html();
		goods[goodId] = {
			id: goodId,
			name: goodName,
			price: goodPrice,
			img:goodsrc,
			num: 1
		}
	}
	$.cookie("carts", JSON.stringify(goods), {expires: 7, path: "/"})
	// console.log($.cookie("carts"));

})
$("#jieSuan").click(function() {
	location.href = "shopCar.html"
})


//飞入购物车效果
var i = 0;
$("#J_BuyCart").click(function(){
	var offset = $("#end").offset();//end 为在结束元素加一个ID ，将结束元素设置为fixed；
	var addcar = $(this); 
	i++;
	var img = $(".jqcjk-container img").attr("src"); //定义图片地址
	//将图片地址赋值给飞入效果的图片
	var flyer = $('<img class="u-flyer" style="width:100px;height:100px;z-index:1000000;border-radius:50px" src="'+img+'">'); 
	flyer.fly({ 
	    start: { 
	        left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed 
	        top: event.pageY-$(document).scrollTop() //开始位置（必填） 可视窗口的距离
	    }, 
	    end: { 
	        left: offset.left, //结束位置（必填） 
	        top: offset.top-$(document).scrollTop()+10, //结束位置（必填） 
	        width: 0, //结束时宽度 
	        height: 0 //结束时高度 
	    }, 
	    onEnd: function(){ //结束回调 
	    	// contCarNum();//数量++回调函数
	//              $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000); //提示信息                
	//              addcar.css("cursor","default").removeClass('orange').unbind('click'); 
	        // this.destory(); //移除dom 
	        $("#end .right_one").html(i);
	    }

	}); 
})


//选项卡
$(".tabbar-list li").click(function(){
	$(this).attr({"data-hasnav":false}).addClass("tab-graphic selected").siblings().attr({"data-hasnav":true}).removeClass("tab-graphic selected");
	console.log($(".panel-box .panal-title"));
	$(".panel-box .panel-title").eq($(this).index()).removeClass("ui-none").siblings().addClass("ui-none");
	// $(".panel-box #").eq($(this).index())
})


if($.cookie("userName")!=""&&$.cookie("pwd")!=""){
	// var a = $.cookie("userName").split("\"")[1];
	$(".subnav_right li").eq(0).html("欢迎").css({marginLeft:-120});;
	// $(".subnav_right li").eq(1).html(a).css({marginLeft:-80});
} 



$(".J_StyleList li").click(function(){
	$(this).css({borderColor:"#f00"}).siblings().css({borderColor:"#fff"});
})


$("#J_BuyNow").click(function(){
	location.href="pay.html";
	var good = $.cookie("gooddetail")? JSON.parse($.cookie("gooddetail")) : {};
	var goodsrc = "";
	var goodId = "";
	for(var key in good){
		goodId = good[key].id;
		goodsrc = good[key].img;
	}
	var goods = $.cookie("carts")? JSON.parse($.cookie("carts")) : {};
	if(goodId in goods) {
		// console.log(goods[goodId].num)
		goods[goodId].num++
	} else {
		var goodName = $(".goods-title span").html();
		var goodPrice = $("#J_NowPrice").html();
		goods[goodId] = {
			id: goodId,
			name: goodName,
			price: goodPrice,
			img:goodsrc,
			num: 1
		}
	}
	$.cookie("carts", JSON.stringify(goods), {expires: 7, path: "/"})
	// console.log($.cookie("carts"));

})


$(".num-reduce").click(function(){
	num = $(this).next().val();
	if(num!=0){
		num--;
		$(this).removeClass("num-disable");
	} else if(num==0){
		$(this).addClass("num-disable");
	}
	$(this).next().val(num);
})
//加
$(".num-add").click(function(){
	num = $(this).prev().val();
	num++;
	$(this).prev().val(num);
})


$(".size-list .c").css({"borderColor":"#f00"});