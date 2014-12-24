window.onload=function(){
	app.ui.setHeight();
	//app.ui.ontime_flipUp();
	app.ui.imgHoverClick();
}
var app={};
app.tools={};

app.ui={};
app.ui.setHeight=function(){
	$('#index_page').css('height', $(window).height());
}
app.ui.ontime_flipUp=function(){
	var i=$(".count_down").text();
	var timer = setInterval(function(){
		i--;
		if(i>=0){
			$(".count_down").html(i);
		}
		else{
			$("#index_page").slideUp("slow");
			$("#main_page").css("display","block");
			clearInterval(timer);
		}
	},1000);
}
app.ui.imgHoverClick=function(){
	for(var i=1;i<=7;i++){
		(function(i){
			$(".default_pic0"+i).mouseover(function(){
				$(".default_pic0"+i).addClass('hover_status');
			});
			$(".default_pic0"+i).mouseout(function(){
				$(".default_pic0"+i).removeClass('hover_status');
			});
		})(i);
	}
}
