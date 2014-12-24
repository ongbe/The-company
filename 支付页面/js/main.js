window.onload=function(){
	app.ui.login();
	app.ui.toSearch();
	app.ui.showLayer();
	app.ui.changeToHistory();
	app.ui.getApiData();
}

var app ={};
app.tools={};
app.tools.stopBubble =function(e){
	e=e||window.event;
	if(e.stopPropagation){
		e.stopPropagation();//W3C阻止冒泡方法 
	}
	else{
		e.cancelBubble =true;//IE阻止冒泡方法
	}
}


app.ui={};/*定义命名空间*/
app.ui.login=function(){
	 var userPanel = window.SINA_USER_PANEL;
	 var $ = userPanel.STK;
	 if(userPanel){
		 $.Ready(function(){ 
			 userPanel.set('outloginLayer', {//配置登录浮层相关内容
				 ready : function(){//登录浮层渲染成功后执行的方法，必选
				 	var loginLayer = window.SINA_OUTLOGIN_LAYER;//获取登录浮层
				 	if(loginLayer){
				  
				 	//配置登录选项，并初始化登录浮层
				 	//登录浮层具体参数说明请参考登录浮层文档
				 		loginLayer.set('extra',{
				 			css: 'http://i.sso.sina.com.cn/css/outlogin/v1/outlogin_skin_finance.css'
				 		}).set('sso', {
				 			entry : 'account'
				 		}).set('styles', {
							 'marginTop': '0px',
							 'marginLeft': '-208px'
						}).init();
					}
				 }
			 }).set('container',{//设置登录顶托的父节点，不设置则为body
				 node: $.E("userLogin")
			 }).register('plugin_ready',function(){ 
				 //注册登录顶托初始化完成后触发事件，可选
			 }).init();// 初始化登录顶托，必选
		 });
	 }
}

app.ui.toSearch=function(){
	var lists=$(".options li");
	$("#choose_item").click(function(e){//点击h2，ul显示，点击其他地方，ul隐藏；
		$(".options").css("display","block");
		app.tools.stopBubble(e);//阻止冒泡;
	});
	$("body").click(function(){
		$(".options").css("display","none");
	});
	for(var i=0;i<lists.length;i++){
		(function(i){
            lists[i].onclick=function(){
                $("#choose_item_txt").html(this.innerHTML);
            }
         })(i);
	}
}

app.ui.showLayer=function(){
	/*确认购买信息页面的弹出框事件*/
	$(".btn_submit").click(function(){
		$("#box").css("display","block");
		$("#hidden_layer").fadeIn("slow");
		
        alert($('input:radio[name="durations"]:checked').val());
	});
	$(".box_btn").click(function(){
		$("#box").css("display","none");
		$("#hidden_layer").fadeOut("slow");
		location.href="file:///C:/Users/xikun/Desktop/%E6%94%AF%E4%BB%98%E9%A1%B5%E9%9D%A2/index3.html";
	});
	$(".box_bottom a").click(function(){
		$("#box").css("display","none");
		$("#hidden_layer").fadeOut("slow");
	});
	/*历史订单页面的弹出框点击事件*/
	$(".cancel_link").click(function(){
		$("#confirmCancel_box").css("display","block");
		$("#confirmCancel_layer").fadeIn("slow");
	});
	$(".box_btn_close").click(function(){
		$("#confirmCancel_box").css("display","none");
		$("#confirmCancel_layer").fadeOut("slow");
	});
	$(".window_btn_confirm").click(function(){
		$("#confirmCancel_box").css("display","none");
		$("#confirmCancel_layer").fadeOut("slow");
	});
	$(".window_btn_cancel").click(function(){
		$("#confirmCancel_box").css("display","none");
		$("#confirmCancel_layer").fadeOut("slow");
	});
}

app.ui.changeToHistory=function(){
	$("h2.my_market").click(function(){
		$("h2.my_market").addClass("linked");
		$("h2.order_history").removeClass("linked");
		$(".HK_stocks_empty").css("display","block");
	});
	$("h2.order_history").click(function(){
		$("h2.order_history").addClass("linked");
		$("h2.my_market").removeClass("linked");
		$(".HK_stocks_area").css("display","none");
		$(".HK_stocks_empty").css("display","none");
	});
}

app.ui.getApiData=function(){
	var product ='';
	var price_type='';
	$.ajax({//获取
        url: "http://current.finance.sina.com.cn/pay/api/openapi.php/Order_Service.createOrder?product=hq&price_type=1#",    
        data: $.extend({
            id: '12345',
            _ : Math.floor(Date.parse(new Date())/100000)
        }, {
            'dpc': 1
        }),
        cache: false,                                    
        dataType: "jsonp",
        
        success: function(data) {
            alert(data.result.data.order_id);
        }
    });
}
