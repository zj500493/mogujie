//楼梯
$(window).scroll(function(){
	var iScrollTop = $(this).scrollTop();
	var isLouti = $(".main_min").offset().top+60;
	var isLoutiEnd = $(".list").offset().top-$(".louti").outerWidth()/2+65;
	if(iScrollTop>=isLouti&&iScrollTop<=isLoutiEnd){
		$("#loutiNav").css({display:"block"});
		$("#loutiNav").eq(0).find("span").addClass("active").parent().siblings().find("span").removeClass("active");
	}  else {
		$("#loutiNav").css({display:"none"});
	}
})
var isClick = false;
$("#loutiNav ul li").click(function(){
	isClick = true;
	$(this).find("span").addClass("active").parent().siblings().find("span").removeClass("active");
	var iTop = $(".louti").eq($(this).index()).offset().top;
	$("html ,body").stop().animate({scrollTop:iTop},1000,function(){
		isClick = false;
	});
})

$(window).scroll(function(){
	if(!isClick){
		var iScrollTop = $(window).scrollTop();
		$(".louti").each(function(){
			if(iScrollTop>=$(this).offset().top-$(this).prev().outerHeight()/2){
				$("#loutiNav ul li").eq($(this).index()).find("span").addClass("active").parent().siblings().find("span").removeClass("active");
			}
		})
	}
})
//轮播
		
var oDiv = document.getElementById("big_box");
fadelunbo(oDiv,4000)


//吸顶和吸顶时的NAV变化
var iOffsetTop = $(".main_min").offset().top;
$(window).scroll(function(){
	var iScroll = $(this).scrollTop();
	if(iScroll>=iOffsetTop){
		$(".xiding").css({display:"block"});
		$(".xiding .xiding_left").mouseover(function(){
			$("#nav").css({position:"fixed",top:60});
		});
		$(".xiding .xiding_left").mouseout(function(){
			$("#nav").mouseover(function(){
				$("#nav").css({position:"fixed",top:60});
			})
			$("#nav").mouseout(function(){
				$("#nav").css({position:"absolute",top:0});
			})
		})
	} else if(iScroll<iOffsetTop){
		$(".xiding").css({display:"none"});
		$("#nav").css({position:"absolute",top:0});
	}
})



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
function test1(data){
	var tipList=document.getElementsByClassName("tipList")[1];
	tipList.innerHTML="";
	var arr=data.s;
	for(var i in arr){
		var oLi=document.createElement("li");
		oLi.innerHTML = arr[i];
		tipList.appendChild(oLi);
	}
}

baiduSearch("search_box",0,"test");
baiduSearch("search_box",1,"test1");


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
	

//搜索框下的热词动态加载
$.get("../data/index/hotwords.json",function(data){
	// console.log(data);
	for(var i in data){
		$(".hotwords ul").append('<li>'+
									'<a>'+data[i].hotword+'</a>'+
								'</li>');
	}
})


//二级导航加载

function daohang(url){
	$.ajax({
		type:"get",
		url:url,
		success: function(data){
			//设置一个正则用以匹配
			var reg = /^color/i;
			//外层循环
			for(var key in data){
				if(key === "title"){
					//当key值是title的时候创建大标题h1，并且添加在页面中
					var oH1 = $('<h3>'+data[key].h1+'</h3>');
					$(".big_box").append(oH1);
				}else{
					//当key值不是title的时候创建副标题h2，并且添加在页面中
					var oH2 = $('<h2>'+key+'</h2>');
					$(".big_box").append(oH2);
					var oDetail = $('<div class="detail"></div>');
					var oA = null;
					//里层循环
					for(var obj in data[key]){
						//遍历除了title意外的其他对象，例如：当季热卖、秋季新品里面的产品（a1、a2等）
						//console.log(data[key]);
						if(reg.test(data[key][obj])){
							//用正则来判断value值中是否含有color,如果有就进行处理
							var arr = data[key][obj].split("#");
							var newData = arr[1];
							//console.log(newData);
							oA = $('<a href="" class="has-color">'+newData+'</a>');
							oDetail.append(oA);
						}else{
							oA = $('<a href="">'+data[key][obj]+'</a>');
							oDetail.append(oA);
						}
					}
					$(".big_box").append(oDetail);	
				}	
			}
		}
	});
};

$(".sec_nav").hover(
function(){
	$(".big_box").show().html("");
	var i = $(this).parent().index();
	$(this).parent().css({background:"#000"}).siblings().css({background:"#444247"});
	var date = new Date();
	var url = "../data/index/daohang"+i+".json?t=date";
	daohang(url);
},
function(){
	setTimeout(function(){
		$(".big_box").mouseover(function(){
			$(".big_box").show();
		});
		$(".big_box").mouseout(function(){
			$(".big_box").hide();
		});
	},50)
	$(this).parent().css({background:"#444247"}).siblings().css({background:"#444247"});
	$(".big_box").hide();
})



//分页加载
fenye("../data/index/list0.json");
$(".waterfall").html("");
$(".list ul li").eq(0).css({background:"#999",color:"#fff"});
$(".list ul li").click(function(){
	$(this).css({background:"#999",color:"#fff"}).siblings().css({background:"#fff",color:"#000"});
	$(".waterfall").html("");
	var i = $(this).index();
	var aName = "../data/index/list"+i+".json";
	fenye(aName);
})

function fenye(url){
	$.get(url,function(data){
		for(var key in data){
			$(".waterfall").append('<div class="good">'+
									'<a class="good_pic">'+
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



// main_min 鼠标移入移除效果
$(".min_left a").mouseover(function(){
	$(this).find(".min").stop().animate({top:4},100);
	$(this).stop().animate({opacity:1},200);
	$(".min_left a").mouseout(function(){
		$(this).find(".min").stop().animate({top:14},100);
		$(this).stop().animate({opacity:0.9},200);
	})
})


//友情链接
$.get("../data/index/youqinglianjie.json",function(data){
	// console.log(data);
	for(var i in data){
		$(".subfooter").append('<a>'+data[i].hotword+'</a>');
	}
})


if($.cookie("userName")!=""||$.cookie("pwd")!=""){
	// console.log($(".subnav_right li"))
	var a = $.cookie("userName").split("\"")[1];
	$(".subnav_right li").eq(0).html("欢迎").css({marginLeft:-120});;
	$(".subnav_right li").eq(1).html(a).css({marginLeft:-80});
} 