
// Search suggest
var SuggestServer02 = new SuggestServer().bind({
	'input': 'suggest02_input',
	'value': '@2@',
	'default': 'ƴ��/����/����',
	'head': ["ѡ��","����","����","��������"],
	'body': [-1,-2,2,4],
	'type': '',
	'link': 'http://biz.finance.sina.com.cn/suggest/lookup_n.php?country=@type@&q=@code@',
	'callback': null
});
// Side bar
var setSideSearch = function (clearId) {
	clearInterval(clearId);
	var sideWrap =  $('#SI_Sidebtns_Wrap');
	var visitedBtn = 
			'<div class="fold-right"></div>' +
			'<div class="s-recent udv-clearfix" id="sidebar-recent">' +
				'<span class="s-recent-btn">���<br />����</span>' +
				'<div class="s-recent-blk stock_visited">' +
				'<table>' +
					'<thead>' +
						'<tr>' +
							'<td style="width:21%;">����</th>' +
							'<td style="width:21%;">����</th>' +
							'<td style="width:21%;">���¼�</th>' +
							'<td style="width:21%;">�ǵ���(%)</th>' +
							'<td>ɾ��</th>' +
						'</tr>' +
					'</thead>' +
					'<tbody>' +
					'</tbody>' +
				'</table>' +
				'</div>' +
				'<script type="text/javascript" src="./js/stock_visited.js"></script>' +
			'</div>';
	var searchBtn =
			'<div class="s-search udv-clearfix" id="sidebar-search">' +
				'<span class="s-search-btn">����</span>' +
				'<div class="s-search-blk">' +
					'<a href="javascript:;" class="s-sb-close" id="sidebar-close"></a>' +
					'<form action="http://biz.finance.sina.com.cn/suggest/lookup_n.php" method="get" target="_blank" class="udv-clearfix" id="sideSearch">' +
						'<input type="hidden" name="country" value="">' +
						'<input autocomplete="off" value="���/����/ƴ��" id="suggest03_input" name="q" class="sb_text">' +
						'<input type="submit" class="sb_btn" value="����"/>' +
					'</form>' +
				'</div>' +
			'</div>';
	sideWrap.prepend(searchBtn);
	sideWrap.prepend(visitedBtn);
	//������ʵ��չ��
	$(".s-recent-btn").click(function(){
		if($(this).hasClass("s-recent-open")){
			$(".s-recent-blk").animate({"right":"-425px"},100,function(){
				$(".s-recent-blk").css("display","none")
			});
			$(this).removeClass("s-recent-open");
			$(this).html("���<br />����");
		}else{
			$(".s-recent-blk").children("table").css({"display":"none"});
			$(".s-recent-blk").css({"display":"block","height":"50px","width":"50px","right":"65px"});
			$(".s-recent-blk").animate({"width":"400px"},200,function(){
				$(".s-recent-blk").animate({"height":"280px"},300,function(){
					$(".s-recent-blk").children("table").fadeIn();
				});
			});
			$(this).addClass("s-recent-open");
			$(this).html("&nbsp;X<br />�ر�");
		}
	});
	//�����Ҳ�sidebar
	$("#SI_Sidebtns_Wrap").hover(function(){
		$(".fold-right").fadeOut(100);
		$("#SI_Sidebtns_Wrap").stop().animate({"right":"0px"},100,function(){
			if($("#sidebar-search").hasClass("s-search-hover")){
				$(".s-search-btn").animate({"right":"269px"},100,function(){
					$("#SI_Totop_Btn").animate({"right":"0px"},100);
				});
			}else{
				$(".s-search-btn").animate({"right":"0px"},100,function(){
					$("#SI_Totop_Btn").animate({"right":"0px"},100);
				});
			}
		});
	},function(){
		if($("#sidebar-search").hasClass("s-search-hover")){
			$(".s-search-btn").animate({"right":"269px"},100);
		}else{
			$(".s-search-btn").animate({"right":"-20px"},100);
			$("#SI_Totop_Btn").animate({"right":"-40px"},100);
			$("#SI_Sidebtns_Wrap").stop().animate({"right":"-60px"},100);
			if($(".s-recent-btn").hasClass("s-recent-open") == false){
				$(".fold-right").fadeIn();
			}
		}
	});
	
	var sideSearch = $('#sidebar-search');
	var sideClose = $('#sidebar-close');
	var isShow = false;
	sideSearch.click(function (event) {
		if (isShow) {return ;}
		if (event.target == $('.s-search-btn')[0]) {
			sideSearch.addClass('s-search-hover');
			$(".s-search-btn").css({"right":"269px"});
			//callSuda_finance('finance_index_shortlist', 'click');
			isShow = true;
		}
	});
	sideClose.click(function () {
		setTimeout(function () {sideSearch.removeClass('s-search-hover');}, 2);
			$(".s-search-btn").css({"right":"0px"});
		//callSuda_finance('finance_index_shortlist', 'close');
		isShow = false;
	});
	// side bar
	var SuggestServer03 = new SuggestServer().bind({
		'input': "suggest03_input",
		'value': "@2@",
		'default': "ƴ��/����/����",
		'head': ["ѡ��","����","����","��������"],
		'body': [-1,-2,2,4],
		'type': "",
		'link': "http://biz.finance.sina.com.cn/suggest/lookup_n.php?country=@type@&q=@code@",
		'callback': null
	});
	$('#sideSearch').bind('submit', function () {
		callSuda_finance('finance_index_shortlist', 'search');
	}).bind('click', function (event) {
				if(event.target.tagName.toLowerCase() == 'a' && event.target.parentNode.tagName.toLowerCase() =='td') {
					callSuda_finance('finance_index_shortlist', 'search');
				}
			});
};
var clearId = setInterval(function () {
	if (document.getElementById('SI_Sidebtns_Wrap')) {
		setSideSearch(clearId);
	}
}, 10);

var $globalInfo = $globalInfo||{};
if(typeof $globalInfo.SHMLoaded == 'undefined'){
	$globalInfo.SHMLoaded = false;
	var SHM = (function(){
		var it = {};
		//getElementById
		it.E = function(id){
			if (typeof id === "string") {
				return document.getElementById(id);
			}
			return id;
		};
		//createElement
		it.C = function(tag){
			tag = tag.toUpperCase();
			if (tag == 'TEXT') {
				return document.createTextNode('');
			}
			if (tag == 'BUFFER') {
				return document.createDocumentFragment();
			}
			return document.createElement(tag);
		};
		//register
		it.register = function(namespace, method) {
	        var i   = 0,
				un  = it,
				ns  = namespace.split('.'),
				len = ns.length,
				upp = len - 1,
				key;
			while(i<len){
				key = ns[i];
				if(i==upp){
					if(un[key] !== undefined){
						throw ns + ':: has registered';
					}
					un[key] = method(it);
				}
				if(un[key]===undefined){
					un[key] = {}
				}
				un = un[key];
				i++
			}
	    };
		//register short
		it.regShort = function(key, method){
			if (it[key] !== undefined) {
				throw key + ':: has registered';
			}
	        it[key] = method;
		};
		var Detect = function(){
	        var ua = navigator.userAgent.toLowerCase();
	        this.isIE = /msie/.test(ua);
	        this.isOPERA = /opera/.test(ua);
	        this.isMOZ = /gecko/.test(ua);
	        this.isIE5 = /msie 5 /.test(ua);
	        this.isIE55 = /msie 5.5/.test(ua);
	        this.isIE6 = /msie 6/.test(ua);
	        this.isIE7 = /msie 7/.test(ua);
	        this.isCHROME = /chrome/i.test(ua)&&/webkit/i.test(ua)&&/mozilla/i.test(ua);
	        this.isSAFARI = /safari/.test(ua)&&!this.isCHROME;
	        this.iswinXP = /windows nt 5.1/.test(ua);
	        this.iswinVista = /windows nt 6.0/.test(ua);
	        this.isFF = /firefox/.test(ua);
	        this.isIOS = /\((iPhone|iPad|iPod)/i.test(ua);
	    };
	    $globalInfo.ua = new Detect();
		return it;
	})();
}else{
	SHM._register = SHM.register;
	SHM.register = function(m,n){}
}
SHM.register('dom.ready', function(){
	var  fns     = []
		,isReady = 0
		,inited  = 0
		,isReady = 0;

	var checkReady = function(){
		if(document.readyState === 'complete'){
			return 1;
		}
		return isReady;
	};

	var onReady = function(type){
		if(isReady){return}
		isReady = 1;

		if(fns){
			while (fns.length) {
				fns.shift()()
			}
		}
		fns = null
	};

	var bindReady = function(){
		if(inited){return}
		inited = 1;

		//��ʼ��ʼ��domReady�������ж�ҳ��ļ������
		if (document.readyState === "complete") {
			onReady();
		} else if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", function() {
				document.removeEventListener("DOMContentLoaded", arguments.callee, false);
				onReady();
			}, false);
			//���������ʱchrome firefox��������
			window.addEventListener( "load", function(){
				window.removeEventListener("load", arguments.callee, false);
				onReady();
			}, false );
		} else {
			document.attachEvent("onreadystatechange", function() {
				if (document.readyState == "complete") {
					document.detachEvent("onreadystatechange", arguments.callee);
					onReady();
				}
			});
			(function() {
				if (isReady) {
					return;
				}
				var node = new Image
				try {
					node.doScroll();
					node = null //��ֹIE�ڴ�й©
				} catch (e) {
					setTimeout(arguments.callee, 64);
					return;
				}
				onReady();
			})();
		}
	};

	return function(fn){
		bindReady();
		if(!checkReady()){
			fns.push(fn);
			return;
		}
		//onReady();
		fn.call();
	}
});
SHM.register('util.getUniqueKey', function($){
	return function(){
		return Math.floor(Math.random() * 1000) + new Date().getTime().toString();
	};
});
SHM.register('dom.uniqueID', function($){
	return function(node) {
		return node && (node.uniqueID || (node.uniqueID = $.util.getUniqueKey()));
	};
});
SHM.register('dom.hasClass', function($) {
	return function(a, b) {
		return(new RegExp('(^|\s)' + b + '($|\s)')).test(a.className)
	}
});
SHM.register('dom.addClass', function($) {
	return function(b, c) {
		b.nodeType === 1 && ($.dom.hasClass(b, c) || (b.className = $.str.trim(b.className) + ' ' + c))
	}
});
SHM.register('dom.removeClass', function($) {
	return function(b, c) {
		b.nodeType === 1 && $.dom.hasClass(b, c) && (b.className = b.className.replace(new RegExp('(^|\s)' + c + '($|\s)'), ' '))
	}
});
SHM.register('dom.getScrollPos', function($){
	return function(doc){
	    doc = doc || document;
	    var dd = doc.documentElement;
	    var db = doc.body;
	    return [
	    		Math.max(dd.scrollTop, db.scrollTop),
	    		Math.max(dd.scrollLeft, db.scrollLeft),
	    		Math.max(dd.scrollWidth, db.scrollWidth),
	    		Math.max(dd.scrollHeight, db.scrollHeight)
	    		];
	}
});
SHM.register('dom.getStyle', function($){
	    var getStyle = function (el, property) {
	    	switch (property) {
	    		// ͸����
	    		case "opacity":
	    			var val = 100;
	    			try {
	    					val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
	    			}
	    			catch(e) {
	    				try {
	    					val = el.filters('alpha').opacity;
	    				}catch(e){}
	    			}
	    			return val/100;
	    		 // ����
	    		 case "float":
	    			 property = "styleFloat";
	    		 default:
	    			 var value = el.currentStyle ? el.currentStyle[property] : null;
	    			 return ( el.style[property] || value );
	    	}
	    };
	    if(!$globalInfo.ua.isIE) {
			getStyle = function (el, property) {
				// ����
				if(property == "float") {
					property = "cssFloat";
				}
				// ��ȡ����
				try{
					var computed = document.defaultView.getComputedStyle(el, "");
				}
				catch(e) {
					traceError(e);
				}
				return el.style[property] || computed ? computed[property] : null;
			};
		}
	return getStyle;
});

