export function wxKefu() {
	// funtion(){
			var head = document.getElementsByTagName('head')[0];
				var link = document.createElement('link');
				    link.type='text/css';
				    link.rel = 'stylesheet';
				    link.href ='http://cs365.bak365.net/assets/css/index/cgwl_online.css';
				    head.appendChild(link);
	
				var cgwl ={
				     visiter_id:'',
				     visiter_name:'',
				     avatar:'',
				     product:'',
				     open:function(){
				        var d =document.getElementById('wolive-box');
				        if(!d){
				          var div =document.createElement('div');
				          div.id ='cgwl-kefu';
				          div.className +='cgwl-form';
				          document.body.appendChild(div);
				          var w =document.getElementById('cgwl-kefu');
				          w.innerHTML=' <i class="cgwl-icon"></i><p class="cgwl-item" onclick="this.blank(0)" >在线咨询</p>';
				        }
	
				     },
				     blank:function(groupid){
	
	
				      var web =encodeURI('http://cs365.bak365.net/index/index/home?visiter_id=&visiter_name=&avatar=&business_id=1&groupid=0&special=1');
	
				      var moblieweb = encodeURI('http://cs365.bak365.net/mobile/index/home?visiter_id='+this.visiter_id+'&visiter_name='+this.visiter_name+'&avatar='+this.avatar+'&business_id=1&groupid='+groupid+'&product='+this.product);
	
				       if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
				         window.open(moblieweb); 
				       }else{
				         window.open(web); 
				       }
				     },
				}
	
				window.onload = cgwl.open();       
		// }
}

// export default {
// 	funtion(){
// 		var head = document.getElementsByTagName('head')[0];
// 			var link = document.createElement('link');
// 			    link.type='text/css';
// 			    link.rel = 'stylesheet';
// 			    link.href ='http://cs365.bak365.net/assets/css/index/cgwl_online.css';
// 			    head.appendChild(link);

// 			var cgwl ={
// 			     visiter_id:'',
// 			     visiter_name:'',
// 			     avatar:'',
// 			     product:'',
// 			     open:function(){
// 			        var d =document.getElementById('wolive-box');
// 			        if(!d){
// 			          var div =document.createElement('div');
// 			          div.id ='cgwl-kefu';
// 			          div.className +='cgwl-form';
// 			          document.body.appendChild(div);
// 			          var w =document.getElementById('cgwl-kefu');
// 			          w.innerHTML=' <i class="cgwl-icon"></i><p class="cgwl-item" onclick="cgwl.blank(0)" >在线咨询</p>';
// 			        }

// 			     },
// 			     blank:function(groupid){


// 			      var web =encodeURI('http://cs365.bak365.net/index/index/home?visiter_id=&visiter_name=&avatar=&business_id=1&groupid=0&special=1');

// 			      var moblieweb = encodeURI('http://cs365.bak365.net/mobile/index/home?visiter_id='+this.visiter_id+'&visiter_name='+this.visiter_name+'&avatar='+this.avatar+'&business_id=1&groupid='+groupid+'&product='+this.product);

// 			       if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
// 			         window.open(moblieweb); 
// 			       }else{
// 			         window.open(web); 
// 			       }
// 			     },
// 			}

// 			window.onload = cgwl.open();       
// 	}
// }
