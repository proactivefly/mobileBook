/* 2017/7/19 by ecstack */
(function(){
	// 声明内部类
	var Util=(function(){
		// 封装本地存储
		var prefix='html5_reader_';//预防key重叠
		var StorageGetter=function(key){
			return localStorage.getItem(prefix+key);
		};
		var StorageSetter=function(key,val){
			return localStorage.setItem(prefix+key,val);
		};
		var getJSONPCONTENT=function(url,callback){
			return $.jsonp({
						url:url,
						cache:true,
						callback:'duokan_fiction_chapter',
						success:function(result){
							// 数据64解码
							var data=$.base64.decode(resut);
							// 数据翻译成汉字（完全解码）
							var json=decodeURIComponent(escape(data));
							// 通过函数传递data数据,
							callback(data);
						}

					})
		}
		// 把方法暴露出来
		return {
			StorageGetter,
			StorageSetter,
			getJSONPCONTENT
		}
	})();
	// 缓存
	var Dom={
		top:$('#top'),
		footer:$('.footer'),
		lightSwitch:$('#light-switch'),
		setPanel:$('.set-panel'),
	};
	var Win=$(window);
	var Doc=$(document);
	// 整个项目的入口函数
	var LIGHT_ON_OFF=true;
	function main(){
		EventHandler();

	}
	// 实现todo数据交互
	function ReaderModel(){
		var getFictionInfo=function(callback){
			$.get('data/chapter.json',function(data){
				// 获得章节信息
				// 
				callback&&callback()
			},'json');
		};

		var getCurChapterContent=function(chapter_id,data){
			$.get('data/data'+chapter_id+'.json',function(){
				if(data.result===0){
					// 取得真实地址
					var url=data.jsonp;
					// 调用封装好的jsonp数据
					Util.getJSONPCONTENT(url,function(data){
						// 少了callback参数，用函数把数据传出去
						callback&&callback(data)
					})
				}
			},'json')
		}
	};
	// 界面初始化
	function ReaderBaseFrame(){
		//渲染ui界面
		$.
	};
	// 事件容器
	function EventHandler(){
		// todo交互事件绑定
		$('#mask').click(function(){
			if(Dom.top.css('display')==='none'){
				Dom.top.show();
				Dom.footer.show()
			}else{
				Dom.top.hide();
				Dom.footer.hide()
				Dom.setPanel.hide();
			}
		});
		// 滚动隐藏上下兰
		Win.scroll(function(){
			Dom.top.hide();
			Dom.footer.hide();
			Dom.setPanel.hide();
		});
		// 弹出设置面板
		$('#fontsize').click(function(){
			if(Dom.setPanel.css('display')==='none'){
				Dom.setPanel.show();
				$(this).addClass('active');
			}else{
				Dom.setPanel.hide();
				$(this).removeClass('active');
			}
		});
		Dom.lightSwitch.click(function(){
			// TODO触发背景切换事件
			if(LIGHT_ON_OFF){
				console.log('我进来改变颜色');
				$('body').css('background-color','grey');
				$('#mainContent').css('color','red');
				LIGHT_ON_OFF=false;
			}else{
				console.log('我进来');
				$('body').css('background-color','#e9dfc7');
				$('#mainContent').css('color','#555');
				LIGHT_ON_OFF=true;
			}
		});
		// 调整字体大小
		$('.lage').click(function(){
			var size=parseInt($('#mainContent').css('font-size'));
			var lineHeight=parseInt($('#mainContent').css('line-height'));
			size+=2;
			lineHeight+=20;
			console.log(lineHeight);
			// console.log(size+typeof(size));
			$('#mainContent').css({
				'font-size':size+'px',
				'line-height':lineHeight+'px'
			});
		});
		$('.small').click(function(){
			var size=parseInt($('#mainContent').css('font-size'));
			var lineHeight=parseInt($('#mainContent').css('line-height'));
			if(size>12){
				size-=2;
				lineHeight-=20;
			}else{
				alert('不能再小了');
				return false;
			}
			
			console.log(lineHeight);
			// console.log(size+typeof(size));
			$('#mainContent').css({
				'font-size':size+'px',
				'line-height':lineHeight+'px'
			});
		})
	};
	// 调用入口函数
	main();

})()