SHM.register('dom.getWinSize', function() {
	return function(win){
		var w, h;
		var target;
		if (win) {
			target = win.document;
		}
		else {
			target = document;
		}
		if (self.innerHeight) { // all except Explorer
			if (win) {
				target = win.self;
			}
			else {
				target = self;
			}
			w = target.innerWidth;
			h = target.innerHeight;
		}
		else if (target.documentElement && target.documentElement.clientHeight) { // Explorer 6 Strict Mode
			w = target.documentElement.clientWidth;
			h = target.documentElement.clientHeight;
		}
		else if (target.body) { // other Explorers
			w = target.body.clientWidth;
			h = target.body.clientHeight;
		}
		return 	{
					width : w,
					height : h
				};
	};
});
SHM.register('dom.getXY', function($){
	var getStyle = $.dom.getStyle;
	var getScrollPos = $.dom.getScrollPos;
	var getXY = function (el) {
		if ((el.parentNode == null || el.offsetParent == null || getStyle(el, "display") == "none") && el != document.body) {
			return false;
		}
		var parentNode = null;
		var pos = [];
		var box;
		var doc = el.ownerDocument;
		// IE
		box = el.getBoundingClientRect();
		var scrollPos = getScrollPos(el.ownerDocument);
		return [box.left + scrollPos[1], box.top + scrollPos[0]];
		// IE end
		parentNode = el.parentNode;
		while (parentNode.tagName && !/^body|html$/i.test(parentNode.tagName)) {
			if (getStyle(parentNode, "display").search(/^inline|table-row.*$/i)) {
				pos[0] -= parentNode.scrollLeft;
				pos[1] -= parentNode.scrollTop;
			}
			parentNode = parentNode.parentNode;
		}
		return pos;
	};
	if(!$globalInfo.ua.isIE) {
		getXY = function (el) {
			if ((el.parentNode == null || el.offsetParent == null || getStyle(el, "display") == "none") && el != document.body) {
				return false;
			}
			var parentNode = null;
			var pos = [];
			var box;
			var doc = el.ownerDocument;

			var isSAFARI = $globalInfo.ua.isSAFARI;

			// FF
			pos = [el.offsetLeft, el.offsetTop];
			parentNode = el.offsetParent;
			var hasAbs = getStyle(el, "position") == "absolute";

			if (parentNode != el) {
				while (parentNode) {
						pos[0] += parentNode.offsetLeft;
						pos[1] += parentNode.offsetTop;
						if (isSAFARI && !hasAbs && getStyle(parentNode,"position") == "absolute" ) {
								hasAbs = true;
						}
						parentNode = parentNode.offsetParent;
				}
			}

			if (isSAFARI && hasAbs) {
				pos[0] -= el.ownerDocument.body.offsetLeft;
				pos[1] -= el.ownerDocument.body.offsetTop;
			}
			parentNode = el.parentNode;
			// FF End
			while (parentNode.tagName && !/^body|html$/i.test(parentNode.tagName)) {
				if (getStyle(parentNode, "display").search(/^inline|table-row.*$/i)) {
					pos[0] -= parentNode.scrollLeft;
					pos[1] -= parentNode.scrollTop;
				}
				parentNode = parentNode.parentNode;
			}
			return pos;
		};
	}
	return getXY;
});
SHM.register('dom.insertAfter', function(a) {
	return function(ele, rEle) {
		var par = rEle.parentNode;
		par.lastChild == rEle ? par.appendChild(ele) : par.insertBefore(ele, rEle.nextSibling)
	}
});
SHM.register('dom.insertBefore', function(a) {
	return function(ele, rEle) {
		var par = rEle.parentNode;
		par.insertBefore(ele, rEle)
	}
});
SHM.register('dom.isNode', function($){
	return function(oNode){
	    return !!((oNode != undefined) && oNode.nodeName && oNode.nodeType);
	}
});
SHM.register('dom.parseDOM', function(a) {
		return function(a) {
			for(var b in a) a[b] && a[b].length == 1 && (a[b] = a[b][0]);
			return a
		}
	});

SHM.register('dom.builder', function($) {
		return function(str, c) {
			var isStr = typeof str == 'string',
				wrap = str;
			if(isStr) {
				wrap = $.C('div');
				wrap.innerHTML = str
			}
			var list, nodes;
			// nodes = $.dom.sizzle("[node-type]", wrap);
			nodes = $.dom.byAttr(wrap,'node-type');
			list = {};
			for(var h = 0, i = nodes.length; h < i; h += 1) {
				var j = nodes[h].getAttribute('node-type');
				list[j] || (list[j] = []);
				list[j].push(nodes[h])
			}
			var box = str;
			if(isStr) {
				box = $.C('buffer');
				while(wrap.childNodes[0]) box.appendChild(wrap.childNodes[0])
			}
			return {
				box: box,
				list: list
			}
		}
	});
