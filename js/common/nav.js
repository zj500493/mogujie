//返回顶部
$(window).scroll(function(){
	var iScrollTop = $(this).scrollTop();
	if(iScrollTop>0){
		$(".totop").css({display:"block"});
		$(".totop").mouseover(function(){
			$(".totop").css({background:"#ef2f23"});
		})
		$(".totop").mouseout(function(){
			$(".totop").css({background:"#202020"});
		})
		$(".totop").click(function(){
			$("html body").scrollTop(0);
		})
	} else {
		$(".totop").css({display:"none"});
	}
})
