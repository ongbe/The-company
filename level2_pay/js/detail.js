window.onload=function(){
    detail.ui.login();
    detail.ui.toSearch();
    detail.ui.getOrderDetails();
}


var detail ={};

detail.ui={};
detail.ui.stopBubble=function(e){
    e=e||window.event;
    if(e.stopPropagation){
        e.stopPropagation();//W3C阻止冒泡方法 
    }
    else{
        e.cancelBubble =true;//IE阻止冒泡方法
    }
}

detail.ui.showmsg=function(txt,t){//显示提示信息的函数，txt是内容，t是显示时间
    $("body").append("<div class='showmsg'>" + txt + "</div>");//在body后面插入showmsg的div
    $(".showmsg").fadeIn().delay(t*1000).fadeOut(200,function(){
        $(".showmsg").remove();//用完之后删掉此div
    });
}

detail.ui.login=function(){
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

detail.ui.toSearch=function(){
    var lists=$(".options li");
    $("#choose_item").click(function(e){//点击h2，ul显示，点击其他地方，ul隐藏；
        $(".options").css("display","block");
        detail.ui.stopBubble(e);//阻止冒泡;
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

detail.ui.getOrderDetails=function(){
    var url=window.location.href;//获取当前浏览器的地址;
    var orderId =url.split('=')[1];
    $.ajax({//获取订单详情
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
            var txt_status='';
            var txt_totalPrice='';
            var txt_orderDate='';
            var txt_payTerms='';//付款方式
            var txt_payDate='';//付款时间

            var txt_marketCategory='';
            var txt_marketPrice='';
            var txt_marketDays='';//有效时间
            var txt_startTime='';//起始时间
            var txt_endTime='';//结束时间

            var status_type =d.result.data.pay_status;
            var product_type =d.result.data.product;
            if(status_type == "0"){/*如果支付状态为0，还没有付款*/
                txt_status ="未付款！";
                $(".btn_order_pay").css("display","block");
                $(".order_price").css("display","block");
            }
            if(status_type == "1"){//如果订单已支付成功
                txt_status ="付款成功！";
                txt_payDate=d.result.data.pay_time;
                txt_startTime='  ('+d.result.data.start_time.substr(0,10)+'  到';
                txt_endTime='  '+d.result.data.end_time.substr(0,10) +')';
                $(".label_payTerms").css("display","block");
                $(".label_payDate").css("display","block");
                $(".txt_moreinfo").text("温馨提示：您的本次订单已支付成功，如有其他问题请联系客服处理。");
            }
            if(status_type == "2"){
                txt_status ="已取消！";
                $(".txt_moreinfo").text("温馨提示：您已取消本次订单，如有需要您可以再次订阅。");
                $(".label_payTerms").html('取消时间：<span id="txt_payTerms"></span>');
                $(".label_payTerms").css("display","block");
                $("#txt_payTerms").html(d.result.data.modify_time);
            }
            if(status_type == "3"){
                txt_status ="已退款！";
                $(".txt_moreinfo").text("温馨提示：此次订单已成功付款，欢迎您再次订阅。");
            }
            if(status_type == "4"){
                txt_status ="已过期！";
                txt_startTime='  ('+d.result.data.start_time.substr(0,10)+'  到';
                txt_endTime='  '+d.result.data.end_time.substr(0,10) +')';
                $(".txt_moreinfo").text("温馨提示：此次订单已经过期，如有需要欢迎您再次订阅。");
                $(".label_payTerms").html('过期时间：<span id="txt_payTerms"></span>');
                $(".label_payTerms").css("display","block");
                $("#txt_payTerms").html(d.result.data.end_time);
            }
            if(product_type=="hq"){//行情包
                txt_marketCategory="港股Level2+A股Level2";
                if(d.result.data.price_type=="1"){
                    txt_marketDays ='1周';
                }
                if(d.result.data.price_type=="2"){
                    txt_marketDays ='2个月';
                }
                if(d.result.data.price_type=="3"){
                    txt_marketDays ='1年';
                }
            }

            if(product_type=="hk_hq"){//港股的情况
                txt_marketCategory="港股Level2行情";
                if(d.result.data.price_type=="4"){
                    txt_marketDays ='1周';
                }
                if(d.result.data.price_type=="5"){
                    txt_marketDays ='1天';
                }
                if(d.result.data.price_type=="6"){
                    txt_marketDays ='3天';
                }
                if(d.result.data.price_type=="7"){
                    txt_marketDays ='5天';
                }
            }
            txt_totalPrice =parseFloat(d.result.data.price);
            txt_orderDate =d.result.data.create_time;

            $("#txt_status").html(txt_status);
            $("#txt_totalPrice").html(txt_totalPrice);
            $("#txt_orderNumber").html(orderId);
            $("#txt_orderDate").html(txt_orderDate);
            $("#txt_payDate").html(txt_payDate);
            $("#txt_marketCategory").html(txt_marketCategory);
            $("#txt_marketPrice").html(txt_totalPrice);
            $("#txt_marketDays").html(txt_marketDays);
            $("#txt_startTime").html(txt_startTime);
            $("#txt_endTime").html(txt_endTime);

            $(".btn_order_pay").click(function(){//点击付款按钮
                //$(this).attr('href','http://current.finance.sina.com.cn/pay/view/pay.php?order_id='+ orderId);
                var w=window.open();
                w.location='http://current.finance.sina.com.cn/pay/view/pay.php?order_id='+ orderId;
                //window.open('http://current.finance.sina.com.cn/pay/view/pay.php?order_id='+ orderId);
                $("#box").css("display","block");//显示摸态弹出窗口；
                $("#hidden_layer").fadeIn("slow");
            });
        }
    });
    $(".box_btn").click(function(){//点击完成按钮
        $.ajax({//获取订单详情
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
                    $("#box").css("display","none");
                    $("#hidden_layer").fadeOut("slow");
                    $("#position_link").css("display","none");
                    $("#order_noticeinfo").css("display","none");
                    $("#main_orderinfo").css("display","none");
                    $("#order_content").css("display","block");
                    $("#txtOrderNum").html(orderId);//获取订单号；
                    $("#txtProductPrice").html(parseFloat(d.result.data.price)+'元');//获取总价格
                    $("#txtTotalDate").html($('#txt_marketDays').html());//获取总时间
                    $("#startDate").html(d.result.data.start_time.substr(0,10));//获取起始日期
                    $("#endDate").html(d.result.data.end_time.substr(0,10));//获取结束日期
                }
                else{
                    $("#box").css("display","none");
                    $("#hidden_layer").fadeOut("slow");
                    detail.ui.showmsg("对不起，付款未完成",2);
                }  
            }
        });
    });
    $(".box_bottom a").click(function(){//没有完成付款
        $("#box").css("display","none");
        $("#hidden_layer").fadeOut("slow");
        $(this).attr("href","javascript:;");
    });  
}
