$(function(){
//    输入框动画
//    按钮
    var add = $(".add");
    //输入框
    var form=$("form");
    var formClose=$(".Close");
    var flag=true;
    add.click(function(){
       if (flag){
           form.attr({"data-a":"animate-down"}).css({display:"block"});
           flag=false;
       }else{
           form.attr({"data-a":"animate-up"});
           flag=true;
       }
    })
    formClose.click(function(){
        form.css({display:"none"})
        flag=true;
    })

//    表单的验证
    var obj,oldv,str;
    $(".submit").click(function(){
        var textv=form.find(":text").val();
        var conv=form.find("textarea").val();
        var timev=form.find("#time").val();
        if (textv==""){
            alert("标题不能为空");
            return;
        }
        if (conv==""){
            alert("内容不能为空");
            return;
        }
        if(timev==""){
            alert("时间必选");
            return;
        }
        //存储信息
        oldv=localStorage.messages==null?[]:JSON.parse(localStorage.messages);
        obj={title:textv,con:conv,time:timev,id:new Date().getTime()};
        oldv.push(obj);
        str = JSON.stringify(oldv);
        localStorage.messages=str;
        form.find(":text").val("");
        form.find("textarea").val("");
        form.find("#time").val("");
    //   显示信息
        var copy= $(".con:first").clone().appendTo("body").fadeIn(100).css({
            left:Math.random()*($(window).width()-$(".con").outerWidth()),
            top:Math.random()*($(window).height()-$(".con").outerHeight())
        }).attr("data-a","animate-sd").attr("id",obj.id);
        //copy是最新的那一个con
        copy.find(".biaoti").html(textv);
        copy.find(".neirong").html(conv);
        copy.find(".shijian").html(timev);

    })
//    刷新页面的时候将保存的备忘录显示在页面
    var messages=localStorage.messages==null?[]:JSON.parse(localStorage.messages);
    for(var i=0;i<messages.length;i++) {
        copy = $(".con:first").eq(0).clone().appendTo("body").fadeIn(100).css({
            left: Math.random() * ($(window).width() - $(".con").outerWidth()),
            top: Math.random() * ($(window).height() - $(".con").outerHeight()),
            display:"block"
        }).attr("id",messages[i].id);
        copy.find(".biaoti").html(messages[i].title);
        copy.find(".neirong").html(messages[i].con);
        copy.find(".shijian").html(messages[i].time);
    }
//删除备忘录
    $(document).delegate(".del","click",function(){
       var id =$(this).parent().attr("id");
        console.log(localStorage.messages);
        var arr= JSON.parse(localStorage.messages);
        for(var i=0;i<arr.length;i++){
            if(arr[i].id==id){
                arr.splice(i,1);
                localStorage.messages=JSON.stringify(arr);
                break;
            }
        }
        $(this).parent().remove();
    })
//拖拽
    $(document).on("mousedown",function(e){
        var obj= e.target;
        var ox= e.offsetX;
        var oy= e.offsetY;
        $(document).on("mousemove",function(e){
            var px= e.pageX;
            var py= e.pageY;
            $(obj).trigger("drag",{top:py-oy,left:px-ox});
        });
        $(document).on("mouseup",function(e){
            $(document).off("mousemove");
            $(document).off("mouseup");
        });
    });
    $(document).delegate(".con","drag",function(e,data){
        $(this).css({
            top:data.top,
            left:data.left
        })
    })
    $(document).delegate(".con","mousedown",function(e){
        $(".con").css({
            zIndex:0
        });
        $(this).css({
            zIndex:1
        })
        e.preventDefault();
    })
})