SHM.register('str.trim', function($){
	return function(str){
		//return str.replace(/(^\s*)|(\s*$)/g, "");
		//����ȫ�ǿո�
		return str.replace(/(^[\s\u3000]*)|([\s\u3000]*$)/g, "");
	};
});
SHM.register('str.encodeDoubleByte', function($){
	return function (str) {
		if(typeof str != "string") {
			return str;
		}
		return encodeURIComponent(str);
	};
});
SHM.register('str.encodeHTML', function($) {
	return function(str) {
		if(typeof str != "string") throw "encodeHTML need a string as parameter";
		return str.replace(/\&/g, "&amp;").replace(/"/g, "&quot;").replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/'/g, "&#39;").replace(/\u00A0/g, "&nbsp;").replace(/(\u0020|\u000B|\u2028|\u2029|\f)/g, "&#32;")
	}
});
SHM.register('str.decodeHTML', function($) {
	return function(str) {
		if(typeof str != "string") throw "decodeHTML need a string as parameter";
		return str.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39/g, "'").replace(/&nbsp;/g, "?").replace(/&#32/g, " ").replace(/&amp;/g, "&")
	}
});
SHM.register('str.byteLength', function($){
	return function(str){
		if(typeof str == "undefined"){
			return 0;
		}
		var aMatch = str.match(/[^\x00-\x80]/g);
		return (str.length + (!aMatch ? 0 : aMatch.length));
	};
});
SHM.register('arr.indexOf', function($){
	return function(oElement, aArray){
		if (aArray.indexOf) {
			return aArray.indexOf(oElement);
		}
		var i = 0, len = aArray.length;
		while(i<len){
			if (aArray[i] === oElement) {
				return i;
			}
			i++
		}
		return -1;
	};
});
SHM.register('arr.inArray', function($){
	return function(oElement, aSource){
		return $.arr.indexOf(oElement, aSource) > -1;
	};
});

SHM.register('arr.foreach', function($){
	return function(aArray, insp){
		if (!$.arr.isArray(aArray)) {
			throw 'the foreach function needs an array as first parameter';
		}
		var i = 0, len = aArray.length, ret = [];
		while(i<len){
			var snap = insp(aArray[i], i);
			if(snap === false){break}
			if(snap !== null) {ret[i] = snap}
			i++
		}
		return ret;
	};
});
SHM.register('arr.isArray', function($){
	return function(o){
	  return Object.prototype.toString.call(o) === '[object Array]';
	};
});
SHM.register('json.jsonToQuery',function($){
	var _fdata   = function(data,isEncode){
		data = data == null? '': data;
		data = $.trim(data.toString());
		if(isEncode){
			return encodeURIComponent(data);
		}else{
			return data;
		}
	};
	return function(JSON,isEncode){
		var _Qstring = [];
		if(typeof JSON == "object"){
			for(var k in JSON){
				if(JSON[k] instanceof Array){
					for(var i = 0, len = JSON[k].length; i < len; i++){
						_Qstring.push(k + "=" + _fdata(JSON[k][i],isEncode));
					}
				}else{
					if(typeof JSON[k] != 'function'){
						_Qstring.push(k + "=" +_fdata(JSON[k],isEncode));
					}
				}
			}
		}
		if(_Qstring.length){
			return _Qstring.join("&");
		}else{
			return "";
		}
	};
});
SHM.register('json.queryToJson',function($){
	return function(QS, isDecode){
		var _Qlist = $.str.trim(QS).split("&");
		var _json  = {};
		var _fData = function(data){
			if(isDecode){
				return decodeURIComponent(data);
			}else{
				return data;
			}
		};
		for(var i = 0, len = _Qlist.length; i < len; i++){
			if(_Qlist[i]){
				_hsh = _Qlist[i].split("=");
				_key = _hsh[0];
				_value = _hsh[1];

				// ���ֻ��keyû��value, ��ô��ȫ������һ��$nullName������
				if(_hsh.length < 2){
					_value = _key;
					_key = '$nullName';
				}
				// ��������ջ��û���������
				if(!_json[_key]) {
					_json[_key] = _fData(_value);
				}
				// �����ջ���Ѿ�����������ݣ���ת��������洢
				else {
					if($.arr.isArray(_json[_key]) != true) {
						_json[_key] = [_json[_key]];
					}
					_json[_key].push(_fData(_value));
				}
			}
		}
		return _json;
	};
});
SHM.register('evt.addEvent',function($){
	return function(elm, evType,func, useCapture) {
		var _el = $.dom.byId(elm);
		if(_el == null){
			//throw new Error("addEvent �Ҳ�������" + elm);
			return;
		}
		if (typeof useCapture == 'undefined') {
			useCapture = false;
		}
		if (typeof evType == 'undefined') {
			evType = 'click';
		}
		if (_el.addEventListener) {
			_el.addEventListener(evType, func, useCapture);
			return true;
		}
		else if (_el.attachEvent) {
			var r = _el.attachEvent('on' + evType, func);
			return true;
		}
		else {
			_el['on' + evType] = func;
		}
	};
});
SHM.register('evt.removeEvent',function($){
	return function (oElement,sName, fHandler) {
		var _el = $.dom.byId(oElement);
		if(_el == null){
			throw ("removeEvent �Ҳ�������" + oElement);
			return;
		}
		if (typeof fHandler != "function") {
			return;
		}
		if (typeof sName == 'undefined') {
			sName = 'click';
		}
		if (_el.addEventListener) {
			_el.removeEventListener(sName, fHandler, false);
		}
		else if (_el.attachEvent) {
			_el.detachEvent("on" + sName, fHandler);
		}
		fHandler[sName] = null;
	};
});
SHM.register('evt.fixEvent',function($){
	return fixEvent = function (e) {
		if(typeof e == 'undefined')e = window.event;
		if (!e.target) {
			e.target = e.srcElement;
			e.pageX = e.x;
			e.pageY = e.y;
		}
		if(typeof e.layerX == 'undefined')e.layerX = e.offsetX;
		if(typeof e.layerY == 'undefined')e.layerY = e.offsetY;
		return e;
	};
});
SHM.register('evt.preventDefault',function($){
	return function (e) {
		var e = e||window.event;
		if ($globalInfo.ua.isIE) {
		    e.returnValue = false;
		} else {
		    e.preventDefault();
		}
	};
});
//byid
SHM.register('dom.byId',function($){
	return function(id){
        if (typeof id === 'string') {
            return document.getElementById(id);
        }
        else {
            return id;
        }
    };
});
SHM.register('util.browser', function(a) {
	var b = navigator.userAgent.toLowerCase(),
		c = window.external || "",
		d, e, f, g, h, i = function(a) {
			var b = 0;
			return parseFloat(a.replace(/\./g, function() {
				return b++ == 1 ? "" : "."
			}))
		};
	try {
		/windows|win32/i.test(b) ? h = "windows" : /macintosh/i.test(b) ? h = "macintosh" : /rhino/i.test(b) && (h = "rhino");
		if((e = b.match(/applewebkit\/([^\s]*)/)) && e[1]) {
			d = "webkit";
			g = i(e[1])
		} else if((e = b.match(/presto\/([\d.]*)/)) && e[1]) {
			d = "presto";
			g = i(e[1])
		} else if(e = b.match(/msie\s([^;]*)/)) {
			d = "trident";
			g = 1;
			(e = b.match(/trident\/([\d.]*)/)) && e[1] && (g = i(e[1]))
		} else if(/gecko/.test(b)) {
			d = "gecko";
			g = 1;
			(e = b.match(/rv:([\d.]*)/)) && e[1] && (g = i(e[1]))
		}
		/world/.test(b) ? f = "world" : /360se/.test(b) ? f = "360" : /maxthon/.test(b) || typeof c.max_version == "number" ? f = "maxthon" : /tencenttraveler\s([\d.]*)/.test(b) ? f = "tt" : /se\s([\d.]*)/.test(b) && (f = "sogou")
	} catch(j) {}
	var k = {
		OS: h,
		CORE: d,
		Version: g,
		EXTRA: f ? f : !1,
		IE: /msie/.test(b),
		OPERA: /opera/.test(b),
		MOZ: /gecko/.test(b) && !/(compatible|webkit)/.test(b),
		IE5: /msie 5 /.test(b),
		IE55: /msie 5.5/.test(b),
		IE6: /msie 6/.test(b),
		IE7: /msie 7/.test(b),
		IE8: /msie 8/.test(b),
		IE9: /msie 9/.test(b),
		SAFARI: !/chrome\/([\d.]*)/.test(b) && /\/([\d.]*) safari/.test(b),
		CHROME: /chrome\/([\d.]*)/.test(b),
		IPAD: /\(ipad/i.test(b),
		IPHONE: /\(iphone/i.test(b),
		ITOUCH: /\(itouch/i.test(b),
		MOBILE: /mobile/i.test(b)
	};
	return k;
});
SHM.register('dom.position', function($) {
	var b = function(b) {
			var c, d, e, f, g, h;
			c = b.getBoundingClientRect();
			d = $.dom.scrollPos();
			e = b.ownerDocument.body;
			f = b.ownerDocument.documentElement;
			g = f.clientTop || e.clientTop || 0;
			h = f.clientLeft || e.clientLeft || 0;
			return {
				l: parseInt(c.left + d.left - h, 10) || 0,
				t: parseInt(c.top + d.top - g, 10) || 0
			}
		},
		c = function(b, c) {
			var d;
			d = [b.offsetLeft, b.offsetTop];
			parent = b.offsetParent;
			if(parent !== b && parent !== c) while(parent) {
				d[0] += parent.offsetLeft;
				d[1] += parent.offsetTop;
				parent = parent.offsetParent
			}
			if($.util.browser.OPERA != -1 || $.util.browser.SAFARI != -1 && b.style.position == "absolute") {
				d[0] -= document.body.offsetLeft;
				d[1] -= document.body.offsetTop
			}
			b.parentNode ? parent = b.parentNode : parent = null;
			while(parent && !/^body|html$/i.test(parent.tagName) && parent !== c) {
				if(parent.style.display.search(/^inline|table-row.*$/i)) {
					d[0] -= parent.scrollLeft;
					d[1] -= parent.scrollTop
				}
				parent = parent.parentNode
			}
			return {
				l: parseInt(d[0], 10),
				t: parseInt(d[1], 10)
			}
		};
	return function(d, e) {
		if(d == document.body) return !1;
		if(d.parentNode == null) return !1;
		if(d.style.display == "none") return !1;
		var f = $.obj.parseParam({
			parent: null
		}, e);
		if(d.getBoundingClientRect) {
			if(f.parent) {
				var g = b(d),
					h = b(f.parent);
				return {
					l: g.l - h.l,
					t: g.t - h.t
				}
			}
			return b(d)
		}
		return c(d, f.parent || document.body)
	}
});
//byclass
SHM.register('dom.byClass',function($){
	return function(clz,el,tg){
		el = el || document;
		el = typeof el=='string'?$.dom.byId(el):el;
		tg = tg || '*';
		var rs = [];
		clz = " " + clz +" ";
		var cldr = el.getElementsByTagName(tg), len = cldr.length;
		for (var i = 0; i < len; ++ i){
			var o = cldr[i];
			if (o.nodeType == 1){
				var ecl = " " + o.className + " ";
				if (ecl.indexOf(clz) != -1){
					rs[rs.length] = o;
				}
			}
		}
		return rs;
	};
});
//byattr
SHM.register('dom.byAttr',function($){
	return function(node, attname, attvalue){
		var nodes = [];
		attvalue = attvalue||'';
		for(var i = 0, l = node.childNodes.length; i < l; i ++){
			if(node.childNodes[i].nodeType == 1){
				var fit = false;
				if(attvalue){
					fit = (node.childNodes[i].getAttribute(attname) == attvalue);
				}else{
					fit = (node.childNodes[i].getAttribute(attname) !='')
				}
				if(fit){
					nodes.push(node.childNodes[i]);
				}
				if(node.childNodes[i].childNodes.length > 0){
					nodes = nodes.concat(arguments.callee.call(null, node.childNodes[i], attname, attvalue));
				}
			}
		}
		return nodes;
	};
});
SHM.register('dom.contains', function($){
	return function(root, el) {
        if (root.compareDocumentPosition)
             return root === el || !!(root.compareDocumentPosition(el) & 16);
         if (root.contains && el.nodeType === 1){
             return root.contains(el) && root !== el;
         }
         while ((el = el.parentNode)){
             if (el === root){
             	return true;
             }
         }
         return false;
    };
});
// �Զ����¼�
SHM.register('evt.custEvent', function($) {

	var _custAttr = "__custEventKey__",
		_custKey = 1,
		_custCache = {},
		/**
		 * �ӻ����в�����ض���
		 * ���Ѿ�����ʱ
		 * 	��typeʱ���ػ����е��б� û��ʱ���ػ����еĶ���
		 * û�ж���ʱ����false
		 * @param {Object|number} obj �������û��ȡ��key
		 * @param {String} type �Զ����¼�����
		 */
		_findObj = function(obj, type) {
			var _key = (typeof obj == "number") ? obj : obj[_custAttr];
			return (_key && _custCache[_key]) && {
				obj: (typeof type == "string" ? _custCache[_key][type] : _custCache[_key]),
				key: _key
			};
		};

	return {
		/**
		 * �����Զ����¼��Ķ��� δ������¼����ð�
		 * @method define
		 * @static
		 * @param {Object|number} obj �������û��ȡ���±�(key); ��ѡ
		 * @param {String|Array} type �Զ����¼�����; ��ѡ
		 * @return {number} key �±�
		 */
		define: function(obj, type) {
			if(obj && type) {
				var _key = (typeof obj == "number") ? obj : obj[_custAttr] || (obj[_custAttr] = _custKey++),
					_cache = _custCache[_key] || (_custCache[_key] = {});
				type = [].concat(type);
				for(var i = 0; i < type.length; i++) {
					_cache[type[i]] || (_cache[type[i]] = []);
				}
				return _key;
			}
		},

		/**
		 * �����Զ����¼���ȡ������
		 * ������������¼����嶼��ȡ��ʱ ɾ���Զ��������
		 * @method define
		 * @static
		 * @param {Object|number} obj �������û��ȡ��(key); ��ѡ
		 * @param {String} type �Զ����¼�����; ��ѡ �����ȡ�������¼��Ķ���
		 */
		undefine: function(obj, type) {
			if (obj) {
				var _key = (typeof obj == "number") ? obj : obj[_custAttr];
				if (_key && _custCache[_key]) {
					if (typeof type == "string") {
						if (type in _custCache[_key]) delete _custCache[_key][type];
					} else {
						delete _custCache[_key];
					}
				}
			}
		},

		/**
		 * �¼���ӻ��
		 * @method add
		 * @static
		 * @param {Object|number} obj �������û��ȡ��(key); ��ѡ
		 * @param {String} type �Զ����¼�����; ��ѡ
		 * @param {Function} fn �¼�������; ��ѡ
		 * @param {Any} data ��չ������������; ��ѡ
		 * @return {number} key �±�
		 */
		add: function(obj, type, fn, data) {
			if(obj && typeof type == "string" && fn) {
				var _cache = _findObj(obj, type);
				if(!_cache || !_cache.obj) {
					throw "custEvent (" + type + ") is undefined !";
				}
				_cache.obj.push({fn: fn, data: data});
				return _cache.key;
			}
		},

		/**
		 * �¼�ɾ������
		 * @method remove
		 * @static
		 * @param {Object|number} obj �������û��ȡ��(key); ��ѡ
		 * @param {String} type �Զ����¼�����; ��ѡ; Ϊ��ʱɾ�������µ������¼���
		 * @param {Function} fn �¼�������; ��ѡ; Ϊ����type��Ϊ��ʱ ɾ��������type�¼���ص����д�����
		 * @return {number} key �±�
		 */
		remove: function(obj, type, fn) {
			if (obj) {
				var _cache = _findObj(obj, type), _obj;
				if (_cache && (_obj = _cache.obj)) {
					if ($.arr.isArray(_obj)) {
						if (fn) {
							for (var i = 0; i < _obj.length && _obj[i].fn !== fn; i++);
							_obj.splice(i, 1);
						} else {
							_obj.splice(0);
						}
					} else {
						for (var i in _obj) {
							_obj[i] = [];
						}
					}
					return _cache.key;
				}
			}
		},

		/**
		 * �¼�����
		 * @method fire
		 * @static
		 * @param {Object|number} obj �������û��ȡ��(key); ��ѡ
		 * @param {String} type �Զ����¼�����; ��ѡ
		 * @param {Any|Array} args ��������򵥸�����������; ��ѡ
		 * @return {number} key �±�
		 */
		fire: function(obj, type, args) {
			if(obj && typeof type == "string") {
				var _cache = _findObj(obj, type), _obj;
				if (_cache && (_obj = _cache.obj)) {
					if(!$.arr.isArray(args)) {
						args = args != undefined ? [args] : [];
					}
					for(var i = 0; i < _obj.length; i++) {
						var fn = _obj[i].fn;
						if(fn && fn.apply) {
							fn.apply($, [{type: type, data: _obj[i].data}].concat(args));
						}
					}
					return _cache.key;
				}
			}
		},
		/**
		 * ����
		 * @method destroy
		 * @static
		 */
		destroy: function() {
			_custCache = {};
			_custKey = 1;
		}
	};
});
SHM.register('evt.getEvent', function($) {
	return function() {
		return document.addEventListener ?
		function() {
			var argCallee = arguments.callee,
				firstArg;
			do {
				firstArg = argCallee.arguments[0];
				if(firstArg && (firstArg.constructor == Event || firstArg.constructor == MouseEvent || firstArg.constructor == KeyboardEvent)) return firstArg
			} while (argCallee = argCallee.caller);
			return firstArg
		} : function(argCallee, firstArg, c) {
			return window.event
		}
	}()
});
// �¼�ί��
SHM.register('evt.delegatedEvent',function($){

	var checkContains = function(list,el){
		for(var i = 0, len = list.length; i < len; i += 1){
			if($.dom.contains(list[i],el)){
				return true;
			}
		}
		return false;
	};

	return function(actEl,expEls,aType){
		if(!$.dom.isNode(actEl)){
			throw 'SHM.evt.delegatedEvent need an Element as first Parameter';
		}
		if(!expEls){
			expEls = [];
		}
		if($.arr.isArray(expEls)){
			expEls = [expEls];
		}
		var evtList = {};
		var aType = aType || 'action-type';
		var bindEvent = function(e){
			var evt = $.evt.fixEvent(e);
			var el = evt.target;
			var type = e.type;
			if(checkContains(expEls,el)){
				return false;
			}else if(!$.dom.contains(actEl, el)){
				return false;
			}else{
				var actionType = null;
				var checkBuble = function(){
					if(evtList[type] && evtList[type][actionType]){
						return evtList[type][actionType]({
							'evt' : evt,
							'el' : el,
							'e' :e,
							'data' : $.json.queryToJson(el.getAttribute('action-data') || '')
						});
					}else{
						return true;
					}
				};
				while(el && el !== actEl){
					if(!el.getAttribute){
						break;
					}
					actionType = el.getAttribute(aType);
					if(checkBuble() === false){
						break;
					}
					el = el.parentNode;
				}

			}
		};
		var that = {};
		/**
		 * ��Ӵ����¼�
		 * @method add
		 * @param {String} funcName
		 * @param {String} evtType
		 * @param {Function} process
		 * @return {void}
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		var a = SHM.core.evt.delegatedEvent($.E('outer'),$.E('inner'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 *
		 */
		that.add = function(funcName, evtType, process){
			if(!evtList[evtType]){
				evtList[evtType] = {};
				$.evt.addEvent(actEl,evtType, bindEvent );
			}
			var ns = evtList[evtType];
			ns[funcName] = process;
		};
		/**
		 * �Ƴ������¼�
		 * @method remove
		 * @param {String} funcName
		 * @param {String} evtType
		 * @return {void}
		 * @example
		 * 		document.body.innerHTML = '<div id="outer"><a href="###" action_type="alert" action_data="test=123">test</a><div id="inner"></div></div>'
		 * 		var a = SHM.core.evt.delegatedEvent($.E('outer'),$.E('inner'));
		 * 		a.add('alert','click',function(spec){window.alert(spec.data.test)});
		 * 		a.remove('alert','click');
		 */
		that.remove = function(funcName, evtType){
			if(evtList[evtType]){
				delete evtList[evtType][funcName];
				if($.objIsEmpty(evtList[evtType])){
					delete evtList[evtType];
					$.evt.removeEvent(actEl, bindEvent, evtType);
				}
			}
		};

		that.pushExcept = function(el){
			expEls.push(el);
		};

		that.removeExcept = function(el){
			if(!el){
				expEls = [];
			}else{
				for(var i = 0, len = expEls.length; i < len; i += 1){
					if(expEls[i] === el){
						expEls.splice(i,1);
					}
				}
			}

		};

		that.clearExcept = function(el){
			expEls = [];
		};

		that.destroy = function(){
			for(k in evtList){
				for(l in evtList[k]){
					delete evtList[k][l];
				}
				delete evtList[k];
				$.evt.removeEvent(actEl, bindEvent, k);
			}
		};
		return that;
	};

});
//SHM.register('fun.bind2',function($){
SHM.register('fun.bind2',function($){
	/**
	 * ����ԭ����չ
	 * stan | chaoliang@staff.sina.com.cn
	 * @param {Object} object
	 */
	Function.prototype.bind2 = function(object) {
		var __method = this;
		return function() {
		   return __method.apply(object, arguments);
		};
	};
	return function(fFunc, object) {
		var __method = fFunc;
		return function() {
			return __method.apply(object, arguments);
		};
	};

});
SHM.register('io.jsonp', function($) {
	/**
	 * jsonp
	 * @param  {String}   url      url
	 * @param  {String}   params   params
	 * @param  {Function||String} callback �ص���������fixΪtrueʱ��Ҫ��Ϊ�����������ַ���
	 * @param  {Boolean}   fix      �Ƿ�Ҫ�ص��̶�������Ĭ��ΪΪfalse����dpc=1ʱΪtrue
	 */
	return function(url, params, cb, fix) {
		var head = document.getElementsByTagName('head')[0];
		var idStr = url + '&' + params;
		var ojs = $.dom.byId(idStr);
		ojs && head.removeChild(ojs);
		var fun = '';
		var js = $.C('script');
		fix = fix || false;
		if (fix) {
			if (typeof cb == 'string') {
				fun = cb;
			}
		} else {
			//���ʱ���
			url = url + ((url.indexOf('?') == -1) ? '?' : '&') + '_t=' + Math.random();
			//��ӻص�
			if (typeof cb == 'function') {
				fun = 'fun_' + new Date().getUTCMilliseconds() + ('' + Math.random()).substring(3);
				eval(fun + '=function(res){cb(res)}');
			}
		}
		url = url + '&callback=' + fun;
		//��Ӳ���,�������dpc=1һ��������
		url = url + '&' + params;
		js.src = url;
		js.id = idStr;
		js.type = 'text/javascript';
		js.language = 'javascript';
		head.appendChild(js);

	};
});
SHM.register('io.ajax',function($){
	//TODO
		/**
		 * ���� XMLHttpRequest ����
		 */
	return {
		createRequest:function() {
			var request = null;
			try {
				request = new XMLHttpRequest();
			} catch (trymicrosoft) {
				try {
					request = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (othermicrosoft) {
					try {
						request = ActiveXObject("Microsoft.XMLHTTP");
					} catch (failed) {}
				}
			}
			if(request == null){
				throw ("<b>create request failed</b>", {'html':true});
			}
			else {
				return request;
			}
		},
		/**
		 * �����������
		 *
		 * @param url ��ѡ�������������ݵ�URL����һ�� URL �ַ�������֧������
		 * @param option ��ѡ���� {
		 *  onComplete  : Function (Array responsedData),
		 *  onException : Function (),
		 *  returnType : "txt"/"xml"/"json", ������������
		 *  GET : {}, ͨ�� GET �ύ������
		 *  POST : {} ͨ�� POST �ύ������
		 * }
		 */
		request : function (url, option) {
			option = option || {};
			option.onComplete = option.onComplete || function () {};
			option.onException = option.onException || function () {};
			option.onTimeout = option.onTimeout || function () {};
			option.timeout = option.timeout? option.timeout: -1;
			option.returnType = option.returnType || "txt";
			option.method = option.method || "get";
			option.data = option.data || {};
			if(typeof option.GET != "undefined" && typeof option.GET.url_random != "undefined" && option.GET.url_random == 0){
				this.rand = false;
				option.GET.url_random = null;
			}
			this.loadData(url, option);
		},
		/**
		 * ����ָ������
		 * @param {Object} url
		 * @param {Object} option
		 */
		loadData: function (url, option) {
			var request = this.createRequest(), tmpArr = [];
			var _url = new $.util.url(url);

			var timer;
			// �������Ҫ POST �����ݣ���������
			if(option.POST){
				for (var postkey in option.POST) {
					var postvalue = option.POST[postkey];
					if(postvalue != null){
						tmpArr.push(postkey + '=' + $.str.encodeDoubleByte(postvalue));
					}
				}
			}
			var sParameter = tmpArr.join("&") || "";
			// GET ��ʽ�ύ�����ݶ������ַ��
			if (option.GET) {
				for(var key in option.GET){
					if (key != "url_random") {
						_url.setParam(key, $.str.encodeDoubleByte(option.GET[key]));
					}
				}
			}
			if (this.rand != false) {
				// �ӿ����������
				_url.setParam("rnd", Math.random());
			}

			if (option.timeout > -1) {
				timer = setTimeout(option.onTimeout, option.timeout);
			}

			// ����ص�
			request.onreadystatechange = function() {
				if(request.readyState == 4){
					var response, type = option.returnType;
					try{
						// �������ͷ��ز�ͬ����Ӧ
						switch (type){
							case "txt":
								response = request.responseText;
								break;
							case "xml":
								if (Core.Base.detect.$IE) {
									response = request.responseXML;
								}
								else {
									var Dparser = new DOMParser();
									response = Dparser.parseFromString(request.responseText, "text/xml");
								}
								break;
							case "json":
									response = eval("(" + request.responseText + ")");
								break;
						}
						option.onComplete(response);
						clearTimeout(timer);
					}
					catch(e){
						option.onException(e.message, _url);
						return false;
					}
				}
			};
			try{
				// ��������
				if(option.POST){
					request.open("POST", _url, true);
					request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					request.send(sParameter);
				}
				else {
					request.open("GET", _url, true);
					request.send(null);
				}
			}
			catch(e){
				option.onException(e.message, _url);
				return false;
			}
		}
	};

});
SHM.register('io.ijax',function($){
	return {
			/**
			 * ���滺��������б�
			 */
			arrTaskLists : [],
			/**
			 * ���� iframe �ڵ������������ݣ���Ϊ֧��˫�̣߳�ͬʱ�������������� DOM ��������
			 */
			createLoadingIframe: function () {
				if(this.loadFrames != null){
					return false;
				}
				/**
				 * ������� ID ����֤�ύ����ǰҳ������ݽ��� iframe
				 * L.Ming | liming1@staff.sina.com.cn 2009-01-11
				 */
				var rndId1 = "loadingIframe_thread" + Math.ceil(Math.random() * 10000);
				var rndId2 = "loadingIframe_thread" + Math.ceil((Math.random() + 1) * 10000);
				this.loadFrames = [rndId1, rndId2];

				var iframeSrc = '';
				if($globalInfo.ua.isIE6){
					// ie6 ��ҳ�����iframeҳ��������document.domain�������Ǻ͵�ǰ������ͬ���Ǹ�������һ����Ϊ����
					iframeSrc = "javascript:void((function(){document.open();document.domain='sina.com.cn';document.close()})())";
				}
			    var html = '<iframe id="' + rndId1 +'" name="' + rndId1 +'" class="invisible"\
			              scrolling="no" src=""\
			              allowTransparency="true" style="display:none;" frameborder="0"\
			              ><\/iframe>\
						  <iframe id="' + rndId2 +'" name="' + rndId2 +'" class="invisible"\
			              scrolling="no" src="'+iframeSrc+'"\
			              allowTransparency="true" style="display:none;" frameborder="0"\
			              ><\/iframe>';
			    //Sina.dom.addHTML(document.body, html); ��ʱ�滻
				var oIjaxIframeCnt = $.C("div");
				oIjaxIframeCnt.id = "ijax_iframes";

				oIjaxIframeCnt.innerHTML = html;
				//$Debug("���� Ijax ��Ҫ�� iframe");
				document.body.appendChild(oIjaxIframeCnt);
				// ��¼���� iframe ��������Ĭ���ǿ���״̬

				var loadTimer = setInterval($.fun.bind2(function(){
					if($.E(this.loadFrames[0]) != null && $.E(this.loadFrames[1]) != null){
						clearInterval(loadTimer);
						loadTimer = null;
						this.loadingIframe = {
							"thread1" : {
								"container" : $.E(this.loadFrames[0]),
								"isBusy" : false
							},
							"thread2" : {
								"container" : $.E(this.loadFrames[1]),
								"isBusy" : false
							}
						};
						this.loadByList();
					}
				}, this), 10);
			},
			/**
			 * �ж��Ƿ���Կ�ʼ�������ݣ����������� iframe �ڵ���õ������
			 */
			isIjaxReady: function () {
				if(typeof this.loadingIframe == "undefined"){
					return false;
				}
				for(var oLoadCnt in this.loadingIframe){
					if(this.loadingIframe[oLoadCnt].isBusy == false){
						this.loadingIframe[oLoadCnt].isBusy = true;
						return this.loadingIframe[oLoadCnt];
					}
				}
				return false;
			},
			/**
			 * ���������������
			 *
			 * @param url ��ѡ�������������ݵ�URL����һ�� URL �ַ�������֧������
			 * @param option ��ѡ���� {
			 *  onComplete  : Function (Array responsedData),
			 *  onException : Function ();
			 *  GET : {}, ͨ�� GET �ύ������
			 *  POST : {} ͨ�� POST �ύ������
			 * }
			 */
			request: function (url, option) {
				var oTask = {};
				oTask.url = url;
				oTask.option = option || {};
				this.arrTaskLists.push(oTask);
				if(this.loadFrames == null){
					this.createLoadingIframe();
				}
				else{
					this.loadByList();
				}
			},
			/**
			 * �����б����
			 */
			loadByList: function () {
				// ����ȴ��б�Ϊ�գ�����ֹ����
				if (this.arrTaskLists.length == 0) {
					// ���½��� iframe
					return false;
				}
				// ȡ��������������״̬�����Ƿ��п��е�
				var loadStatus = this.isIjaxReady();
				if(loadStatus == false){
					return false;
				}
				var newData = this.arrTaskLists[0];
				this.loadData(newData.url, newData.option, loadStatus);
				// ɾ���б��һ��
				this.arrTaskLists.shift();
			},
			/**
			 * ���ص�������
			 */
			loadData: function (url, option, loader) {
				var _url = new $.util.url(url);
				if (option.GET) {
					for(var key in option.GET){
						_url.setParam(key, Core.String.encodeDoubleByte(option.GET[key]));
					}
				}
				// �ӿ����� Domain
				//_url.setParam("domain", "1");
				// �ӿ����������
				//modified by stan | chaoliang@staff.sina.com.cn
				//���ٲ���Ҫ��ǿ�Ƹ�������
				//_url.setParam("rnd", Math.random());
				_url = _url.toString();
				// ��ǰ���ڼ������ݵ� iframe ����
				var ifm = loader.container;
				ifm.listener = $.fun.bind2(function () {
					if(option.onComplete||option.onException){
						try{
							var iframeObject = ifm.contentWindow.document, sResult;
							// ��ʱ����
							var tArea = iframeObject.getElementsByTagName( 'textarea')[0];
							if (typeof tArea != "undefined") {
								sResult = tArea.value;
							}
							else {
								sResult = iframeObject.body.innerHTML;
							}
							if(option.onComplete){
								option.onComplete(sResult);
							}
							else{
								option.onException();
							}
						}
						catch(e){
							if(option.onException){
								option.onException(e.message, _url.toString());
							}
						}
					}
					loader.isBusy = false;
					$.evt.removeEvent(ifm,"load",ifm.listener);
					this.loadByList();
				},this);

				$.evt.addEvent(ifm,"load", ifm.listener);

				// �����Ҫ post ����
				if(option.POST){
					var oIjaxForm = $.C("form");
					oIjaxForm.id = "IjaxForm";
					oIjaxForm.action = _url;
					oIjaxForm.method = "post";
					oIjaxForm.target = ifm.id;
					for(var oItem in option.POST) {
						var oInput = $.C("input");
						oInput.type = "hidden";
						oInput.name = oItem;
						//oInput.value = $.str.encodeDoubleByte(option.POST[oItem]);
						//encodeDoubleByte����encodeURIComponent�����gbk�ַ�ת��utf-8�������
						oInput.value = option.POST[oItem];
						oIjaxForm.appendChild(oInput);
					};
					document.body.appendChild(oIjaxForm);
					try{
						oIjaxForm.submit();
					}catch(e){

					}
				}
				else{
					try{
						window.frames(ifm.id).location.href = _url;
					}catch(e){
						ifm.src = _url;
					};
				}
			}
	};
});
SHM.register('io.jsload',function($){
	JsLoad = {};
	(function () {
		function createScripts (oOpts, oCFG) {

			processUrl(oOpts, oCFG);

			var urls = oOpts.urls;
			var i, len = urls.length;
			for(i = 0; i < len; i ++ ) {
				var js = $.C("script");
				js.src = urls[i].url;
				//js.charset = urls[i].charset;
				/*js[$globalInfo.ua.isIE ? "onreadystatechange" : "onload"] = function(){
					if ($globalInfo.ua.isMOZ || this.readyState.toLowerCase() == 'complete' || this.readyState.toLowerCase() == 'loaded') {*/
				js[document.all ? "onreadystatechange" : "onload"] = function() {
					if (/gecko/.test(navigator.userAgent.toLowerCase()) || this.readyState.toLowerCase() == "complete" || this.readyState.toLowerCase() == "loaded") {
						oCFG.script_loaded_num ++;
					}
				};
				document.getElementsByTagName("head")[0].appendChild(js);
			}
		}

		function processUrl(oOpts, oCFG) {
			var urls = oOpts.urls;
			var get_hash = oOpts.GET;

			var i, len = urls.length;
			var key, url_cls,varname,jsvar, rnd;
			for (i = 0; i < len; i++) {
				rnd =  parseInt(Math.random() * 100000000);
				url_cls = new $.util.url(urls[i].url);

				varname = url_cls.getParam("varname") || "requestId_" + rnd;
				if (oOpts.noreturn != true) {
					url_cls.setParam("varname", varname);
				}
				oCFG.script_var_arr.push(varname);

				// jsvar = url_cls.getParam("jsvar") || "requestId_" + rnd;
				// varname = url_cls.getParam('varname') || 'jsvar';
				// if (oOpts.noreturn != true) {
				// 	url_cls.setParam(varname, jsvar);
				// }
				// oCFG.script_var_arr.push(jsvar);

				for(key in get_hash) {
					if(oOpts.noencode == true) {
						url_cls.setParam(key, get_hash[key]);
					}
					else {
						url_cls.setParam(key, $.str.encodeDoubleByte(get_hash[key]));
					}
				}

				urls[i].url = url_cls.toString();
				urls[i].charset = urls[i].charset || oOpts.charset;
			}
		}

		function ancestor (aUrls, oOpts) {

			var _opts = {
				urls: [],
				charset: "utf-8",
				noreturn: false,
				noencode: true,
				timeout: -1,
				POST: {},
				GET: {},
				onComplete: null,
				onException: null
			};

			var _cfg = {
				script_loaded_num: 0,
				is_timeout: false,
				is_loadcomplete: false,
				script_var_arr: []
			};

			_opts.urls = typeof aUrls == "string"? [{url: aUrls}]: aUrls;

			$.util.parseParam(_opts, oOpts);

			createScripts(_opts, _cfg);

			// ��ʱ���������
			(function () {

				if(_opts.noreturn == true && _opts.onComplete == null)return;
				var i, data = [];
				// ȫ�����
				if (_cfg.script_loaded_num == _opts.urls.length) {
					_cfg.is_loadcomplete = true;
					if (_opts.onComplete != null) {
						for(i = 0; i < _cfg.script_var_arr.length; i ++ ) {
							data.push(window[_cfg.script_var_arr[i]]);
						}
						if(_cfg.script_var_arr.length < 2) {
							_opts.onComplete(data[0]);
						}
						else {
							_opts.onComplete(data);
						}
					}
					return;
				}
				// �ﵽ��ʱ
				if(_cfg.is_timeout == true) {
					return;
				}
				setTimeout(arguments.callee, 50);
			})();

			// ��ʱ����
			if(_opts.timeout > 0) {
				setTimeout(function () {
					if (_cfg.is_loadcomplete != true) {
						if (_opts.onException != null) {
							_opts.onException();
						}
						_cfg.is_timeout = true;
					}
				}, _opts.timeout);
			}
		}

		JsLoad.request = function (aUrls, oOpts) {
			new ancestor(aUrls, oOpts);
		};

	})();
	return JsLoad;
});
SHM.register('util.hideContainer', function($) {
	var tempDiv, create = function() {
			if(!tempDiv) {
				tempDiv = $.C("div");
				tempDiv.style.cssText = "position:absolute;top:-9999px;left:-9999px;";
				document.getElementsByTagName("head")[0].appendChild(tempDiv);
			}
		},
		Obj = {
			appendChild: function(node) {
				if($.dom.isNode(node)) {
					create();
					tempDiv.appendChild(node);
				}
			},
			removeChild: function(node) {
				$.dom.isNode(node) && tempDiv && tempDiv.removeChild(node);
			}
		};
	return Obj;
});
SHM.register('io.cssLoader', function($) {
	var files = {};
	return function(url, id, cb) {
		cb = cb || function() {};
		var isLoaded = function(url, cb) {
				var file = files[url] || (files[url] = {
					loaded: false,
					list: []
				});
				if(file.loaded) {
					cb(url);
					return false
				}
				file.list.push(cb);
				return file.list.length > 1 ? false : true;
			},
			loaded = function(url) {
				var list = files[url].list;
				for(var i = 0; i < list.length; i++){
					list[i](url);
				}
				files[url].loaded = true;
				delete files[url].list;
			};
		if( isLoaded(url, cb)) {
			var link = $.C("link");
			link.setAttribute("rel", "Stylesheet");
			link.setAttribute("type", "text/css");
			link.setAttribute("charset", "utf-8");
			link.setAttribute("href", url);
			document.getElementsByTagName("head")[0].appendChild(link);
			var wrap = $.C("div");
			wrap.id = id;
			$.util.hideContainer.appendChild(wrap);
			var timeout = 3e3,
				checkLoaded = function() {
					if(parseInt($.dom.getStyle(wrap, 'height')) == 42) {
						$.util.hideContainer.removeChild(wrap);
						loaded(url);
					} else if(--timeout > 0) {
						setTimeout(checkLoaded, 10);
					} else {
						$.util.hideContainer.removeChild(wrap);
						delete files[url]
					}
				};
			setTimeout(checkLoaded, 50);
		}
	}
});
/**
 * Cross-domain POST using window.postMessage()
 */
SHM.register('io.html5Ijax', function($) {
    var _add = $.evt.addEvent,
        _remove = $.evt.removeEvent,

        NOOP = function() {},
        RE_URL = /^http\s?\:\/\/[a-z\d\-\.]+/i,
        ID_PREFIX = 'ijax-html5-iframe-',

        /**
         * Message sender class
         */
        MsgSender = function(cfg) {
            cfg = cfg || {};
            this.init(cfg);
        };
        MsgSender.prototype = {
        	ready: false,

        	init: function(cfg) {
        	    if (this.ready) {
        	        return;
        	    }
        	    var self = this,
        	        iframeId, iframeHtml, iframe, loaded, receiver,
        	        proxyUrl = cfg.proxyUrl,
        	        datas = {};
        	    self.onsuccess = cfg.onsuccess || NOOP;
        	    self.onfailure = cfg.onfailure || NOOP;
        	    if (!proxyUrl) {
        	        return;
        	    }

        	    receiver = function(e) {
        	        if (!self.ready || e.origin !== self.target) {
        	        	self.destroy();
        	            return;
        	        }
        	        var ret = e.data;
        	        if (!ret || ret === 'failure') {
        	        	self.destroy();
        	            self.onfailure && self.onfailure();
        	        } else {
        	            self.onsuccess && self.onsuccess(e.data);
        	            self.destroy()
        	        }
        	    };
        	    _add(window, 'message', receiver);

        	    // insert an iframe
        	    iframeId = ID_PREFIX+Date.parse(new Date());
        	    iframeHtml = '<iframe id="' + iframeId + '" name="' + iframeId +
        	        '" src="' + proxyUrl + '" frameborder="0" ' +
        	        'style="width:0;height:0;display:none;"></iframe>';
        	    var oIjaxIframeCnt = $.C("div");
        	    oIjaxIframeCnt.id = ID_PREFIX+"iframes";
        	    oIjaxIframeCnt.innerHTML = iframeHtml;
        	    // document.body.appendChild(oIjaxIframeCnt);
        	    iframe = oIjaxIframeCnt.childNodes[0];
        	    loaded = function() {
        	        self.ready = true;
        	        var src = iframe.src,
        	            matched = src.match(RE_URL);
        	        self.target = (matched && matched[0]) || '*';
        	    };
        	    _add(iframe, 'load', loaded);
        	    document.body.insertBefore(iframe, document.body.firstChild);

        	    self._iframe = iframe;
        	    self._iframeLoaded = loaded;
        	    self._receiver = receiver;
        	},

        	send: function(cfg) {
        	    cfg = cfg || {};
        	    var self = this,
        	        url = cfg.url,
        	        data = cfg.data,
        	        onsuccess = cfg.onsuccess,
        	        onfailure = cfg.onfailure;

        	    if (!url || typeof url !== 'string') {
        	        return;
        	    }
        	    if (onsuccess) {
        	        self.onsuccess = onsuccess;
        	    }
        	    if (onfailure) {
        	        self.onfailure = onfailure;
        	    }

        	    if (!self.ready) {
        	        setTimeout(function() {
        	            self.send(cfg);
        	        }, 50);
        	        return;
        	    }

        	    if (data) {
        	        data += '&_url=' + window.encodeURIComponent(url);
        	    } else {
        	        data = '_url=' + window.encodeURIComponent(url);
        	    }
        	    self._iframe.contentWindow.postMessage(data, self.target);
        	},

        	destroy: function() {
        	    var iframe = this._iframe;
        	    _remove(iframe, 'load', this._iframeLoaded);
        	    iframe.parentNode.removeChild(iframe);
        	    _remove(window, 'message', this._receiver);
        	    this._iframe = null;
        	    this._iframeLoaded = null;
        	    this._receiver = null;
        	}
        };

    return MsgSender;
});
SHM.register('clz.extend',function($){
	return  function(target,source,deep) {
		for (var property in source) {
			target[property] = source[property];
		}
		return target;
	// 	target = target || {};
	// 	var sType = typeof source, i = 1, options;
	// 	if(sType === 'undefined' || sType === 'boolean') {
	// 		deep = sType === 'boolean' ? source : false;
	// 		source = target;
	// 		target = this;
	// 	}
	// 	if( typeof source !== 'object' && Object.prototype.toString.call(source) !== '[object Function]') {
	// 		source = {};
	// 	}
	// 	while(i <= 2) {
	// 		options = i === 1 ? target : source;
	// 		if(options !== null) {
	// 			for(var name in options ) {
	// 				var src = target[name], copy = options[name];
	// 				if(target === copy){
	// 					continue;
	// 				}
	// 				if(deep && copy && typeof copy === 'object' && !copy.nodeType){
	// 					target[name] = this.extend(src || (copy.length !== null ? [] : {}), copy, deep);
	// 				}else if(copy !== undefined){
	// 					target[name] = copy;
	// 				}
	// 			}
	// 		}
	// 		i++;
	// 	}
	// 	return target;
	}
});
SHM.register('util.cookie',function($){
	/**
	 * ��ȡcookie,ע��cookie�����в��ô���ֵ��ַ�����������ʽ������Ԫ�ַ��У�Ŀǰ .[]$ �ǰ�ȫ�ġ�
	 * @param {Object} cookie������
	 * @return {String} cookie��ֵ
	 * @example
	 * var value = co.getCookie(name);
	 */
	var co={};
	co.getCookie = function (name) {
		name = name.replace(/([\.\[\]$])/g,'\$1');
		var rep = new RegExp(name + '=([^;]*)?;','i');
		var co = document.cookie + ';';
		var res = co.match(rep);
		if (res) {
			return unescape(res[1]) || "";
		}
		else {
			return "";
		}
	};

	/**
	 * ����cookie
	 * @param {String} name cookie��
	 * @param {String} value cookieֵ
	 * @param {Number} expire Cookie��Ч�ڣ���λ��Сʱ
	 * @param {String} path ·��
	 * @param {String} domain ��
	 * @param {Boolean} secure ��ȫcookie
	 * @example
	 * co.setCookie('name','sina',null,"")
	 */
	co.setCookie = function (name, value, expire, path, domain, secure) {
			var cstr = [];
			cstr.push(name + '=' + escape(value));
			if(expire){
				var dd = new Date();
				var expires = dd.getTime() + expire * 3600000;
				dd.setTime(expires);
				cstr.push('expires=' + dd.toGMTString());
			}
			if (path) {
				cstr.push('path=' + path);
			}
			if (domain) {
				cstr.push('domain=' + domain);
			}
			if (secure) {
				cstr.push(secure);
			}
			document.cookie = cstr.join(';');
	};

	/**
	 * ɾ��cookie
	 * @param {String} name cookie��
	 */
	co.deleteCookie = function(name) {
			document.cookie = name + '=;' + 'expires=Fri, 31 Dec 1999 23:59:59 GMT;';
	};
	return co;
});
SHM.register('util.parseParam',function($){
	return function (oSource, oParams) {
		var key;
		try {
			if (typeof oParams != "undefined") {
				for (key in oSource) {
					if (oParams[key] != null) {
						oSource[key] = oParams[key];
					}
				}
			}
		}
		finally {
			key = null;
			return oSource;
		}
	};
});
SHM.register('util.byteLength',function($){
	 return function(str){
		if(typeof str == "undefined"){
			return 0;
		}
		var aMatch = str.match(/[^\x00-\x80]/g);
		return (str.length + (!aMatch ? 0 : aMatch.length));
	};
});
SHM.register('util.url',function($){
	Url = function (url){
	    url = url || "";
	    this.url = url;
		this.query = {};
		this.parse();
	};

	Url.prototype = {
		/**
		 * ����URL��ע�����ê������ڽ���GET����֮ǰ������ê��Ӱ��GET�����Ľ���
		 * @param{String} url? �������������򽫻Ḳ�ǳ�ʼ��ʱ�Ĵ����url ��
		 */
		parse : function (url){
			if (url) {
				this.url = url;
			}
		    this.parseAnchor();
		    this.parseParam();
		},
		/**
		 * ����ê�� #anchor
		 */
		parseAnchor : function (){
		    var anchor = this.url.match(/\#(.*)/);
		    anchor = anchor ? anchor[1] : null;
		    this._anchor = anchor;
		    if (anchor != null){
		      this.anchor = this.getNameValuePair(anchor);
		      this.url = this.url.replace(/\#.*/,"");
		    }
		},

		/**
		 * ����GET���� ?name=value;
		 */
		parseParam : function (){
		    var query = this.url.match(/\?([^\?]*)/);
		    query = query ? query[1] : null;
		    if (query != null){
		      this.url = this.url.replace(/\?([^\?]*)/,"");
		      this.query = this.getNameValuePair(query);
		    }
		 },
		/**
		 * Ŀǰ��json��ʽ��value ��֧��
		 * @param {String} str Ϊֵ����ʽ,����value֧�� '1,2,3'���ŷָ�
		 * @return ����str�ķ����������
		 */
		getNameValuePair : function (str){
		    var o = {};
		    str.replace(/([^&=]*)(?:\=([^&]*))?/gim, function (w, n, v) {
		     	if(n == ""){return;}
		      	//v = v || "";//alert(v)
		     	//o[n] = ((/[a-z\d]+(,[a-z\d]+)*/.test(v)) || (/^[\u00ff-\ufffe,]+$/.test(v)) || v=="") ? v : (v.j2o() ? v.j2o() : v);
		    	o[n] = v || "";
			});
		    return o;
		 },
		 /**
		  * �� URL �л�ȡָ��������ֵ
		  * @param {Object} sPara
		  */
		 getParam : function (sPara) {
		 	return this.query[sPara] || "";
		 },
		/**
		 * ���URLʵ����GET�������
		 */
		clearParam : function (){
		    this.query = {};
		},

		/**
		 * ����GET����Ĳ�������������
		 * @param {String} name ������
		 * @param {String} value ����ֵ
		 */
		setParam : function (name, value) {
		    if (name == null || name == "" || typeof(name) != "string") {
				throw new Error("no param name set");
			}
		    this.query = this.query || {};
		    this.query[name]=value;
		},

		/**
		 * ���ö��������ע����������Ǹ���ʽ�ģ����������֮ǰ�����в���������֮��URL.query��ָ��o��������duplicate��o����
		 * @param {Object} o �������������Զ�����ΪURLʵ����GET����
		 */
		setParams : function (o){
		    this.query = o;
		},

		/**
		 * ���л�һ������Ϊֵ�Ե���ʽ
		 * @param {Object} o �����л��Ķ���ע�⣬ֻ֧��һ����ȣ���ά�Ķ������ƹ�������ʵ��
		 * @return {String} ���л�֮��ı�׼��ֵ����ʽ��String
		 */
		serialize : function (o){
			var ar = [];
			for (var i in o){
			    if (o[i] == null || o[i] == "") {
					ar.push(i + "=");
				}else{
					ar.push(i + "=" + o[i]);
				}
			}
			return ar.join("&");
		},
		/**
		 * ��URL����ת����Ϊ��׼��URL��ַ
		 * @return {String} URL��ַ
		 */
		toString : function (){
		    var queryStr = this.serialize(this.query);
		    return this.url + (queryStr.length > 0 ? "?" + queryStr : "")
		                    + (this.anchor ? "#" + this.serialize(this.anchor) : "");
		},

		/**
		 * �õ�anchor�Ĵ�
		 * @param {Boolean} forceSharp ǿ�ƴ�#����
		 * @return {String} êanchor�Ĵ�
		 */
		getHashStr : function (forceSharp){
		    return this.anchor ? "#" + this.serialize(this.anchor) : (forceSharp ? "#" : "");
		}
	};
	return Url;
});
/**
 * ģ��
 * @param  {Object} $ SHM
 */
SHM.register('util.template',function($){
	return function(template, data,isDecode){
	    return template.replace(/#\{(.+?)\}/ig, function(){
	        var key = arguments[1].replace(/\s/ig, '');
	        var ret = arguments[0];
	        var list = key.split('||');
	        for (var i = 0, len = list.length; i < len; i += 1) {
	            if (/^default:.*$/.test(list[i])) {
	                ret = isDecode?decodeURIComponent(list[i].replace(/^default:/, '')):list[i].replace(/^default:/, '');
	                break;
	            }
	            else
	                if (data[list[i]] !== undefined) {
	                    ret =isDecode?decodeURIComponent(data[list[i]]):data[list[i]];
	                    break;
	                }
	        }
	        return ret;
	    });
	};
});
/**
 *	log,����̨
 * @param  {Object} $ SHM
 */
SHM.register('app.log',function($){
	// var trace = (location.href.indexOf('log=1') !=-1);
	var trace = false;
	return function() {
		if (!trace) return;
		if (typeof console == 'undefined') return;
		var slice = Array.prototype.slice;
		var args = slice.call(arguments, 0);
		args.unshift("* SHM.app.log >>>>>>");
		try{
			console.log.apply(console, args);
		}catch(e){
			console.log(args);
		}

	};
});
/**
 * ���֣�����ȫ��
 * @param  {Object} $ SHM
 */
SHM.register('app.strLeft',function($){
	return function (s, n) {
		var ELLIPSIS = '...';
		var s2 = s.slice(0, n),
			i = s2.replace(/[^\x00-\xff]/g, "**").length,
			j = s.length,
			k = s2.length;
		//if (i <= n) return s2;
		if(i<n){
			return s2;
		}else if(i==n){
			//ԭ������
			if(n==j||k==j){
				return s2;
			}else{
				return s.slice(0,n-2)+ELLIPSIS;
			}
		}
		//����
		i -= s2.length;
		switch (i) {
			case 0: return s2;
			case n:
				var s4;
				if(n==j){
					s4 = s.slice(0, (n>>1)-1);
					return s4+ELLIPSIS;
				}else{
					s4 = s.slice(0, n>>1);
					return s4;
				}
			default:
				var k = n - i,
					s3 = s.slice(k, n),
					j = s3.replace(/[\x00-\xff]/g, "").length;
				return j ? s.slice(0, k) + arguments.callee(s3, j) : s.slice(0, k);
		}
	};

});
SHM.register('app.strLeft2',function($){
	var byteLen = $.util.byteLength
	return function(str,len){
		var s = str.replace(/\*/g, " ").replace(/[^\x00-\xff]/g, "**");
		str = str.slice(0, s.slice(0, len).replace(/\*\*/g, " ").replace(/\*/g, "").length);
		if(byteLen(str) > len) str = str.slice(0,str.length -1);
		return str;
	};

});
SHM.register('app.splitNum',function($){
	//ǧ��λ
	return function(num){
		num = num+"";
		var re=/(-?\d+)(\d{3})/
		while(re.test(num))
		{
		num=num.replace(re,"$1,$2")
		}
		return num;
	}
});

 SHM.register('app.placeholder',function($){
 	$globalInfo.supportPlaceholder = 'placeholder' in document.createElement('input');
 	return function(inputs){
 			function p(input){
 				//���input�����ڻ���֧��placeholder,����
 				if(!input||$globalInfo.supportPlaceholder){
 			        return;
 				}
 				//�Ѿ���ʼ����hasPlaceholderΪ1
 				var hasPlaceholder = input.getAttribute('hasPlaceholder')||0;
 				if(hasPlaceholder=='1'){
 					return;
 				}
 				var toggleTip = function(){
 					defaultValue = input.defaultValue;
 					$.dom.addClass(input,'gray');
 					input.value = text;
 					input.onfocus = function(){
 					    if(input.value === defaultValue || input.value === text){
 					        this.value = '';
 					        $.dom.removeClass(input,'gray');
 					    }
 					}
 					input.onblur = function(){
 					    if(input.value === ''){
 					        this.value = text;
 					        $.dom.addClass(input,'gray');
 					    }
 					}
 				};
 				var simulateTip = function(){
 					var pwdPlaceholder = $.C('input');
 					pwdPlaceholder.type='text';
 					pwdPlaceholder.className = 'pwd_placeholder gray '+input.className;
 					pwdPlaceholder.value=text;
 					pwdPlaceholder.autocomplete = 'off';
 					input.style.display='none';
 		            input.parentNode.appendChild(pwdPlaceholder);
 		            pwdPlaceholder.onfocus = function(){
 		                pwdPlaceholder.style.display = 'none';
 		                input.style.display = '';
 		                input.focus();
 		            }
 		            input.onblur = function(){
 		                if(input.value === ''){
 		                    pwdPlaceholder.style.display='';
 		                    input.style.display='none';
 		                }
 		            }
 				}
 				//���û��placeholder����û��placeholderֵ������
 				var text = input.getAttribute('placeholder');
 				if(!text){
 					//ie10 �µ�ie7 �޷���input.getAttribute('placeholder')ȡ��placeholderֵ����֣�
 					if(input.attributes&&input.attributes.placeholder){
 						text=input.attributes.placeholder.value;
 					}
 				}
 				var tagName = input.tagName;
 				if(tagName=='INPUT'){
 					var inputType = input.type;
 					if(inputType == 'password'&&text){
 						simulateTip();
 					}else if(inputType=='text'&&text){
 						toggleTip();
 					}
 				}else if(tagName=='TEXTAREA'){
 					toggleTip();
 				}
 				input.setAttribute('hasPlaceholder','1');
 			}
 			for (var i = inputs.length - 1; i >= 0; i--) {
 				var input = inputs[i]
 				p(input);
 			};
 		};

 });

SHM.register('app.uaTrack', function($) {
	var prefix = 'index_new_';
	window.SHMUATrack = function(key,val,hasPrefix){
		if(typeof _S_uaTrack == 'function'){
			hasPrefix = hasPrefix||true;
			var key = hasPrefix?prefix+key:key;
			try{
				_S_uaTrack(key, val);
			}catch(e){}
		}
	};
	return SHMUATrack;
});
SHM.register("app.simSelect", function($) {
	var byId = $.dom.byId,
		addEvent = $.evt.addEvent,
		removeEvent = $.evt.removeEvent,
		uatrack = $.app.uaTrack;

	var	sim_select = function(o,more) {
			o = byId(o);
			o.style.display = 'none';
			var opts = o.options,
				parent = o.parentNode,
				self = this;
			self.more = more;
			self.isShow = false;
			self.div = $.C('div');
			self.lineDiv = $.C('div');
			self.tmpDiv = $.C('div');
			self.ul = $.C('ul');
			self.h3 = $.C('h3');
			self.div.className = 'sim-select clearfix';
			parent.replaceChild(self.div, o);
			self.div.appendChild(o);
			self.h3.innerHTML = opts[o.selectedIndex].innerHTML;
			for (var i = 0,
			l = o.length; i < l; i++) {
				var li = $.C('li');
				li.innerHTML = opts[i].innerHTML;
				self.ul.appendChild(li);
				li.onmouseover = function() {
					this.className += ' over'
				};
				li.onmouseout = function() {
					this.className = this.className.replace(/over/gi, '')
				};
				li.onclick = (function(i) {
					return function() {
						self.hide();
						self.h3.innerHTML = this.innerHTML;
						o.selectedIndex = i;
						if (o.onchange) {
							o.onchange();
						}
						if(!self.more) {
							uatrack('search','search_list_click');
						}
					}
				})(i);
			};
			//��Ӹ���ѡ��
			if(!self.more){
				var li = $.C('li');
				li.innerHTML = '<a href="http://search.sina.com.cn/?c=more" target="_blank">\u66f4\u591a&gt;&gt;</a>';
				li.onmouseover = function() {
					this.className += ' over';
				};
				li.onmouseout = function() {
					this.className = this.className.replace(/over/gi, '');
				};
				self.ul.appendChild(li);
			}
			self.tmpDiv.className = 'sim-ul-flt';
			self.tmpDiv.style.display = 'none';
			self.tmpDiv.innerHTML = '<div class="sim-ul-bg"></div>';
			self.tmpDiv.appendChild(self.ul);
			self.lineDiv.className = 'v-line';
			self.div.appendChild(self.h3);
			self.div.appendChild(self.lineDiv);
			self.div.appendChild(self.tmpDiv);
			self.tmpDiv.style.top = self.h3.offsetHeight + 'px';
			self.tmpDiv.style.width = (self.h3.offsetWidth > 2 ? (self.h3.offsetWidth - 2) : self.h3.offsetWidth) + 'px';
			self.init()
		};

	sim_select.prototype = {
		init: function() {
			var self = this;
			addEvent(document.documentElement, 'click',function(e) {
				self.close(e)
			});
			this.h3.onclick = function() {
				self.toggles()
			}
		},
		show: function() {
			this.tmpDiv.style.display = 'block';
			this.tmpDiv.style.visibility = 'visible';
			this.isShow = true;
			if(!this.more) {
				uatrack('search','search_list_show');
			}

		},
		hide: function() {
			this.tmpDiv.style.display = 'none';
			this.tmpDiv.style.visibility = 'hidden';
			this.isShow = false
		},
		close: function(e) {
			var t = window.event ? window.event.srcElement : e.target;
			do {
				if (t == this.div) {
					return
				} else if (t == document.documentElement) {
					this.hide();
					return
				} else {
					t = t.parentNode;
					if (!t) {
					    break;
					}
				}
			} while (t.parentNode)
		},
		toggles: function() {
			this.isShow ? this.hide() : this.show()
		}
	};

	return sim_select;

});
SHM.register('app.getTextareaData',function($){
	var byAttr = $.dom.byAttr;
	var rendered = '__hasTARendered__';
	var name = 'data-textarea';
	return function(ele,render){
		render = render||false;
		if(!ele){
			return '';
		}
		if(typeof ele[rendered]=='undefined')
		var textarea = byAttr(ele,'node-type',name)[0];
		if(!textarea){
			return '';
		}
		var val = textarea.value;
		if(render){
			var temp = $.C('div');
			var par = textarea.parentNode;
			temp.className = name+'-wrap';
			temp.innerHTML = val;
			var imgs = temp.getElementsByTagName('img');
			if(imgs&&imgs.length>0){
				for (var i = imgs.length - 1; i >= 0; i--) {
					var img = imgs[i];
					var src = img.getAttribute('data-src');
					if(src){
						img.src=src;
						img.removeAttribute('data-src');
					}
				};
			}
			par.insertBefore(temp, textarea);
			par.removeChild(textarea);
		}
		ele[rendered] = true;
		return val;
	};
});
SHM.register('app.tab', function($) {
	var inArray = $.arr.inArray;
	var dom = $.dom;
	var docbody = null;
	var byAttr = dom.byAttr;
	var queryToJson = $.json.queryToJson;
	var hasClass = dom.hasClass;
	var addClass = dom.addClass;
	var removeClass = dom.removeClass;
	var attrName = 'tab-type';
	var eventType = 'mouseover';
	var dlgevt = null;
	var o = {};
	var hasTouch = (typeof(window.ontouchstart) !== 'undefined');
	if(hasTouch){
		eventType = 'touchstart';
	}
	var byTabAttr = function(wrap,arrValue){
		var wraps = byAttr(wrap,attrName,'tab-wrap');
		var eles = byAttr(wrap, attrName, arrValue);
		var elesFilted = [];
		var elesInWraps = [];
		if(wraps.length!=0){
			//��ȡ����������ѡ�����
			for (var i = wraps.length - 1; i >= 0; i--) {
				var wrap = wraps[i];
				var items = byAttr(wrap, attrName, arrValue);
				elesInWraps = elesInWraps.concat(items);
			};
			//���˵�����ѡ�����
			for (var i = eles.length - 1; i >= 0; i--) {
				var item = eles[i];
				if(inArray(item,elesInWraps)){
					eles.splice(i,1);
					// delete eles[i];
				}
			};
		}
		return eles;

	};
	var getParent = function(ele,attr,val){
		var par = ele.parentNode;
		if(!par){
			return docbody;
		}
		if(par == docbody||par.getAttribute(attr)==val){
			return par;
		}else{
			return arguments.callee(par,attr,val);
		}
	};
	var getTextareaData = function(ele){
		if(ele){
			var textarea = ele.getElementsByTagName();
		}
	};
	var touchInfo={};
	var bindEventIOS = function(){
		if(!hasTouch){
			return;
		}
		if(typeof(window.ontouchstart) === 'undefined'){
			return;
		}
		var setOpacity = function(ele, opacity) {
			if (typeof(ele.style.opacity) != 'undefined') {
				ele.style.opacity = opacity;
			} else {
				ele.style.filter = 'Alpha(Opacity=' + (opacity * 100) + ')';
			}
		};
		var show = function(ele, time) {
			setOpacity(ele, 0);
			if (!time) {
				time = 40;
			};
			var opacity = 0,
				step = time / 20;
			clearTimeout(ele._showTimeOutId_);
			ele._showTimeOutId_ = setTimeout(function() {
				if (opacity >= 1) {
					return;
				};
				opacity += 1 / step;
				setOpacity(ele, opacity);
				ele._showTimeOutId_ = setTimeout(arguments.callee, 20);
			}, 20)
		};
		var getCurI = function(i,len,direction){
			if(direction=='prev'){
				i = i-1;
				if(i<0){
					i=len-1;
				}
			}else{
				i = i+1;
				if(i==len){
					i=0;
				}

			}
			return i;
		};
		var move = function(ele,direction){
			var clz = 'selected';
			var name = 'tab';

			var wrap = getParent(ele,attrName,'tab-wrap');
			if(!wrap){
				wrap = docbody;
			}
			var data = queryToJson(wrap.getAttribute('tab-data') || '');
			if(data){
				clz = data.clz||clz;
				name = data.name||name;
			}
			// var navs = byAttr(wrap, attrName, name+'-nav');
			// var conts = byAttr(wrap, attrName, name+'-cont');
			var navs = byTabAttr(wrap, name+'-nav');
			var conts = byTabAttr(wrap, name+'-cont');
			if(navs.length!=conts.length){
				return;
			}
			for (var i = 0,len = conts.length;i<len; i++) {
				var nav = navs[i];
				var cont = conts[i];
				if(cont==ele){
					var _index = getCurI(i,len,direction);
					var _nav = navs[_index];
					//��������ǩ����ʾ����ô�Ͳ��л�
					if(_nav&&_nav.style.display=='none'){
						break;
					}
					removeClass(nav,clz);
					if(cont){
						cont.style.display = 'none';
					}
					addClass(_nav,clz);
					var _cont = conts[_index];
					if(_cont){
						$.app.getTextareaData(_cont,true);
						_cont.style.display = '';
						show(_cont,200);
					}
				}
			};
		};
		dlgevt.add('tab-cont', 'touchstart', function(e){
			touchstart(e);
		});
		dlgevt.add('tab-cont', 'touchmove', function(e){
			touchmove(e);
			// $.evt.preventDefault(e.evt);
		});
		dlgevt.add('tab-cont', 'touchend', function(e){
			touchend(e);
		});
		touchInfo.iPadStatus = 'ok';
		var touchstart = function(e){
			touchInfo.iPadX = e.evt.touches[0].pageX;
			touchInfo.iPadScrollX = window.pageXOffset;
			touchInfo.iPadScrollY = window.pageYOffset; //�����ж�ҳ���Ƿ����
		};
		var touchend = function(e){
			if(touchInfo.iPadStatus != 'touch'){return};
			touchInfo.iPadStatus = 'ok';
			//self._state = 'ready';
			var cX = touchInfo.iPadX - touchInfo.iPadLastX;
			if(cX<0){
				move(e.el,'prev');
			}else{
				move(e.el,'next');
			};
		};
		var touchmove = function(e){
			if(e.evt.touches.length > 1){ //��㴥��
				touchend(e);
			};
			touchInfo.iPadLastX = e.evt.touches[0].pageX;
			var cX = touchInfo.iPadX - touchInfo.iPadLastX;
			if(touchInfo.iPadStatus == 'ok'){
				if(touchInfo.iPadScrollY == window.pageYOffset && touchInfo.iPadScrollX == window.pageXOffset && Math.abs(cX)>20){ //������
					touchInfo.iPadStatus = 'touch';
				}else{
					return;
				};
			};
		};

	};
	o.switchByEle = function(ele){
		if(!ele){
			return;
		}
		var index = 0;
		var clz = 'selected';
		var name = 'tab';

		var wrap = getParent(ele,attrName,'tab-wrap');
		if(!wrap){
			wrap = docbody;
		}
		var data = queryToJson(wrap.getAttribute('tab-data') || '');
		if(data){
			clz = data.clz||clz;
			name = data.name||name;
		}
		// var navs = byAttr(wrap, attrName, name+'-nav');
		// var conts = byAttr(wrap, attrName, name+'-cont');
		var navs = byTabAttr(wrap, name+'-nav');
		var conts = byTabAttr(wrap, name+'-cont');
		if(navs.length!=conts.length){
			return;
		}
		for (var i = 0,len = navs.length;i<len; i++) {
			var nav = navs[i];
			var cont = conts[i];
			if(hasClass(nav,clz)){
				removeClass(nav,clz);
				if(cont){
					cont.style.display = 'none';
				}
			}
			if(nav==ele||cont==ele){
				index = i;
				addClass(nav,clz);
				if(cont){
					$.app.getTextareaData(cont,true);
					cont.style.display = '';
				}
			}
		};
	};
	o.init = function(){
		docbody = document.body;
		dlgevt = $.evt.delegatedEvent(docbody,null,attrName);
		bindEventIOS();

		dlgevt.add('tab-nav', eventType, function(e){

			$.evt.preventDefault(e.evt);
			var ele = e.el;
			o.switchByEle(ele);

		});
	};
	return o;
});

SHM.register('home.app.getSguid', function($) {
	var cookie = $.util.cookie;
	var md5 = (function(){var hex_chr = "0123456789abcdef"; var str, j; function rhex(num) {var str = ""; for(j = 0; j <= 3; j++) str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) + hex_chr.charAt((num >> (j * 8)) & 0x0F); return str; } function str2blks_MD5(str) {var nblk = ((str.length + 8) >> 6) + 1; var blks = new Array(nblk * 16); var i; for(i = 0; i < nblk * 16; i++) blks[i] = 0; for(i = 0; i < str.length; i++) blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8); blks[i >> 2] |= 0x80 << ((i % 4) * 8); blks[nblk * 16 - 2] = str.length * 8; return blks; } function add(x, y) {var lsw = (x & 0xFFFF) + (y & 0xFFFF); var msw = (x >> 16) + (y >> 16) + (lsw >> 16); return (msw << 16) | (lsw & 0xFFFF); } function rol(num, cnt) {return (num << cnt) | (num >>> (32 - cnt)); } function cmn(q, a, b, x, s, t) {return add(rol(add(add(a, q), add(x, t)), s), b); } function ff(a, b, c, d, x, s, t) {return cmn((b & c) | ((~b) & d), a, b, x, s, t); } function gg(a, b, c, d, x, s, t) {return cmn((b & d) | (c & (~d)), a, b, x, s, t); } function hh(a, b, c, d, x, s, t) {return cmn(b ^ c ^ d, a, b, x, s, t); } function ii(a, b, c, d, x, s, t) {return cmn(c ^ (b | (~d)), a, b, x, s, t); } function calcMD5(str) {var x = str2blks_MD5(str); var a =  1732584193; var b = -271733879; var c = -1732584194; var d =  271733878; var olda, oldb, oldc, oldd, i; for(i = 0; i < x.length; i += 16) {olda = a; oldb = b; oldc = c; oldd = d; a = ff(a, b, c, d, x[i+ 0], 7 , -680876936); d = ff(d, a, b, c, x[i+ 1], 12, -389564586); c = ff(c, d, a, b, x[i+ 2], 17,  606105819); b = ff(b, c, d, a, x[i+ 3], 22, -1044525330); a = ff(a, b, c, d, x[i+ 4], 7 , -176418897); d = ff(d, a, b, c, x[i+ 5], 12,  1200080426); c = ff(c, d, a, b, x[i+ 6], 17, -1473231341); b = ff(b, c, d, a, x[i+ 7], 22, -45705983); a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416); d = ff(d, a, b, c, x[i+ 9], 12, -1958414417); c = ff(c, d, a, b, x[i+10], 17, -42063); b = ff(b, c, d, a, x[i+11], 22, -1990404162); a = ff(a, b, c, d, x[i+12], 7 ,  1804603682); d = ff(d, a, b, c, x[i+13], 12, -40341101); c = ff(c, d, a, b, x[i+14], 17, -1502002290); b = ff(b, c, d, a, x[i+15], 22,  1236535329); a = gg(a, b, c, d, x[i+ 1], 5 , -165796510); d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632); c = gg(c, d, a, b, x[i+11], 14,  643717713); b = gg(b, c, d, a, x[i+ 0], 20, -373897302); a = gg(a, b, c, d, x[i+ 5], 5 , -701558691); d = gg(d, a, b, c, x[i+10], 9 ,  38016083); c = gg(c, d, a, b, x[i+15], 14, -660478335); b = gg(b, c, d, a, x[i+ 4], 20, -405537848); a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438); d = gg(d, a, b, c, x[i+14], 9 , -1019803690); c = gg(c, d, a, b, x[i+ 3], 14, -187363961); b = gg(b, c, d, a, x[i+ 8], 20,  1163531501); a = gg(a, b, c, d, x[i+13], 5 , -1444681467); d = gg(d, a, b, c, x[i+ 2], 9 , -51403784); c = gg(c, d, a, b, x[i+ 7], 14,  1735328473); b = gg(b, c, d, a, x[i+12], 20, -1926607734); a = hh(a, b, c, d, x[i+ 5], 4 , -378558); d = hh(d, a, b, c, x[i+ 8], 11, -2022574463); c = hh(c, d, a, b, x[i+11], 16,  1839030562); b = hh(b, c, d, a, x[i+14], 23, -35309556); a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060); d = hh(d, a, b, c, x[i+ 4], 11,  1272893353); c = hh(c, d, a, b, x[i+ 7], 16, -155497632); b = hh(b, c, d, a, x[i+10], 23, -1094730640); a = hh(a, b, c, d, x[i+13], 4 ,  681279174); d = hh(d, a, b, c, x[i+ 0], 11, -358537222); c = hh(c, d, a, b, x[i+ 3], 16, -722521979); b = hh(b, c, d, a, x[i+ 6], 23,  76029189); a = hh(a, b, c, d, x[i+ 9], 4 , -640364487); d = hh(d, a, b, c, x[i+12], 11, -421815835); c = hh(c, d, a, b, x[i+15], 16,  530742520); b = hh(b, c, d, a, x[i+ 2], 23, -995338651); a = ii(a, b, c, d, x[i+ 0], 6 , -198630844); d = ii(d, a, b, c, x[i+ 7], 10,  1126891415); c = ii(c, d, a, b, x[i+14], 15, -1416354905); b = ii(b, c, d, a, x[i+ 5], 21, -57434055); a = ii(a, b, c, d, x[i+12], 6 ,  1700485571); d = ii(d, a, b, c, x[i+ 3], 10, -1894986606); c = ii(c, d, a, b, x[i+10], 15, -1051523); b = ii(b, c, d, a, x[i+ 1], 21, -2054922799); a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359); d = ii(d, a, b, c, x[i+15], 10, -30611744); c = ii(c, d, a, b, x[i+ 6], 15, -1560198380); b = ii(b, c, d, a, x[i+13], 21,  1309151649); a = ii(a, b, c, d, x[i+ 4], 6 , -145523070); d = ii(d, a, b, c, x[i+11], 10, -1120210379); c = ii(c, d, a, b, x[i+ 2], 15,  718787259); b = ii(b, c, d, a, x[i+ 9], 21, -343485551); a = add(a, olda); b = add(b, oldb); c = add(c, oldc); d = add(d, oldd); } return rhex(a) + rhex(b) + rhex(c) + rhex(d); } return calcMD5; })();
	// ���cookie�Ƿ���guid��guid�Ϸ���
	var isVaild = function(guid){
	      guid = parseInt(guid||'0');
	      if(guid<=0){
	            return false;
	      }
	      return true;
	};
	// �����µ�guid
	var genGuid = function(){
	      return Math.abs((new Date()).getTime()) + '_' + md5(Math.random().toString()).substring(0,8);
	};
	return function(){
		var guid = cookie.getCookie('SGUID');
		// �Ƿ�guid��Ҫ�������ɣ����洢��cookie��
		if(!isVaild(guid)){
		      guid = genGuid();
		      // 5��
		      cookie.setCookie('SGUID', guid, 43800, '/', 'sina.com.cn');
		}
		return guid;
	};

});

