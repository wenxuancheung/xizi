$(function(){
	//轮播图JS
	$("#imgs").swipeSlide();

	//下拉刷新列表JS
	// dropload
    var dropload = $('body').dropload({
    	scrollArea : window,
        domUp : {
            domClass   : 'dropload-up',
            domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
            domUpdate  : '<div class="dropload-update">↑释放更新</div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
        },
        loadUpFn : function(me){
            $.ajax({
                type: 'GET',
                url: 'json/xizi.json',
                dataType: 'json',
                success: function(data){
                    var result = '';
                    for(var i = 0; i < data.lists.length; i++){
                        result += '<div class="'+data.lists[i].className+'">'
                        			+'<a href="#">'
                        			+'<p>'+data.lists[i].title+'</p>'
                        			+'<ul><li><img src="'+data.lists[i].src1+'"></li>'
                        			+'<li><img src="'+data.lists[i].src2+'"></li>'
                        			+'<li><img src="'+data.lists[i].src3+'"></li></ul></a>'
                        			+'<span>'+data.lists[i].date+'</span>'
                        			+'</div><hr/>';
                    }
                    for(var i = 0;i < data.contents.length;i++){
                    	result += '<div class="'+data.contents[i].className+'">'
                        			+'<a href="#">'
                        			+'<div id="demo_img"><img src="'+data.contents[i].src1+'"></div>'
                        			+'<p>'+data.contents[i].title+'</p>'
                        			+'</a>'
                        			+'<span>'+data.contents[i].date+'</span>'
                        			+'</div><hr/>';
                    }
                    // 为了测试，延迟1秒加载
                    setTimeout(function(){
                        $('#main').html(result);
                        // 每次数据加载完，必须重置
                        dropload.resetload();
                    },1000);
                },
                error: function(xhr, type){
                    alert('Ajax error!');
                    // 即使加载出错，也得重置
                    dropload.resetload();
                }
            });
        },
        
    });
});