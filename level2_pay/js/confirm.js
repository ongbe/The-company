window.onload=function(){
	confirm.tools.login();
	confirm.ui.init();
	confirm.ui.toSearch();
	confirm.ui.showLayer();
	confirm.ui.getProductType();//获取产品类
	confirm.ui.getPackageType();//获取套餐类
}

var confirm ={};
confirm.tools={};
confirm.tools.stopBubble =function(e){
	e=e||window.event;
	if(e.stopPropagation){
		e.stopPropagation();//W3C阻止冒泡方法 
	}
	else{
		e.cancelBubble =true;//IE阻止冒泡方法
	}
}

confirm.tools.showmsg=function(txt,t){//显示提示信息的函数，txt是内容，t是显示时间
	$("body").append("<div class='showmsg'>" + txt + "</div>");//在body后面插入showmsg的div
	$(".showmsg").fadeIn().delay(t*1000).fadeOut(200,function(){
		$(".showmsg").remove();//用完之后删掉此div
	});
}

confirm.tools.login=function(){
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
						}).register('login_success',function(){
							loginLayer.getWeiboInfo({
		                        timeout : 5* 1000,
		                        onSuccess : function(d){
		                           document.getElementById("txtUserName").innerHTML=d.data.name;
		                        }
		                    });
						}).register('logout_success',function(){
							document.getElementById("txtUserName").innerHTML='';
							confirm.tools.showmsg('对不起，请先<a href="www.baidu.com">登录</a>',2);
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

confirm.ui={};/*定义命名空间*/
var product ='hk_hq';
confirm.ui.choosePackage=function(){
	$('input[name="markets"]').click(function(){
		$('input[name="markets"]').parent().removeClass();
	});
	$('input[name="markets"].radio_hk').click(function(){
		$(this).parent().addClass("hk_checked");
		$("div.choose_duration_hk").css("display","block");
		$("div.choose_duration_hq").css("display","none");
		$("div.choose_duration_hqb").css("display","none");
		$('input[name="durations"]:checked').parent().addClass('checked');
		product="hk_hq";//点击港股，改变下面的获取接口url；
		$("#lists_hk").html('');
		confirm.ui.getPackageType();//重新调用接口，获取数据；
	});
	/*$('input[name="markets"].radio_hq').click(function(){
		$(this).parent().addClass("hq_checked");
		$("div.choose_duration_hk").css("display","none");
		$("div.choose_duration_hq").css("display","block");
		$("div.choose_duration_hqb").css("display","none");
		$('input[name="durations"]:checked').parent().addClass('checked');
		product="";//点击a股行情，改变下面的获取接口url；
		confirm.ui.getPackageType();
	});*/
	$('input[name="markets"].radio_hqb').click(function(){
		$(this).parent().addClass("hqb_checked");
		$("div.choose_duration_hk").css("display","none");
		$("div.choose_duration_hq").css("display","none");
		$("div.choose_duration_hqb").css("display","block");
		$('input[name="durations"]:checked').parent().addClass('checked');
		product="hq";//点击行情包，改变下面的获取接口url；
		$("#lists_hqb").html('');
		confirm.ui.getPackageType();
	});
}

confirm.ui.init=function(){
	var URL =window.location.href;
	var linkid=URL.split('=')[1];
	if(linkid == 'hqb'){//如果从‘我的账户页面’，点击‘订阅行情包’，应该是下面的情况
		$("div.hk_stocks").removeClass('hk_checked');
		$("input.radio_hk").removeAttr('checked');
		//$("div.hq_stocks").removeClass('hq_checked');
		//$("div.radio_hq").attr('checked','');
		$("div.hqb_stocks").addClass('hqb_checked');
		$("input.radio_hqb").attr('checked','checked');
		$("div.choose_duration_hk").css("display","none");
		$("div.choose_duration_hq").css("display","none");
		$("div.choose_duration_hqb").css("display","block");
		product="hq";
		confirm.ui.getPackageType();
	}
	/*if(linkid == 'hq'){

	}*/
}

confirm.ui.toSearch=function(){
	var lists=$(".options li");
	$("#choose_item").click(function(e){//点击h2，ul显示，点击其他地方，ul隐藏；
		$(".options").css("display","block");
		confirm.tools.stopBubble(e);//阻止冒泡;
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
var orderId ='';
confirm.ui.submitOrder = function(){
		var w =window.open();
		var product_code = $('input[name="markets"]:checked').parent().attr("value");//获取被选择的产品类的标志；
		var price_type='';
		if(product =="hq"){
			price_type = $("#lists_hqb div.checked").attr("value");
		}
		if(product =="hk_hq"){
			price_type = $("#lists_hk div.checked").attr("value");
		}
		$.ajax({
			dataType: "jsonp",
		    url: "http://current.finance.sina.com.cn/pay/api/openapi.php/Order_Service.createOrder?product="+product_code+"&price_type="+price_type,
		    data: $.extend({
		        id: '12345',
		        _ : Math.floor(Date.parse(new Date())/100000)
		    }, {
		        'dpc': 1
		    }),
		    cache: false,
		    success: function(d) {
		    	orderId = d.result.data.order_id;
		    	if(d.result.status == '200000'){
		    		w.location='http://current.finance.sina.com.cn/pay/view/pay.php?order_id='+orderId;
			        //window.open('http://current.finance.sina.com.cn/pay/view/pay.php?order_id='+orderId);//打开付款页面
			        $("#box").css("display","block");//显示摸态弹出窗口；
					$("#hidden_layer").fadeIn("slow");
		    	}
		    	else if(d.result.status = '300002'){
		    		confirm.tools.showmsg("产品不存在!",2);
		    	}
		    	else{
		    		confirm.tools.showmsg("订单创建失败!",2);
		    	}
		    }
		});
}

confirm.ui.showLayer=function(){
	/*确认购买信息页面的弹出框事件*/
	$("input.box_btn").click(function(){//点击'完成付款'的按钮
		$.ajax({
			url: "http://current.finance.sina.com.cn/pay/api/openapi.php/Order_Service.getOrderDetail?order_id="+orderId,    
			data: $.extend({
				id: '12345',
				_ : Math.floor(Date.parse(new Date())/100000)
			}, {
				'dpc': 1
			}),
			cache: false,                                    
			dataType: "jsonp",
			success: function(d) {
				var status =d.result.data.pay_status;
		        if(status == '1'){
					$("#steps_info .one_logo").addClass('one_success_logo');
					$("#steps_info .two_logo").addClass('two_success_logo');
					$("#steps_info .thr_logo").addClass('thr_success_logo');
					$("#steps_info .step_one img").css("display","none");
					$("#steps_info .step_thr img").css("display","inline-block");
					$("#pay_content").css("display","none");
					$("#ads_content").css("display","none");
					$("div.line_whole").css("display","none");
					$("#order_content").css("display","block");
					$("#txtOrderNum").html(d.result.data.order_id);//获取订单号详情；
					$("#txtProductPrice").html(parseFloat($("#txtTotalPrice").text())+'元');//获取总价格
					$("#txtTotalDate").html($('input[name="durations"]:checked').next().html());//获取总时间
					$("#startDate").html(d.result.data.start_time.substr(0,10));//获取起始日期
					$("#endDate").html(d.result.data.end_time.substr(0,10));//获取结束日期
				}
				else{
					confirm.tools.showmsg("对不起，付款未完成",1);
					function changeUrl(){
						window.location.href="my_account.html?link=ls";
					}
					setTimeout(changeUrl, 1500);
				}
				$("#box").css("display","none");
				$("#hidden_layer").fadeOut("slow");
			}
		});
					
	});
	$(".box_bottom a").click(function(){
		$("#box").css("display","none");
		$("#hidden_layer").fadeOut("slow");
	});
	$(".link_more a").click(function(){
		var w= window.open();
		var order_Id = $("#txtOrderNum").html();
		w.location='order_details.html?orderid='+ order_Id;
		//window.open('order_details.html?orderid='+ order_Id);
	});
}

confirm.ui.getProductType=function(){
	var price_type='';
	$.ajax({//获取产品类表
        url: "http://current.finance.sina.com.cn/pay/api/openapi.php/Product_Service.getProductTree?product=hk_hq",    
        data: $.extend({
            id: '12345',
            _ : Math.floor(Date.parse(new Date())/100000)
        }, {
            'dpc': 1
        }),
        cache: false,                                    
        dataType: "jsonp",
        success: function(d) {
        	var product_html ='';
        	if(d.result.data == null){
        		confirm.tools.showmsg("获取产品失败！",2);
        	}
        	else{//data不为空，至少有港股信息
        		product_html ='<div class="hk_stocks hk_checked" value=""><input class="radio_hk" type="radio" name="markets" checked="checked"><span></span></div>';
        		if(d.result.data.father_product != null){//如果存在父产品,则肯定存在行情包
        			product_html = product_html + '<div class="hqb_stocks" value=""><input class="radio_hqb" type="radio" name="markets"><span></span></div>';
        			if(d.result.data.father_product.father_product !=null){}
        		}
        	}
        	$('form.market_lists').append(product_html);
	        $('input[name="markets"].radio_hk').next().html(d.result.data.name_cn);
	        $('input[name="markets"].radio_hk').parent().attr("value",d.result.data.product);
	        $('input[name="markets"].radio_hqb').next().html(d.result.data.father_product.desc);
	        $('input[name="markets"].radio_hqb').parent().attr("value",d.result.data.father_product.product);
	        confirm.ui.choosePackage();
        }
    });
}

confirm.ui.getPackageType=function(){
	var package_date='',package_price='';
	var price_html='';
	var dateunit='';
	$.ajax({//获取产品套餐类型
        url: "http://current.finance.sina.com.cn/pay/api/openapi.php/Product_Service.getProductDetail?product="+product,    
        data: $.extend({
            id: '12345',
            _ : Math.floor(Date.parse(new Date())/100000)
        }, {
            'dpc': 1
        }),
        cache: false,                                    
        dataType: "jsonp",
        success: function(d){
        	if(d.result.status != '200000'){
        		confirm.tools.showmsg('获取套餐类型失败',2);
        	}
        	else{
        		var listsLen = d.result.data.length;
	        	for(var j=1;j<=listsLen;j++){
	        		if(j==1){
	        			price_html ='<div class="package_'+j+' checked" value=""><input type="radio" name="durations" checked="checked"><span class="date active"></span><span class="price active"></span></div>';
	        		}
	        		else{
	        			price_html ='<div class="package_'+j+' value=""><input type="radio" name="durations"><span class="date"></span><span class="price"></span></div>';
	        		}

	        		package_date = d.result.data[j-1].time;
	        		var len = package_date.length;
	        		if(package_date.substr(len-1,1) == 'w'){dateunit = '周';}
	        		if(package_date.substr(len-1,1) == 'm'){dateunit = '月';}
	        		if(package_date.substr(len-1,1) == 'y'){dateunit = '年';}
	        		if(package_date.substr(len-1,1) == 'd'){dateunit = '天';}
	        		package_date = parseInt(package_date)+ dateunit;
	        		package_price = d.result.data[j-1].price + "元";
	        		if(product == 'hk_hq'){
	               		$("#lists_hk").append(price_html);
		        		$("#lists_hk .package_"+j+" span.date").html(package_date);
		        		$("#lists_hk .package_"+j+" span.price").html(package_price);
		        		$("#txtTotalPrice").html(parseFloat($("#lists_hk .package_1 span.price").text()));
		        		$("#lists_hk .package_"+j).attr("value",d.result.data[j-1].price_type);
	        		}
	        		if(product == 'hq'){
		               	$("#lists_hqb").append(price_html);
		               	$("#lists_hqb .package_"+j+" span.date").html(package_date);
		        		$("#lists_hqb .package_"+j+" span.price").html(package_price);
		        		$("#txtTotalPrice").html(parseFloat($("#lists_hk .package_1 span.price").text()));
		        	}
		        }
        	}
        
	        $('input[name="durations"]').click(function(){
				$('input[name="durations"]').parent().removeClass("checked");
				$(this).parent().addClass('checked');
				$("#txtTotalPrice").html(parseFloat($(this).nextAll("span.price").text()));
			});
        }
    });
}