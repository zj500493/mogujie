//结算置底
$(window).scroll(function(){
	var iHeight = $(".footer").outerHeight(true);
	var docHeight = $(document).outerHeight(true);
	var iScrollTop = $(window).scrollTop();
	var iOffsetTop = $(".footer").offset().top;
//	console.log(iOffsetTop+iHeight-docHeight)
//	console.log(iScrollTop);
//	console.log(iHeight)
if(iScrollTop==iOffsetTop+iHeight-docHeight+414){//414	用于匹配iScrollTop的死值
		$(".count").css({position:"static"});
		$(".count .go").css({background:"#ddd"});
} else {
		$(".count").css({position:"fixed",bottom:0});
	}
})

//选项卡

$(".goods_nav li").click(function(){
	$(this).addClass("choose").siblings().removeClass("choose");
	if($(this).index()==1){
		$(".goods").css({display:"none"});
		$(".youhui").css({display:"block"});
	} else if($(this).index()==0){
		$(".goods").css({display:"block"});
		$(".youhui").css({display:"none"});
	}
})



//购物车存的cookie里面取内容填充到页面
var iId = 0;
$(".goods_lists .xiangqing").html("");
	var good = $.cookie("carts")? JSON.parse($.cookie("carts")) : {};
	// console.log(good);
	for(var key in good){
		iId = good[key].id;
	// console.log(iId);
	var danjia = Number(good[key].price.split("￥")[1]);
	// console.log(good[key].price.split("￥")[1])
	// console.log(typeof(good[key].price))

	var xiaoji = good[key].num*danjia;
	// console.log(good[key].img)
	$(".goods_lists .xiangqing").append('<li class="goods_detail" id="'+iId+'">'+
						'<div>'+
							'<ul class="tou">'+
								'<li>'+
									'<input type="checkbox"/>'+
									'<img src="'+good[key].img+'">'+
								'</li>'+
								'<li class="name">'+good[key].name+'</li>'+
								'<li>'+good[key].price+'</li>'+
								'<li>'+
									'<span class="num1 jian">-</span>'+
									'<span class="num1 geshu">'+good[key].num+'</span>'+
									'<span class="num1 jia">+</span>'+
								'</li>'+
								'<li class="xiaoji">'+xiaoji+'</li>'+
								'<li class="del">删除</li>'+
							'</ul>'+
						'</div>'+
					'</li>')

}
shuliang();




// var good = $.cookie("carts")? JSON.parse($.cookie("carts")) : {};
// var id = "";
// var num1 = "" ;
// for(var key in good){
// 	id = good[key].id;
// 	num1 = good[key].num;
// }


function goodcheck1(){
	var good = $.cookie("gooddetail")? JSON.parse($.cookie("gooddetail")) : {};
	// console.log($(".xiangqing .goods_detail").length);
	for(var i=0;i<$(".xiangqing .goods_detail").length;i++){
		var goodsrc = "";
		var goodId = $(".goods_detail").eq(i).attr("id");
		// console.log(goodId)
		for(var key in good){
			goodId = good[key].id;
			goodsrc = good[key].img;
		}
		var goods = $.cookie("carts")? JSON.parse($.cookie("carts")) : {};
		if(goodId in goods) {
			// console.log(goods[goodId].num)
			goods[goodId].num++;
		} else {
			var goodName = $(".tou .name").html();
			var goodPrice = $(".tou .name").next().html();
			var goodNum = $(".goods_detail .tou .geshu").html();
			// console.log(goodNum)
			goods[goodId] = {
				id: goodId,
				name: goodName,
				price: goodPrice,
				img:goodsrc,
				num: 1
			}
		}
	}
	
	$.cookie("carts", JSON.stringify(goods), {expires: 7, path: "/"})
	// console.log($.cookie("carts"));
}



function goodcheck2(){
	var good = $.cookie("gooddetail")? JSON.parse($.cookie("gooddetail")) : {};
	// console.log($(".xiangqing .goods_detail").length);
	for(var i=0;i<$(".xiangqing .goods_detail").length;i++){
		var goodsrc = "";
		var goodId = $(".goods_detail").eq(i).attr("id");
		// console.log(goodId)
		for(var key in good){
			goodId = good[key].id;
			goodsrc = good[key].img;
		}
		var goods = $.cookie("carts")? JSON.parse($.cookie("carts")) : {};
		if(goodId in goods) {
			// console.log(goods[goodId].num)
			goods[goodId].num--;
		} else {
			var goodName = $(".tou .name").html();
			var goodPrice = $(".tou .name").next().html();
			var goodNum = $(".goods_detail .tou .geshu").html();
			// console.log(goodNum)
			goods[goodId] = {
				id: goodId,
				name: goodName,
				price: goodPrice,
				img:goodsrc,
				num: 1
			}
		}
	}
	
	$.cookie("carts", JSON.stringify(goods), {expires: 7, path: "/"})
	// console.log($.cookie("carts"));
}

