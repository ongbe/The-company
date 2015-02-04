window.onload=function(){
	account.tools.login();
	account.ui.toSearch();
	account.ui.getOrderList();
	account.ui.getMyMarketList();
	account.ui.changeToHistory();
	account.ui.init();
}

var account ={};

account.tools={};
account.tools.stopBubble =function(e){
	e=e||window.event;
	if(e.stopPropagation){
		e.stopPropagation();//W3C阻止冒泡方法 
	}
	else{
		e.cancelBubble =true;//IE阻止冒泡方法
	}
}

account.tools.showmsg=function(txt,t){//显示提示信息的函数，txt是内容，t是显示时间
	$("body").append("<div class='showmsg'>" + txt + "</div>");//在body后面插入showmsg的div
	$(".showmsg").fadeIn().delay(t*1000).fadeOut(200,function(){
		$(".showmsg").remove();//用完之后删掉此div
	});
}

account.tools.getDays=function(strDateStart,strDateEnd){
    var oDate1,oDate2,iDays;
    oDate1= strDateStart.split('-');
    oDate2= strDateEnd.split('-');
    var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
    var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
    iDays = parseInt((strDateE.getTime() - strDateS.getTime()) / 1000 / 60 / 60 /24);//把相差的毫秒数转换为天数 
    return iDays ;
}

account.tools.getNewDate=function(dateTemp, days) {  
    var dateTemp = dateTemp.split("-");  
    var nDate = new Date(dateTemp[0] + '-' + dateTemp[1] + '-' + dateTemp[2]); //转换为YYYY-MM-DD格式    
    var millSeconds = nDate.getTime() + (days * 24 * 60 * 60 * 1000);//获取相加之后的毫秒数 
   /* var rDate = new Date(millSeconds);//转换为日期格式
    var year = rDate.getFullYear();  
    var month = rDate.getMonth() + 1; 
    var date = rDate.getDate();   
    month = month >= 10 ? month : '0'+month;
    date = date >= 10 ? date : '0'+date;
    return (year + "-" + month + "-" + date); */ 
    return millSeconds;
}

account.tools.getByclass = function(classname)
{
    var classLists = document.getElementsByTagName('*');
    var arr = [];
    for( var i = 0;i<classLists.length;i++)
    {
        if(classLists[i].className == classname)
        {
            arr.push(classLists[i]);
        }
    }
    return arr;
}

