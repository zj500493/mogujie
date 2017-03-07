function loadHtml(url, targetId) {
	$.ajax({
		url: url,
		async: false,
		success: function(data) {
			$("#"+targetId).html(data);
		}
	})
}

//获取样式值
function getStyle(obj, name){
	if(window.getComputedStyle){
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name];
	}
}

//js获取class
function getByClass(oParent, sClassName){
	var aResult = [];
	var aElement = oParent.getElementsByTagName("*");
		for(var i in aElement){
			if(aElement[i].className == sClassName){
				aResult.push(aElement[i]);
		}
	}
	return aResult;
}



function startMove(obj, json, fn){
	clearInterval(obj.timer);
	var bStop = true;
	obj.timer = setInterval(function(){
		for(var attr in json){
			var iCur = 0;
			if(attr == "opacity"){
				iCur =  parseInt(parseFloat(getStyle(obj, attr))*100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}
			var iSpeed = (json[attr]-iCur)/8;
			iSpeed = iSpeed>0? Math.ceil(iSpeed): Math.floor(iSpeed);
			if(json[attr] != iCur){
				bStop = false;
			}
			if(attr == "opacity"){
				obj.style.filter = "alpha(opacity:"+(iCur+iSpeed)+")";
				obj.style.opacity = (iCur+iSpeed)/100;
			} else {
				obj.style[attr] = iCur + iSpeed + "px";
			}
			if(bStop){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
		}
	},100)
}


//淡入淡出轮播
function fadelunbo(oContainer,iSetInterval){
	var aDiv = oContainer.getElementsByTagName("div")[0].getElementsByTagName("div");
	var oUl = oContainer.getElementsByTagName("ul")[0];
	var aLi = oUl.getElementsByTagName("li");
	var iNow = 0;
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		aLi[i].onmouseover = function () {
			iNow = this.index;
			tab();
		}
	}
	autoPlay();
	oContainer.onmouseover = function() {
		clearInterval(oContainer.timer);
	}
	oContainer.onmouseout = function() {
		autoPlay();
	}

	function autoPlay (){
		clearInterval(oContainer.timer);
		oContainer.timer = setInterval(function(){
			iNow++;
			if(iNow == aLi.length){
				iNow=0;
			}
			tab();
		},iSetInterval);
	}
	function tab(){
		for(var i=0;i<aLi.length;i++){
			aLi[i].className = "";
			startMove(aDiv[i],{opacity:0})
		}
		aLi[iNow].className = "active";
		startMove(aDiv[iNow],{opacity:100});
	}
}