SHM.register('home.app.localData',function($){
	var localData = {
         hname:location.hostname?location.hostname:'localStatus',
         isSessionStorage:window.sessionStorage?true:false,
         dataDom:null,

         initDom:function(){ //��ʼ��userData
             if(!this.dataDom){
                 try{
                     this.dataDom = document.createElement('input');//����ʹ��hidden��inputԪ��
                     this.dataDom.type = 'hidden';
                     this.dataDom.style.display = "none";
                     this.dataDom.addBehavior('#default#userData');//����userData���﷨
                     document.body.appendChild(this.dataDom);
                     var exDate = new Date();
					 exDate.setTime(exDate.getTime()+129600);
                     this.dataDom.expires = exDate.toUTCString();//�趨����ʱ��
                 }catch(ex){
                     return false;
                 }
             }
             return true;
         },
         set:function(key,value){
             if(this.isSessionStorage){
                 window.sessionStorage.setItem(key,value);
             }else{
                 if(this.initDom()){ 
                     this.dataDom.load(this.hname);
                     this.dataDom.setAttribute(key,value);
                     this.dataDom.save(this.hname);
                 }
             }
         },
         get:function(key){
             if(this.isSessionStorage){
                 return window.sessionStorage.getItem(key);
             }else{
                 if(this.initDom()){
                     this.dataDom.load(this.hname);
                     return this.dataDom.getAttribute(key);
                 }
             }
         },
         remove:function(key){
             if(this.isSessionStorage){
                 sessionStorage.removeItem(key);
             }else{
                 if(this.initDom()){
                     this.dataDom.load(this.hname);
                     this.dataDom.removeAttribute(key);
                     this.dataDom.save(this.hname)
                 }
             }
         }
     }
	 return localData;
});