account.tools.login=function(){
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
						}).register('login_success',function(){//登陆成功
							loginLayer.getWeiboInfo({
		                        timeout : 5* 1000,
		                        onSuccess : function(d){
		                        	/*var table = account.tools.getByclass('Hk_table_content')[0];
		                        	table.getElementsByTagName('tbody')[0].innerHTML = '';
		                          	account.ui.getMyMarketList();
		                          	account.ui.getOrderList();*/
		                        }
		                    });
						}).register('logout_success',function(){//退出登录
							window.location.href='my_account.html';
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

			
account.ui={};
account.ui.init=function(){
	var URL =window.location.href;
	var linkid=URL.split('=')[1];
	if(linkid == 'ls'){
		$("h2.order_history").addClass("linked");
		$("h2.my_market").removeClass("linked");
		$(".my_market_area").css("display","none");
		$(".order_history_area").css("display","block");
		account.ui.bindLinkEvent();//绑定“付款”，“订单详情”按钮的事件；
	}
}

account.ui.toSearch=function(){
	var lists=$(".options li");
	$("#choose_item").click(function(e){//点击h2，ul显示，点击其他地方，ul隐藏；
		$(".options").css("display","block");
		account.tools.stopBubble(e);//阻止冒泡;
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

var orderTotalNum=0;//订单总条数
account.ui.getunpaidNum =function(){
	$.ajax({//获取未付款的个数
		        url: "http://current.finance.sina.com.cn/pay/api/openapi.php/Order_Service.getOrderList?page_num="+orderTotalNum+"&status=0",    
		        data: $.extend({
		            id: '12345',
		            _ : Math.floor(Date.parse(new Date())/100000)
		        }, {
		            'dpc': 1
		        }),
		        cache: false,                                    
		        dataType: "jsonp",
		        success: function(data) {
		        	var orders_num =0;//未付款的订单条数
		        	if(data.result.data.data == null){
		        		$(".orders_num").html(orders_num);
		        	}
		        	else{
		        		var data_len=data.result.data.data.length;
			        	if(data_len<=99){
			        		orders_num = data.result.data.data.length;
			        	}
			        	if(data_len >99){
			        		orders_num ='99+';
			        	}
	        			$(".orders_num").html(orders_num);
			        }
		}
	});      
}
account.ui.getOrderList=function(){
	$.ajax({//获取历史订单列表
        url: "http://current.finance.sina.com.cn/pay/api/openapi.php/Order_Service.getOrderList?order_by=create_time&order=desc",    
        data: $.extend({
            id: '12345',
            _ : Math.floor(Date.parse(new Date())/100000)
        }, {
            'dpc': 1
        }),
        cache: false,                                    
        dataType: "jsonp",
        success: function(d) {
        	orderTotalNum = parseInt(d.result.data.count);//订单总条数
        	if(orderTotalNum <= 10){
        		$("#pages_area").css("display","none");
        	}
        	var COUNT = 10;//每页显示的个数;
			var totalpages = Math.ceil(orderTotalNum/COUNT);//一共有多少页
			$(".total_page_count").html(totalpages);//把页数写进页面span
			$(".current_page").html('1');
			if(totalpages > 1){
				$('a.page_prev').css("display","block");
				$('a.page_next').css("display","block");
				$('a.page_2').css("display","block");
				if(totalpages > 2){
					$('a.page_3').css("display","block");
					if(totalpages > 3){
						$('a.page_4').css("display","block");
						if(totalpages > 4){
							$('a.page_5').css("display","block");
						}
					}
				}
			}
			$("#pages_area .page").each(function(i){
				var num=i+1;
				$("#pages_area .page_"+num).click(function(){
					account.ui.getListsAgain(num);
    				$(".current_page").html(num);
    				$("#pages_area .page").removeClass("active");
    				$(this).addClass("active");
				});
			});

			account.ui.getunpaidNum();//获取未付款的个数
        	//历史记录数据
        	var txt_ls_id='';
        	var txt_ls_type='';
        	var txt_ls_createtime='';
        	var txt_ls_price='';
        	var txt_ls_validtime='';
        	var txt_ls_status='';
        	var txt_ls_operate='';

        	var product_code='';
        	var ls_html='';
        	if(d.result.data.data == null){
        		$("#pages_area").css("display","none");
        	}
        	else{/*接口数据不为空，分别判断两种情况*/
        		var dataLength = d.result.data.data.length;
        		for(var i=0;i< dataLength;i++){
	        		product_code = d.result.data.data[i].product;
	        		if(product_code=="hk_hq"){//如果是港股订单信息
	        			txt_ls_type ='港股Level2行情';
        			}
        			if(product_code=="hq"){//如果是行情包订单信息
        				txt_ls_type='港股Level2+A股Level2';
        			}
        			/*显示历史订单部分，不用判断类型，直接循环全部显示*/
        			txt_ls_id=d.result.data.data[i].order_id;
        			txt_ls_createtime=d.result.data.data[i].create_time;
	        		txt_ls_price=d.result.data.data[i].price;
	        		txt_ls_status= d.result.data.data[i].status;
	        		var start_Date =d.result.data.data[i].start_time.substr(0,10).split('-');
	        		var end_Date =d.result.data.data[i].end_time.substr(0,10).split('-');
	        		var month1 =(end_Date[0] - start_Date[0])*12;
	        		var month2 =end_Date[1] - start_Date[1];
	        		var days = end_Date[2] - start_Date[2];
	        		var month_flag = parseInt(start_Date[1]);
	        		var year_flag =parseInt(start_Date[0]);
	        		var day_count =0;
	        		switch(month_flag){
	        			case 1: case 3: case 5: case 7: case 8: case 10: case 12:
	        				day_count =31;break;
	        			case 4: case 6: case 9: case 11:
	        				day_count =30;break;
	        			case 2:
	        				if((year_flag%4==0 && year_flag%100!=0) || year_flag %400==0){
			        			day_count=29;break;
			        		}
			        		else{
				        		day_count=28;break;
	        				}
	        		}
	        		if((month1+month2)<=0){//月份为0
	        			txt_ls_validtime =days +'天';
	        			if(days==0){
	        				txt_ls_validtime ='--';
	        			}
	        		}
	        		else{//月份不为0
	        			if(days>0){
		        			txt_ls_validtime =(month1+month2)+'个月'+days+'天';
		        		}
		        		if(days <0){
		        			if(month1+month2-1>0){
		        				txt_ls_validtime =(month1+month2-1)+'个月'+(day_count+days)+'天';
		        			}
		        			else{
		        				txt_ls_validtime = (day_count+days)+'天';
		        			}
		        		}
		        		if(days==0){
		        			txt_ls_validtime = (month1+month2)+'个月';
		        		}
	        		}
	        		
	        		var txt_order_detail='<a class="details_link" href="javascript:;">订单详情</a>';
	        		if(txt_ls_status=='0'){//未付款
	        			txt_ls_status = '<span class="order_status unpaid">未付款</span>'+txt_order_detail;
	        			txt_ls_operate='<a title="付款" class="pay_link" href="javascript:;">付款</a><span title="取消订单" class="cancel_link"></span>';
	        		}
	        		if(txt_ls_status=='1'){//已付款
	        			txt_ls_status = '<span class="order_status paid">成功付款</span>'+txt_order_detail;
	        			txt_ls_operate='--';
	        		}
	        		if(txt_ls_status=='2'){//已取消
	        			txt_ls_status = '<span class="order_status">已取消</span>'+txt_order_detail;
	        			txt_ls_operate='--';
	        		}
	        		if(txt_ls_status=='3'){//已退款
	        			txt_ls_status = '<span class="order_status">已退款</span>'+txt_order_detail;
	        			txt_ls_operate='--';
	        		}
	        		if(txt_ls_status=='4'){//已到期
	        			txt_ls_status = '<span class="order_status">已过期</span>'+txt_order_detail;
	        			txt_ls_operate='--';
	        		}
        			ls_html ='<tr><td class="width230 ls_orderid">'+txt_ls_id+'</td><td class="width180">'+txt_ls_type+'</td><td class="width150">'+txt_ls_createtime+'</td><td class="width110">'+txt_ls_price+'</td><td class="width70 valid_time">'+txt_ls_validtime+'</td><td class="width110 trade_status">'+txt_ls_status+'</td><td class="width150 order_operate">'+txt_ls_operate+'</td></tr';
        			$(".OH_table_content tbody").append(ls_html);
        			$('.OH_table_content tbody tr:odd').css('backgroundColor','#f7f7f7');
        		}	
        	}	
        }
    });
}

account.ui.getMyMarketList=function(){
	$.ajax({//获取付款成功的列表
		url: "http://current.finance.sina.com.cn/pay/api/openapi.php/Order_Service.getOrderList?order_by=create_time&order=desc&page_num=200",    
		data: $.extend({
			id: '12345',
			_ : Math.floor(Date.parse(new Date())/100000)
		}, {
		    'dpc': 1
		}),
		cache: false,                                    
		dataType: "jsonp",
		success: function(d) {
			//港股数据
        	var txt_hk_id='';
        	var txt_hk_time='';
        	var txt_hk_price='';
        	var txt_hk_status='';
        	//行情包数据
        	var txt_hqb_id='';
        	var txt_hqb_time='';
        	var txt_hqb_price='';
        	var txt_hqb_status='';

        	var product_code='';
        	var my_html='';
        	var m=n=0;

        	String.prototype.replaceAll=function (AFindText,ARepText){  //给string类扩展全部替换的方法；
 				raRegExp=new RegExp(AFindText,"g");
 				return this.replace(raRegExp,ARepText);  
			}
        	if(d.result.data.data == null){/*接口数据为空，则显示两个空表格*/
        		$(".HK_stocks_empty").css("display","block");
        		//$(".MKpackage_table_empty").css("display","block");
        		$(".HK_stocks_area").css("display","none");
        		$(".market_package_area").css("display","none");
        	}
        	else{
        		var arrDay_HK =[];
        		var arrDay_Market=[];

        		var dataLength = d.result.data.data.length;
        		for(var i=0;i<dataLength;i++){
					var now_Date = new Date();//现在的时间
					var year = now_Date.getFullYear();  
				    var month = now_Date.getMonth() + 1; 
				    var date = now_Date.getDate();   
				    month = month >= 10 ? month : '0'+month;
				    date = date >= 10 ? date : '0'+ date;
				    var nowDate = year + "-" + month + "-" + date;
					var endDate = d.result.data.data[i].end_time.substr(0,10);//订单结束时间
					var date_differ =account.tools.getDays(nowDate,endDate);//获得订单结束时间和当前的时间差
        			product_code = d.result.data.data[i].product;
        			var data_status = d.result.data.data[i].status;

        			if(product_code=="hk_hq"){//如果是港股订单信息
	        			if(data_status == '1'){
	        				m++;//定义变量m，记录有几条港股订单
	        				txt_hk_status='<span class="valid"></span>有效';
	        				var endtime =d.result.data.data[i].end_time.substr(0,10);
	        				arrDay_HK.push(account.tools.getDays(nowDate,endtime));
	        				//计算每一项的结束时间和当前时间相差的天数，然后存到数组，最后取最大值；
	        				txt_hk_id = d.result.data.data[i].order_id;
	        				txt_hk_time = d.result.data.data[i].start_time.substr(0,10)+' 到 '+d.result.data.data[i].end_time.substr(0,10);
	        				txt_hk_price = d.result.data.data[i].price;
	        				my_html ='<tr><td class="width230">'+ txt_hk_id+'</td><td class="width410">'+txt_hk_time+'</td><td class="width160">'+ txt_hk_price +'</td><td class="width200">'+txt_hk_status +'</td></tr>';
	        			}
	        			else if(data_status == '4'){
	        				txt_hk_status ='<span class="invalid"></span>无效';
	        				txt_hk_id = d.result.data.data[i].order_id;
	        				txt_hk_time = d.result.data.data[i].start_time.substr(0,10)+' 到 '+d.result.data.data[i].end_time.substr(0,10);
	        				txt_hk_price = d.result.data.data[i].price;
	        				my_html ='<tr><td class="width230">'+ txt_hk_id+'</td><td class="width410">'+txt_hk_time+'</td><td class="width160">'+ txt_hk_price +'</td><td class="width200">'+txt_hk_status +'</td></tr>';
	        				var limit_date = account.tools.getNewDate(endDate,7);//获取结束时间再加上7天的当前日期的毫秒数
	        				var nowdate = new Date().getTime();//获取现在日期的毫秒数
	        				if(nowdate>=limit_date){//结束日期到现在已经超过7天
	        					my_html='';
	        				}
	        			}
	        			else{
	        				my_html='';
	        			}
        				$(".Hk_table_content tbody").append(my_html);//填充港股部分的信息；
        				$('.Hk_table_content tbody tr:odd').css('backgroundColor','#f7f7f7');
			        }

			        if(product_code=="hq"){//如果是行情包订单信息
		        		if(data_status == '1'){
		        			n++;//定义变量n，记录有几条行情包订单；
	        				txt_hk_status='<span class="valid"></span>有效';
	        				var endtime =d.result.data.data[i].end_time.substr(0,10);
	        				arrDay_HK.push(account.tools.getDays(nowDate,endtime));
	        				//计算每一项的结束时间和当前时间相差的天数，然后存到数组，最后取最大值；
	        				txt_hk_id = d.result.data.data[i].order_id;
	        				txt_hk_time = d.result.data.data[i].start_time.substr(0,10)+' 到 '+d.result.data.data[i].end_time.substr(0,10);
	        				txt_hk_price = d.result.data.data[i].price;
	        				my_html ='<tr><td class="width230">'+ txt_hk_id+'</td><td class="width410">'+txt_hk_time+'</td><td class="width160">'+ txt_hk_price +'</td><td class="width200">'+txt_hk_status +'</td></tr>';
	        			}
	        			else if(data_status == '4'){
	        				txt_hk_status ='<span class="invalid"></span>无效';
	        				txt_hk_id = d.result.data.data[i].order_id;
	        				txt_hk_time = d.result.data.data[i].start_time.substr(0,10)+' 到 '+d.result.data.data[i].end_time.substr(0,10);
	        				txt_hk_price = d.result.data.data[i].price;
	        				my_html ='<tr><td class="width230">'+ txt_hk_id+'</td><td class="width410">'+txt_hk_time+'</td><td class="width160">'+ txt_hk_price +'</td><td class="width200">'+txt_hk_status +'</td></tr>';
	        				var limit_date = account.tools.getNewDate(endDate,7);//获取结束时间再加上7天的当前日期的毫秒数
	        				var nowdate = new Date().getTime();//获取现在日期的毫秒数
	        				if(nowdate>=limit_date){//结束日期到现在已经超过7天
	        					my_html='';
	        				}
	        			}
	        			else{
	        				my_html='';
	        			}
        				$(".MKpackage_table_content tbody").append(my_html);
        				$('.MKpackage_table_content tbody tr:odd').css('backgroundColor','#f7f7f7');
		        	}
        		}
        		var max_value_HK =0;//定义港股部分的有效期天数
        		var arrDay_len_HK =arrDay_HK.length;
        		for(var j=0;j<arrDay_len_HK;j++){
	        		if(arrDay_HK[j] >= max_value_HK){
	        			max_value_HK=arrDay_HK[j];
	        		}
	        	}
	        	$(".effect_days span").text(max_value_HK);

	        	var max_value_Market =0;//定义行情包的有效期值；
        		var arrDay_len_Market =arrDay_Market.length;
	        	for(var j=0;j<arrDay_len_Market;j++){
	        		if(arrDay_Market[j] >= max_value_Market){
	        			max_value_Market=arrDay_Market[j];
	        		}
	        	}
	        	$(".MK_effect_days span").text(max_value_Market);
        	}
        	
        	if(m!=0){/*港股订单条数不为0，显示有内容的表格*/
        		$(".HK_stocks_area").css("display","block");
        	}
        	else{
        		$(".HK_stocks_empty").css("display","block");
        	}
        	/*if(n!=0){
        		$(".market_package_area").css("display","block");
        	}
        	else{
        		$(".MKpackage_table_empty").css("display","block");
        	}*/
		}
	});	
}

account.ui.bindLinkEvent=function(){/*历史订单页面绑定付款事件、订单详情事件、以及取消按钮的点击事件*/
	var pay_index;
	var cancel_index;
	$("table.OH_table_content").delegate('.pay_link','click',function(){//绑定付款按钮
		var orderId = $(this).parents("tr").find(".ls_orderid").html();
		var w=window.open();
		w.location='http://current.finance.sina.com.cn/pay/view/pay.php?order_id='+ orderId;
		//window.open('http://current.finance.sina.com.cn/pay/view/pay.php?order_id='+ orderId);
		$("#box").css("display","block");//显示摸态弹出窗口；
		$("#hidden_layer").fadeIn("slow");//显示弹出层;
		$(".ls_orderid").each(function(){
			if($(this).html()==orderId){
				var that =$(this);
				pay_index = that.parent().index();//找到点击的付款按钮对应的index值
			}
		});
		$(".box_btn").click(function(){//完成付款
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
		        		var page_index =parseInt($("span.current_page").text());
		        		account.ui.getListsAgain(page_index);
			        }
			        else{
			        	account.tools.showmsg("对不起，付款未完成",2);
			        }
			        $("#box").css("display","none");
					$("#hidden_layer").fadeOut("slow");
		        }
		    });      	
		});
		$(".box_bottom a").click(function(){//没有完成付款
			$("#box").css("display","none");
			$("#hidden_layer").fadeOut("slow");
			$(this).attr("href","javascript:;");
		});
	});
	$("table.OH_table_content").delegate('.cancel_link','click',function(){//绑定取消按钮
		var orderId = $(this).parents("tr").find(".ls_orderid").html();
		$("#confirmCancel_box").css("display","block");//显示摸态弹出窗口；
		$("#confirmCancel_layer").fadeIn("slow");//显示弹出层;
		$(".ls_orderid").each(function(){
			if($(this).html()==orderId){
				var that =$(this);
				cancel_index = that.parent().index();
			}
		});
		$(".window_btn_confirm").unbind("click");
		$(".window_btn_confirm").click(function(){//确认取消
			$.ajax({
		        url: "http://current.finance.sina.com.cn/pay/api/openapi.php/Order_Service.cancelOrder?order_id="+orderId,    
		        data: $.extend({
		            id: '12345',
		            _ : Math.floor(Date.parse(new Date())/100000)
		        }, {
		            'dpc': 1
		        }),
		        cache: false,                                    
		        dataType: "jsonp",
		        success: function(d) {
		        	var cancel_status=d.result.status;
		        	if(cancel_status=='200000'){
		        		account.tools.showmsg('取消订单成功!',1);
		        		$("#confirmCancel_box").css("display","none");
						$("#confirmCancel_layer").fadeOut("slow");
						$(".ls_orderid").eq(cancel_index).parents("tr").find(".order_status").html("已取消");
						$(".ls_orderid").eq(cancel_index).parents("tr").find(".order_status").removeClass('unpaid');
						$(".ls_orderid").eq(cancel_index).parents("tr").find(".order_status").addClass('paid');
						$(".ls_orderid").eq(cancel_index).parents("tr").find(".order_operate").html("--");
						account.ui.getunpaidNum();//实时刷新未付款的个数
		        	}
		        	else{
		        		$("#confirmCancel_box").css("display","none");
						$("#confirmCancel_layer").fadeOut("slow");
		        		account.tools.showmsg('取消订单失败!',1);
		        	}
				}
		    });
		});
		$(".window_btn_cancel").click(function(){//不取消
			$("#confirmCancel_box").css("display","none");
			$("#confirmCancel_layer").fadeOut("slow");
		});
		$(".box_btn_close").click(function(){//关闭
			$("#confirmCancel_box").css("display","none");
			$("#confirmCancel_layer").fadeOut("slow");
		});
	});
	$("table.OH_table_content").delegate('.details_link','click',function(){//绑定订单详情按钮
		var orderId = $(this).parents("tr").find(".ls_orderid").html();
		var w=window.open();
		w.location='order_details.html?orderid='+ orderId;
		//window.open('order_details.html?orderid='+ orderId);
	});
}

account.ui.changeToHistory=function(){
	$("h2.my_market").click(function(){
		$("h2.my_market").addClass("linked");
		$("h2.order_history").removeClass("linked");
		$(".my_market_area").css("display","block");
		$(".order_history_area").css("display","none");
		window.location.href='my_account.html';
	});
	$("h2.order_history").click(function(){
		$("h2.order_history").addClass("linked");
		$("h2.my_market").removeClass("linked");
		$(".my_market_area").css("display","none");
		$(".order_history_area").css("display","block");
		account.ui.bindLinkEvent();//绑定“付款”，“订单详情”按钮的事件；
		/*var tableTR = $("table.OH_table_content tbody tr");
		if(tableTR.length == 0){
			account.tools.showmsg("还没有订阅内容！",2);
		}*/
	});
}

account.ui.getListsAgain=function(index){//index指的是第几页
	$.ajax({//获取未付款的个数
		url: "http://current.finance.sina.com.cn/pay/api/openapi.php/Order_Service.getOrderList?order_by=create_time&order=desc&page="+index,    
		data: $.extend({
		id: '12345',
		_ : Math.floor(Date.parse(new Date())/100000)
		}, {
			'dpc': 1
		}),
		cache: false,                                    
		dataType: "jsonp",
		success: function(d) {
			var dataLen = d.result.data.data.length;
			var txt_ls_id='',
				txt_ls_createtime='',
				txt_ls_price='',
				txt_ls_validtime='',
				txt_ls_operate='',
				txt_ls_type='',
				ls_html='',
				txt_ls_status='';
			for(var i=0;i<dataLen;i++){
				var product_code = d.result.data.data[i].product;
	        	if(product_code=="hq"){//如果是行情包订单信息
        			txt_ls_type='港股Level2+A股Level2';
        		}
        		if(product_code=="hk_hq"){
        			txt_ls_type='港股Level2行情';
        		}
				txt_ls_id=d.result.data.data[i].order_id;
        		txt_ls_createtime=d.result.data.data[i].create_time;
	        	txt_ls_price=d.result.data.data[i].price;
	        	txt_ls_status= d.result.data.data[i].status;
	        	var start_Date =d.result.data.data[i].start_time.substr(0,10).split('-');
	        	var end_Date =d.result.data.data[i].end_time.substr(0,10).split('-');
	        	var month1 =(end_Date[0] - start_Date[0])*12;
	        	var month2 =end_Date[1] - start_Date[1];
	        	var days = end_Date[2] - start_Date[2];
	        	var month_flag = parseInt(start_Date[1]);
	        	var year_flag = parseInt(start_Date[0]);
	        	var day_count =0;
	        	switch(month_flag){
	        		case 1: case 3: case 5: case 7: case 8: case 10: case 12:
	        			day_count =31;break;
	        		case 4: case 6: case 9: case 11:
	        			day_count =30;break;
	        		case 2:
	        			if((year_flag%4==0 && year_flag%100!=0) || year_flag %400==0){
			        		day_count=29;break;
			        	}
			        	else{
				        	day_count=28;break;
	        			}
	        	}
	        	if((month1+month2)<=0){//月份为0
	        		txt_ls_validtime =days +'天';
	        		if(days==0){
	        			txt_ls_validtime = '--';
	        		}
	        	}
	        	else{//月份不为0
	        		if(days>0){
		        		txt_ls_validtime =(month1+month2)+'个月'+days+'天';
		        	}
		        	if(days <0){
		        		if(month1+month2-1>0){
		        			txt_ls_validtime =(month1+month2-1)+'个月'+(day_count+days)+'天';
		        		}
		        		else{
		        			txt_ls_validtime = (day_count+days)+'天';
		        		}
		        	}
		        	if(days==0){
		        		txt_ls_validtime = (month1+month2)+'个月';
		        	}
	        	}
	        	var txt_order_detail='<a class="details_link" href="javascript:;">订单详情</a>';
	        	if(txt_ls_status=='0'){//未付款
	        		txt_ls_status = '<span class="order_status unpaid">未付款</span>'+txt_order_detail;
	        		txt_ls_operate='<a title="付款" class="pay_link" href="javascript:;">付款</a><span title="取消订单" class="cancel_link"></span>';
	        	}
	        	if(txt_ls_status=='1'){//已付款
	        		txt_ls_status = '<span class="order_status paid">成功付款</span>'+txt_order_detail;
	        		txt_ls_operate='--';
	        	}
	        	if(txt_ls_status=='2'){//已取消
	        		txt_ls_status = '<span class="order_status">已取消</span>'+txt_order_detail;
	        		txt_ls_operate='--';
	        	}
	        	if(txt_ls_status=='3'){//已退款
	        		txt_ls_status = '<span class="order_status">已退款</span>'+txt_order_detail;
	        		txt_ls_operate='--';
	        	}
	        	if(txt_ls_status=='4'){//已到期
	        		txt_ls_status = '<span class="order_status">已过期</span>'+txt_order_detail;
	        		txt_ls_operate='--';
	        	}
        		ls_html = ls_html+'<tr><td class="width230 ls_orderid">'+txt_ls_id+'</td><td class="width180">'+txt_ls_type+'</td><td class="width150">'+txt_ls_createtime+'</td><td class="width110">'+txt_ls_price+'</td><td class="width70 valid_time">'+txt_ls_validtime+'</td><td class="width110 trade_status">'+txt_ls_status+'</td><td class="width150 order_operate">'+txt_ls_operate+'</td></tr>';
			}
			$(".OH_table_content tbody").html(ls_html);
		}
	});	
}

account.ui.gotoPage=function(){//跳转到指定页面的方法
	var totalPage=$(".total_page_count").text();//获取总页数;
    var inputPage=parseInt($("#pages_area input[type=text]").val());//输入的页码
    if($("#pages_area input[type=text]").val() == ''){//输入框为空
    	account.tools.showmsg("请输入页码!",2);
    }
    else{//输入框不为空
    	if(inputPage){//输入内容能转换为数字
	    	if(inputPage < 1 || inputPage > parseInt(totalPage)){
	    		account.tools.showmsg("输入的页码超出范围!",2);
	    	}
	    	else{
	    		if(inputPage == 1){
		    		$("#pages_area .page").removeClass("active");
		    		$("#pages_area .page_1").addClass("active");
		    	}
		    	if(inputPage == 2){
		    		$("#pages_area .page").removeClass("active");
		    		$("#pages_area .page_2").addClass("active");
		    	}
		    	if(inputPage == 3){
		    		$("#pages_area .page").removeClass("active");
		    		$("#pages_area .page_3").addClass("active");
		    	}
		    	if(inputPage == 4){
		    		$("#pages_area .page").removeClass("active");
		    		$("#pages_area .page_4").addClass("active");
		    	}
		    	if(inputPage == 5){
		    		$("#pages_area .page").removeClass("active");
		    		$("#pages_area .page_5").addClass("active");
		    	}
		    	if(inputPage > 5){
		    		$("#pages_area .page").removeClass("active");
		    	}
		    	account.ui.getListsAgain(inputPage);
		    	$(".current_page").html(inputPage);
	    	}
	    	$("#pages_area input[type=text]").val('');
	    }
	    else{//输入内容不能转换为数字
	    	account.tools.showmsg("输入页码有误!",2);
	    }
    }
    
}
account.ui.prevPage=function(){//点击上一页的方法
	var currentPage = parseInt($(".current_page").text());
	if(currentPage-1 == 1){
	    $("#pages_area .page").removeClass("active");
	    $("#pages_area .page_1").addClass("active");
	}
	if(currentPage-1 == 2){
	    $("#pages_area .page").removeClass("active");
	    $("#pages_area .page_2").addClass("active");
	}
	if(currentPage-1 == 3){
	    $("#pages_area .page").removeClass("active");
	    $("#pages_area .page_3").addClass("active");
	}
	if(currentPage-1 == 4){
	    $("#pages_area .page").removeClass("active");
	    $("#pages_area .page_4").addClass("active");
	}
	if(currentPage-1 == 5){
	    $("#pages_area .page").removeClass("active");
	    $("#pages_area .page_5").addClass("active");
	}
	if(currentPage-1 > 5){
	    $("#pages_area .page").removeClass("active");
	}
	if(currentPage-1 <1){
		account.tools.showmsg("已到首页!",2);
	}
	else{
		account.ui.getListsAgain(currentPage-1);
		$(".current_page").html(currentPage-1);
	}
}
account.ui.nextPage=function(){//点击下一页的方法
	var currentPage = parseInt($(".current_page").text());
	var totalPage = parseInt($(".total_page_count").text());
	if(currentPage+1 == 2){
		if(totalPage != 1){
			$("#pages_area .page").removeClass("active");
	    	$("#pages_area .page_2").addClass("active");
		}
	}
	if(currentPage+1 == 3){
		if(totalPage != 2){
			$("#pages_area .page").removeClass("active");
	    	$("#pages_area .page_3").addClass("active");
		}
	}
	if(currentPage+1 == 4){
		if(totalPage != 3){
	    	$("#pages_area .page").removeClass("active");
	    	$("#pages_area .page_4").addClass("active");
		}
	}
	if(currentPage+1 == 5){
		if(totalPage != 4){
	    	$("#pages_area .page").removeClass("active");
	    	$("#pages_area .page_5").addClass("active");
		}
	}
	if(currentPage+1 > 5){
		if(totalPage != 5){
	    	$("#pages_area .page").removeClass("active");
		}
	}
	if(currentPage+1 > totalPage){
		account.tools.showmsg("已到尾页!",2);
	}
	else{
		account.ui.getListsAgain(currentPage+1);
		$(".current_page").html(currentPage+1);
	}
}


