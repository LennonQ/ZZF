// JavaScript id DOM对象获取  
	function $ (id){
		return document.getElementById(id);
	}
// 获取cookie 
	var oncookie = {
	getCookie:function(){ 
		var cookie = {};
		var all = document.cookie;
		if(all === '') return cookie;
		var list = all.split('; ');
		for (var i = 0; i < list.length; i++){
			var item = list[i];
			var p = item.indexOf('=');
			var name = item.substring(0,p);
			name = decodeURIComponent(name);
			var value = item.substring(p + 1);
			value = decodeURIComponent(value);
			cookie[name] = value;
		}
		return cookie;
	},
	//  设置cookie
	setCookie:function(name,value,mins){
		if(name){
			mins = mins*24*60 || 10*24*60;
			var path = path || '/',domain;
			if(domain)
				domain = 'domain='+domain+'; ';
			var date = new Date();
			date.setTime(date.getTime()+(mins * 60 * 1000));
			var expires = '; expires=' + date.toGMTString();
			document.cookie = name + '=' + value + expires + '; ' + domain + 'path=' + path;
		}
	}
}
// 点击关闭提醒 
	function clickClose(){
		var atten = $('m-atte'),
			bclose = $('close');
		function closeClick(){
			var atten = $('m-atte');
			addClassName(atten,'hidden');
			oncookie.setCookie('close','close','365');
		}
		function close(elem){
			var cookies = oncookie.getCookie();
			if(cookies.close == 'close'){
				addClassName(elem,'hidden');
			}else{
				removeClassName(elem,'hidden');
			}
		}
		addEvent(bclose,'click',closeClick);
		close(atten);
	}	
// 关注按钮
	function show(){
		var cookies = oncookie.getCookie(),forms = $('m-form');
		if(cookies.loginSuc){
			forms.style.display = 'none';
			follow(cookies);
		}else{
			forms.style.display = 'block';
		}
	}
	function follow(c){
		var flwed = $('f-fed'),flw = $('f-btn');
		if(c.followSuc){
				flw.style.display = 'none';
				flwed.style.display = 'inline-block';
			}else{
				flw.style.display = 'inline-block';
				flwed.style.display = 'none';
			}
	}
var cookie = oncookie.getCookie();
clickClose();
follow(cookie);
// 验证登录
	function verify(){
		var forms = document.login,
			username = forms.userName.value,
			pswd = forms.password.value;
		username = md5(username);
		pswd = md5(pswd);
		var data = {'userName':username,'password':pswd};
		url = 'http://study.163.com/webDev/login.htm';
		get(url,data,login);
	}
	function login(value){
		if(value == 1){
			oncookie.setCookie('loginSuc','true',15);
			get('http://study.163.com/webDev/attention.htm',' ',function(a){
				if(a == 1){
					oncookie.setCookie('followSuc','true',15);
					$('f-btn').style.display = 'none';
					$('f-fed').style.display = 'inline-block';
				}
			});
			show();
		}else{
			alert('登录失败，请检查用户名或密码！');
		}
	}
// 轮播图
	// 淡入效果
		function fadein (ele) {
			var stepLength = 1/25 * 100;
			setOpacity(ele,0);
			var o = 0;
			function step () {
				if ( o +stepLength <= 100) {
					o += stepLength;
					setOpacity(ele,o);
				} else {
					o = 100;
					clearInterval(setIntervalId);
				}
			}
			var setIntervalId = setInterval(step, 20);
		}
	// 为轮播点点击触发事件
	function clickWrap (){
		var wrap = document.querySelector('.m-wrap');
			bnr = wrap.querySelector('.m-bnr');
			items = bnr.querySelectorAll('a');
			pointer = wrap.querySelector('.pointer');
			p_i = pointer.querySelectorAll('i'),
			num = 0;
		for (var i = 0; i <p_i.length; i++) {
			(function(i){
				addEvent(p_i[i],'click',function(event){
					for(var j=0;j< p_i.length;j++){
						removeClassName(p_i[j],'active');
						removeClassName(items[j],'active');
					}
					addClassName(p_i[i],'active');
					addClassName(items[i],'active');
					fadein(items[i]);
				})
			})(i);
		}
		function autoplay(wrap){
			var bnr = wrap.querySelector('.m-bnr').querySelectorAll('a');
			function step(){
                var index = (++num)%items.length,x = 0;
                for(var j=0;j< items.length;j++){
						removeClassName(p_i[j],'active');
						removeClassName(items[j],'active');
				}
                addClassName(items[index],'active');
                addClassName(p_i[index],'active');
                fadein(items[index]);
			}
			var timer = setInterval(step,4500);
			// 鼠标进入轮播图暂停动画。
			addEvent(wrap,'mouseover',function(event){
				clearInterval(timer);
			});
		}
		autoplay(wrap);
		// 鼠标离开轮播图开始动画。
		addEvent(wrap,'mouseout',function(event){
			autoplay(wrap);
		})
	}
	clickWrap();