SHM.register('home.blkLike.setLogGif',function($) {

	var unique = (function () {
        var time= (new Date()).getTime()+'-', i=0;
        return function () {
           return time + (i++);
        }
    })();

    return function (vid,uid,homeId,coord) {

        var data = window['imgLogData'] || (window['imgLogData'] = {});
        var img = new Image();
        var _t = unique();
        uid = uid || '';
        vid = vid || '';
        img.onload = img.onerror = function () {//����һЩ����

            img.onload = img.onerror = null;
            img = null;
            delete data[uid];
        }
		var imgSrc = 'http://slog.sina.com.cn/a.gif?type=home_blkLike&homeId='+homeId+'&coord='+coord+'&vid=' + vid + '&uid='+ uid + '&_t=' + _t;
        img.src = imgSrc;
    };

});

SHM.register('home.blkLike.setStyle',function($) {
  var newStyle = [];
  function appendStyle (css) {
      var style = document.createElement('style');
      style.type = 'text/css';
      try {
          style.appendChild(document.createTextNode(css));
      } catch (__err__) {
          if (style.styleSheet) {
              try {
                  oldCss = style.styleSheet.cssText;
              } catch( __err__) {
                  oldCss = '';
              }
              style.styleSheet.cssText = oldCss + css;
          } else {}
      }
      document.getElementsByTagName('head')[0].appendChild(style);
  }
  function loadStyle(s,id) {
    var doc = document;
    var sDom = doc.createElement("style");
    sDom.id = id;
    sDom.type = "text/css";
    sDom.styleSheet ? (sDom.styleSheet.cssText = s) : sDom.appendChild(doc.createTextNode(s));
    doc.getElementsByTagName("head")[0].appendChild(sDom);
    return sDom;
  }

  newStyle.push('.side-btns-wrap{width:50px;right:10px;position: fixed; _position:absolute;bottom: 170px;z-index:100;}')
  newStyle.push('.blkLike_btn{ width:50px; height:50px; padding-top:5px;float: right;}')
  newStyle.push('.blkLike_btn table{ border-spacing:0;}')
	newStyle.push('.blkLike_btn a{ width:40px; padding:0 5px; height:50px; font-size:14px; background:#a6a6a6; text-align:center;font-family:"΢���ź�"; display:block;}')
	newStyle.push('.blkLike_btn a td{ text-align:center;vertical-align:middle;height:50px;width:40px; color:#f6f6f6; cursor:pointer;}')
	newStyle.push('.blkLike_btn a:hover{  text-decoration:none;background: #808080;}')
  newStyle.push('.blkLike_btn a:active, .blkLike_btn a:focus{text-decoration:none;}')
	newStyle.push('.blkLike_btn a:hover td{color:#fff;}')
  newStyle.push('.top_btn,.weibo_btn,.cmnt_btn{width:50px;height:50px;position: static;margin:0;margin-top:5px;float:right;}')
  newStyle.push('.top_btn .toplink {height: 50px;width: 50px;background: url("http://i0.sinaimg.cn/cj/deco/2013/0524/images/fin_0506_mqm_sidebar.png") 0 -60px no-repeat;overflow: hidden;display: block;text-indent: -999em;}')
  newStyle.push('.top_btn .toplink:hover {background-position: -60px -60px;}')

  newStyle = newStyle.join('\n ');
  //loadStyle(newStyle,env.CSS_ID);
  appendStyle(newStyle);
});

