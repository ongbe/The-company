var http = require("http");

// Utility function that downloads a URL and invokes
// callback with the data.
function download(url, callback) {
  http.get(url, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function() {
      callback(data);
    });
  }).on("error", function() {
    callback(null);
  });
}

var cheerio = require("cheerio");
var fs =require('fs');
var arrs =[];//让arrs数组存放一个月的所有日期；[1,2,3,4......,30,31]
for(var date=1;date<31;date++){
	arrs[date-1]=date;
}
arrs.forEach(function(date){
  	date = date<10 ? '0'+ date : date;
  	var url = "http://survey.finance.sina.com.cn/static/20205/201006"+date+".html?pid=20205&dpc=1";
  	download(url, function(data) {
		  if (data) {
			    //console.log(data);
			    var $ = cheerio.load(data);
			    var total =$(".fred").text();
			    total=total.replace(/\s+/g, '');
			    total=total.replace(/,/g,'');
			    total='\n'+'2010-06-'+date+','+total;
			    fs.appendFile('./number.txt',total,'utf-8',function(err){
			        if(err) {throw err;}
			    });

			    var numArrs=$("div[class='d d-num']").text();
			    numArrs =numArrs.replace(/,/g,'');//把所有的逗号变为空(数字中间的逗号)
			    numArrs =numArrs.replace(/\s+/g, ',');//把所有的空字符串变为一个逗号(数字与数字之间变为逗号)
			    numArrs =numArrs.replace(/,$/gi, '');//去除最后一个逗号
			    fs.appendFile('./number.txt',numArrs,'utf-8',function(err){            
			        if(err) {throw err;}
			    });
			    console.log("done");
			  }
			  else console.log("error");  
		});
});

/*for(var date=1;date<32;date++){
	(function(date){
		date = date<10 ? '0'+ date : date;
		var url = "http://survey.finance.sina.com.cn/static/20205/201001"+date+".html?pid=20205&dpc=1";
		console.log(url);
		download(url, function(data) {
		  if (data) {
			    //console.log(data);
			    var $ = cheerio.load(data);
			    var total =$(".fred").text();
			    total=total.replace(/\s+/g, '');
			    total=total.replace(/,/g,'');
			    total='\n'+'2010-01-'+date+'\n'+total;
			    fs.appendFile('./number.txt',total,'utf-8',function(err){
			        if(err) {throw err;}
			    });
			    var numArrs=$("div[class='d d-num']").text();
			    numArrs =numArrs.replace(/,/g,'');//把所有的逗号变为空(数字中间的逗号)
			    numArrs =numArrs.replace(/\s+/g, ',');//把所有的空字符串变为一个逗号(数字与数字之间变为逗号)
			    numArrs =numArrs.replace(/,$/gi, '');//去除最后一个逗号
			    fs.appendFile('./number.txt',numArrs,'utf-8',function(err){            
			        if(err) {throw err;}
			    });

			    console.log("done");
			  }
			  else console.log("error");  
		});
	})(date);
	
}*/