// 获取课程数据
var setCoures = {
		url:'http://study.163.com/webDev/couresByCategory.htm',
		data:{'pageNo':1,'psize':20,'type':10},
		// 添加元素
		addElements:function(getdata){
			var _data = JSON.parse(getdata),li,div,img,h4,span,em,strong,h_div,h_img,h_i,h_em,h_span1,h_span2,h_p,elem;
			var pd = getElementsByClassName('m-pd')[0];
			var pl = getElementsByClassName('m-pl')[0];
			if(getComputedStyles(pd).display == 'block'){
				elem = pd;
			}else{
				elem = pl;
			}
			for(var i = 0;i<_data.list.length;i++){
				// 创建hover前的节点，展示节点
				li = document.createElement('li');
				div = document.createElement('div');
				img = document.createElement('img');
				h4 = document.createElement('h4');
				span = document.createElement('span');
				em = document.createElement('em');
				strong = document.createElement('strong');
				// 创建hover后的节点，隐藏节点
				h_div = document.createElement('div');
				_div = document.createElement('div');
				h_img = document.createElement('img');
				h_i = document.createElement('i');
				h_em = document.createElement('em');
				h_span1 = document.createElement('span');
				h_span2 = document.createElement('span');
				h_p = document.createElement('p');
				// 设置展示节点属性和内容
				li.setAttribute('class','m-card');
				div.setAttribute('class','card');
				img.setAttribute('src',_data.list[i].middlePhotoUrl);
				img.setAttribute('alt',_data.list[i].name);
				h4.innerHTML = _data.list[i].name;
				span.innerHTML = _data.list[i].provider;
				em.innerHTML = _data.list[i].learnerCount;
				if (_data.list[i].price == 0) {
					strong.innerHTML = '免费';
				}else {
					strong.innerHTML = '&yen;' + _data.list[i].price;
				}
				// 设置隐藏节点属性和内容
				h_div.setAttribute('class','hover');
				h_i.setAttribute('class', 'p-title')
				h_p.setAttribute('class','description');
				h_img.setAttribute('src',_data.list[i].bigPhotoUrl);
				h_img.setAttribute('alt',_data.list[i].name);
				h_i.innerHTML = _data.list[i].name;
				h_em.innerHTML = _data.list[i].learnerCount;
				h_span1.innerHTML = '发布者：'+ _data.list[i].provider;
				if(_data.list[i].categoryName == null){
					h_span2.innerHTML = '分类：无';
				}else {
					h_span2.innerHTML = '分类：'+ _data.list[i].categoryName;
				}
				h_p.innerHTML = _data.list[i].description;
				elem.appendChild(li);
				li.appendChild(div);
				div.appendChild(img);
				div.appendChild(h4);
				div.appendChild(span);
				div.appendChild(em);
				div.appendChild(strong);
				li.appendChild(h_div);
				h_div.appendChild(_div);
				_div.appendChild(h_img);
				_div.appendChild(h_i);
				_div.appendChild(h_em);
				_div.appendChild(h_span1);
				_div.appendChild(h_span2);
				h_div.appendChild(h_p);
				(function(div,h_div){
					addEvent(div,'mouseover',function(event){
						div.style.display = 'none';
						h_div.style.display = 'block';
					});
					addEvent(h_div,'mouseleave',function(event){
						h_div.style.display = 'none';
						div.style.display = 'block';
					});
				})(div,h_div);
			}
			var list = getElementsByClassName('m-card',elem),n=0;
		//固定定位布局课程列表
			 for (var i = 0; i < 5; i++) {
 				for (var j = 0; j < 4; j++) {
					list[n].style.left=j*240+"px";
					list[n].style.top=i*245+"px";
					n++;
					// if(n>list.length) break;
				};
			}
		}
}
var topCourse ={
	url:'http://study.163.com/webDev/hotcouresByCategory.htm',
	addElements:function(getdata){
		var _data = JSON.parse(getdata),div,li,img,a,span;
		var ul = $('t-list');
		for(var i=0;i<_data.length;i++){
			li=document.createElement('li');
			img=document.createElement('img');
			a=document.createElement('a');
			span=document.createElement('span');
			img.setAttribute('src',_data[i].smallPhotoUrl);
			a.innerHTML = _data[i].name;
			span.innerHTML = _data[i].learnerCount;
			ul.appendChild(li);
			li.appendChild(img);
			li.appendChild(a);
			li.appendChild(span);
		}
	}
}
get(setCoures.url,setCoures.data,setCoures.addElements);
get(topCourse.url,'',topCourse.addElements);
//自动更新
function rankUpdate(elem){
	var step = 7/25*10;
	var t = 0,x=0;
	function update(){
		if(x>=-68){
			x -= step;
			elem.style.top = t + x + 'px';
			if(t+x<-700){
				t = 0;
			}
		}else{
			clearInterval(updateRank);
		}
	}
	var updateRank = setInterval(update,20);
}
function upRank(){
	var ul = $('t-list');
	setInterval(function(){	
		rankUpdate(ul);
	},5000);
}
upRank();