SHM.register('home.app.viewData',function(){
	return function(){
		var W=0, H=0, SL=0, ST=0, SW=0, SH=0;
		var w=window, d=document, dd=d.documentElement;
		W=dd.clientWidth||d.body.clientWidth;
		H=w.innerHeight||dd.clientHeight||d.body.clientHeight;
		ST=d.body.scrollTop||dd.scrollTop||w.pageYOffset;
		SL=d.body.scrollLeft||dd.scrollLeft||w.pageXOffset;
		SW=Math.max(d.body.scrollWidth, dd.scrollWidth ||0);
		SH=Math.max(d.body.scrollHeight,dd.scrollHeight||0, H);
		return {
			"scrollTop":ST,
			"scrollLeft":SL,
			"documentWidth":SW,
			"documentHeight":SH,
			"viewWidth":W,
			"viewHeight":H
		};
	}

});

SHM.register('home.blkLike.interestCollection',function($) {

	var byId 		= $.dom.byId,
		byClass 	= $.dom.byClass,
		addClass	= $.dom.addClass,
		removeClass = $.dom.removeClass,
		hasClass 	= $.dom.hasClass,
		addEvent 	= $.evt.addEvent,
		dldEvt    	= $.evt.delegatedEvent,
		extend 		= $.clz.extend,
		unTrack 	= $.app.uaTrack,
		getXY 		= $.dom.getXY,
		byAttr 		= $.dom.byAttr,
    tab       = $.app.tab
		W 			= window,
		D 			= document,
		getSguid 	= $.home.app.getSguid,
		viewData	= $.home.app.viewData,
		DIV 		= D.createElement('DIV'),
		tml 		= '<div class="top_btn" id="SI_Totop_Btn"><a class="toplink" href="javascript:;" title="���ض���" style="">TOP</a></div>';
		//tml+= '<div id="top_btn_close" style="width: 50px;height: 18px;margin-top:1px;background: url(http://i3.sinaimg.cn/dy/deco/2013/0913/close2.png) no-repeat;float:right;cursor:pointer;"><a href="javascript:void(0)" title="�ر�" suda-uatrack="key=finance_index_up_to_top&value=finance_index_close" style="display:block;width:50px;height:18px;"></a></div>';

    tab.init();

  var cAdd = $.evt.custEvent.add;
	var cRemove = $.evt.custEvent.remove;

  var thisHomeId = '10003';

	var fn_rightBtn = function(data){

		DIV.className = 'side-btns-wrap';
		DIV.setAttribute('id','SI_Sidebtns_Wrap');

		DIV.innerHTML = tml;
		D.getElementsByTagName('BODY')[0].appendChild(DIV);

		var wrap = byId('SI_Sidebtns_Wrap');
		var btn = byId('SI_Totop_Btn');
		var close_btn = byId("top_btn_close");
		var isIE6 = $globalInfo.ua.isIE6;

		var resetBtnLeft = function() {
		//var mLeft = parseInt(SHM.dom.getWinSize().width);
		var mLeft = parseInt(viewData().viewWidth);
//			mLeft < 1100 ? (wrap.style.marginLeft = (mLeft/2 - wrap.offsetWidth - 25) + 'px') : (wrap.style.marginLeft = '505px');
			mLeft < 1100 ? (wrap.style.display = "none") : (wrap.style.display = "block");
		};
		resetBtnLeft();
		addEvent(W,'resize',function(){
			resetBtnLeft();
		});

		addEvent(W,'scroll',function(){
      btnShow()
		});
		addEvent(btn,'click',function(){
			D.documentElement.scrollTop = 0;
			D.body.scrollTop = 0;
			unTrack('to_top','to_top');
		});

		 var cookie = (function() {
		var co = {};
		co.getCookie = function(name) {
			name = name.replace(/([\.\[\]$])/g, '\$1');
			var rep = new RegExp(name + '=([^;]*)?;', 'i');
			var co = document.cookie + ';';
			var res = co.match(rep);
			if (res) {
				return unescape(res[1]) || "";
			} else {
				return "";
			}
		};
		co.setCookie = function(name, value, expire, path, domain, secure) {
			var cstr = [];
			cstr.push(name + '=' + escape(value));
			if (expire) {
				var dd = new Date();
				var expires = dd.getTime() + expire * 3600000;
				dd.setTime(expires);
				cstr.push('expires=' + dd.toGMTString());
			}
			if (path) {
				cstr.push('path=' + path);
			}
			if (domain) {
				cstr.push('domain=' + domain);
			}
			if (secure) {
				cstr.push(secure);
			}
			document.cookie = cstr.join(';');
		};
		co.deleteCookie = function(name) {
			document.cookie = name + '=;' + 'expires=Fri, 31 Dec 1999 23:59:59 GMT;';
		};
		return co;
	})();

	   var cookieName = "close_finance_index_top_btn";
	   	var display = cookie.getCookie(cookieName);
		if (display != '') {
			wrap.style.visibility='hidden';
		}
		addEvent(close_btn, 'click',
		function(e) {
			wrap.style.visibility='hidden';
			cookie.setCookie(cookieName, '1', 15 * 24, '/', "finance.sina.com.cn");
			if (window.event) {
				window.event.returnValue = false;
			} else {
				e.preventDefault();
			}
		});

		function btnShow(){
			var top = W.pageYOffset || D.documentElement.scrollTop || D.body.scrollTop;
			if(top>0){
				btn.style.display="block";
				btn.style.visibility="visible";
			}
			if(top<=0)
				btn.style.visibility = 'hidden';
			if(isIE6) {
				var WHeight = wrap.offsetHeight || 250;
				var wh = W.innerHeight || D.documentElement.clientHeight || D.body.clientHeight;
				wrap.style.top = (top + wh - WHeight - 170) + 'px';
			}
		}

		setLikeName()
		btnShow()
		function setLikeName(){
			var _thisTitle = [];

			if(data && data.length){

				for(var i = 0; i < data.length; i++){

				  if(byAttr(D,'data-sudaclick',data[i])[0] ) {

            _thisTitle[i] = byAttr(D,'data-sudaclick',data[i])[0].getAttribute('blktitle') || '';
            var oNewBox = document.createElement('div')
            oNewBox.className  = 'blkLike_btn';
            oNewBox.innerHTML = '<a href="javascript:;" suda-uatrack="key=index_div_way&value=click" action-type="getBlk" action-data="blk='+data[i]+'"><table><tr><td style="">'+_thisTitle[i]+'</td></tr></a>';
            DIV.insertBefore(oNewBox,btn)

          }
				}
			}

		}

	}

	var fn_getBlkData = function(){

		var localData = $.home.app.localData;
    var user_info = sinaSSOController.get51UCCookie();

		if(user_info){
			getBlkLikeList('blkLike_login', user_info.uid == localData.get('login_UID'))
		}else{
			getBlkLikeList('blkLike_logout',true)
		}

		function getBlkLikeList(localName,checkUp){

			if((localData.get(localName) || localData.get(localName) !== null) && checkUp){
        if(localData.get(localName)){
          fn_rightBtn(localData.get(localName).split(','))
        }else{
          fn_rightBtn()
        }

			}else{
        var over_time = true;
        var timer_out = null;
				$.io.jsonp('http://interest.mix.sina.com.cn/api/customize/get_click?homeId='+thisHomeId,'',function(msg){
					var dataList = msg.result.order;

          if(msg.result.status.code == 0){
            clearTimeout(timer_out)
            over_time = false;
            localData.set(localName,dataList.join(','))
            if(user_info){
              localData.set('login_UID',user_info.uid)
            }

            fn_rightBtn(msg.result.order);
          }else{
            fn_rightBtn()
          }

				})

        timer_out = setTimeout(function(){

          if(over_time){
            try{
              _S_uaTrack('index_div_way', 'timeout');
            }catch(e){}
          }

        },5000)
			}
		}

	}

	var fn_setLogGif = function(){
		var oMainTabType 	= dldEvt( document.getElementsByTagName('body')[0],'','blkclick'),
			setLogGif		= $.home.blkLike.setLogGif,
			cookie			= $.util.cookie,
			_thisVid 		= '',
			_thisUid 		= '',
			_newGuid 		= getSguid();
		oMainTabType.add('auto_nav','click',function(o){

			var getUid = function(guid){
				if(sinaSSOController.get51UCCookie()){
					_thisUid = guid + ',' + sinaSSOController.get51UCCookie().uid;
				}else{
					_thisUid = guid+',';
				}
			}

			if(cookie.getCookie('SGUID')){

        	getUid(cookie.getCookie('SGUID'))
			}else{

          cookie.setCookie('SGUID',_newGuid,43800,'/','sina.com.cn');
          getUid(_newGuid)
			}
			_thisCoord =getXY(o.el)[0]+','+getXY(o.el)[1];

			var sudaValue  = o.el.getAttribute('data-sudaclick');
			_thisVid = sudaValue;

			setLogGif(_thisVid,_thisUid,thisHomeId,_thisCoord)
		});

	};

  $.dom.ready(function(){
    sinaSSOController&&sinaSSOController.autoLogin(function(){
      fn_getBlkData();
    });

    fn_setLogGif();
  });

});