// function goodcheck3(){
// 	var good = $.cookie("gooddetail")? JSON.parse($.cookie("gooddetail")) : {};
// 	// console.log($(".xiangqing .goods_detail").length);
// 	for(var i=0;i<$(".xiangqing .goods_detail").length;i++){
// 		var goodsrc = "";
// 		var goodId = $(".goods_detail").eq(i).attr("id");
// 		// console.log(goodId)
// 		for(var key in good){
// 			goodId = good[key].id;
// 			goodsrc = good[key].img;
// 		}
// 		var goods = $.cookie("carts")? JSON.parse($.cookie("carts")) : {};
// 			console.log(goods[goodId])

// 		if(goodId in goods) {
// 			// console.log(goods[goodId])
// 			delete goods[goodId]
// 		} else {
// 			var goodName = $(".tou .name").html();
// 			var goodPrice = $(".tou .name").next().html();
// 			var goodNum = $(".goods_detail .tou .geshu").html();
// 			// console.log(goodNum)
// 			goods[goodId] = {
// 				id: goodId,
// 				name: goodName,
// 				price: goodPrice,
// 				img:goodsrc,
// 				num: 1
// 			}
// 		}
// 	}
	
// 	$.cookie("carts", JSON.stringify(goods), {expires: 7, path: "/"})
// 	// console.log($.cookie("carts"));
// }



function shuliang(){
	var num = "";
	var danjia = "";
	// console.log(id)
	

	//页面加减数量
	//减
	$(".xiangqing .jian").click(function(){
		for(var key in good){
			id = good[key].id;
		}
		num = $(this).next().html();
		if(num!=0){
			num--;
		}
		$(this).next().html(num);
		danjia = Number($(this).parent().siblings().eq(2).html().split("￥")[1]);
		$(this).parent().next().html(danjia*num);
		jiesuan();
		var id = $(this).parents(".goods_detail").attr("id");
		goodcheck2();

		$.cookie("carts",JSON.stringify(good),{expires:7,path:"/"})
	})
	//加
	$(".xiangqing .jia").click(function(){

		num = $(this).prev().html();
		num++;
		$(this).prev().html(num);
		danjia = Number($(this).parent().siblings().eq(2).html().split("￥")[1]);
		$(this).parents(".tou").find(".xiaoji").html(danjia*num);
		jiesuan();
		var id = $(this).parents(".goods_detail").attr("id");
		goodcheck1();
	})
	//删除按钮
	$(".del").click(function(){
		$(this).parents(".goods_detail").remove();
		jiesuan();
		var aa = $(".goods_detail").prop("id");
		// console.log(aa);
		delete(good[id]);
		$.cookie("carts",JSON.stringify(good),{expires:7,path:"/"})
		// goodcheck3();
	})
}

if($.cookie("userName")!=""||$.cookie("pwd")!=""){
	// console.log($(".subnav_right li"))
	var a = $.cookie("userName").split("\"")[1];
	$(".subnav_right li").eq(0).html("");
	$(".subnav_right li").eq(1).html(a).css({marginLeft:-100});
} 





//金额结算
$(".xiangqing input[type='checkbox']").click(function(){
	jiesuan();
	//结算按钮的颜色变化
	if(Number($(".count_right em").html().split("￥")[1])!=0){
		$(".go").css({background:"orange"});
		
	}else{
		$(".go").css({background:"#d8d8d8"});

	}

})

//全选
$("#all").click(function(){
	if($("#all").prop("checked")){
		$(".goods_lists input[type='checkbox']").each(function(){
			$(this).prop("checked",true);
		})
	} else {
		$(".goods_lists input[type='checkbox']").each(function(){
			$(this).prop("checked",false);
		})
	}
	jiesuan();

	//结算按钮的颜色变化
	if(Number($(".count_right em").html().split("￥")[1])!=0){
		$(".go").css({background:"orange"});
	}else{
		$(".go").css({background:"#d8d8d8"});
	}
})


//商品数量
$(".goods_nav span").html('('+$(".xiangqing input[type='checkbox']").length+')');



//金额结算函数
function jiesuan(){
	var sum = 0;

	// console.log($(".xiangqing input[type='checkbox']").length)
	for(var i=0;i<$(".xiangqing input[type='checkbox']").length;i++){
		if($(".xiangqing input[type='checkbox']").eq(i).prop("checked")){
			sum += Number($(".xiangqing .xiaoji").eq(i).html());
		}
		// console.log(Number($(".xiangqing .xiaoji").html()));
	}
	$(".count_right em").html("￥"+sum);
}

$(".go").click(function(){
	if($.cookie("#userName")==""){
		location.href="login.html";
	} else {
		location.href="pay.html";
	}
})
	



if($.cookie("userName")!=""&&$.cookie("pwd")!=""){
	console.log($(".subnav_right li"))
	var a = $.cookie("userName").split("\"")[1];
	$(".subnav_right li").eq(0).html("欢迎").css({marginLeft:-120});;
	$(".subnav_right li").eq(1).html(a).css({marginLeft:-80});
} 


// $.cookie("carts",JSON.stringify(good),{expires:-1,path:"/"})