// 分页选择
function selectPage(){
	var libtn = getElementsByClassName('l-btn')[0].getElementsByTagName('li');
	function type(){
		var pc = $('product-design'),
			style = getComputedStyles(pc).display;
		if(style == 'block'){
			return 10;
		}else {
			return 20;
		}
	}
	function estyle(){
		var pc = $('product-design'),pl = $('programing-language'),style = getComputedStyles(pc).display,elem;
		if(style == 'block'){
			return pc;
		}else {
			return pl;
		}
	}
	for(var i=0;i<libtn.length;i++){
		(function(i){
			if(i != 0 && i !=libtn.length-1){
				addEvent(libtn[i],'click',function(event){
					for(var j=0;j<libtn.length;j++){
						removeClassName(libtn[j],'checked');
					}
					addClassName(libtn[i],'checked');
					elem = estyle();
					elem.innerHTML = '';
					setCoures.data.pageNo = i;
					setCoures.data.type = type();
					get(setCoures.url,setCoures.data,setCoures.addElements);
				});
			}
		})(i);
	}
}
selectPage();
// 事件添加
	function addEvents(){
		var flw = $('f-btn'),
			closeF = $('l-close'),
			closeV = $('v-close'),
			lbtn = $('l-btn'),
			pvideo = getElementsByClassName('g-pop')[0],
			cvideo = $('m-video'),
			t_pc = $('pc'),
			t_pl = $('pl'),
			pc = $('product-design'),
			pl = $('programing-language');
		addEvent(flw,'click',show);
		// 关闭表单按钮。
		addEvent(closeF,'click',function(event){
			var forms = $('m-form');
			forms.style.display = 'none';
		});
		// 登录按钮点击事件
		addEvent(lbtn,'click',verify);
		// 点击弹出视频
		addEvent(cvideo,'click',function(event){
			pvideo.style.display = 'block';
		});
		// 关闭视频
		addEvent(closeV,'click',function(event){
			pvideo.style.display = 'none';
			video.pause();
		});
		addEvent(t_pc,'click',function(event){
			removeClassName(t_pl,'active');
			addClassName(t_pc,'active');
			pc.style.display = 'block';
			pl.style.display = 'none';
		});
		// 点击产品
		addEvent(t_pl,'click',function(event){
			removeClassName(t_pc,'active');
			addClassName(t_pl,'active');
			pc.style.display = 'none';
			pl.style.display = 'block';
			pl.innerHTML = ' ';
			setCoures.data.type = 20;
			get(setCoures.url,setCoures.data,setCoures.addElements);
		})
	}
addEvents();