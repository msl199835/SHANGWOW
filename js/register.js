

//project name qiao-register.js



var register = function register(){

}

var formAreaDataArr = [];       //表单数据

var formAreaDataErrorLocation = false;      //公共提示信息的id

 //判断表单格式是否正确

function formArea (arr,errorLocation=false){

    formAreaDataArr = arr;
    
    formAreaDataErrorLocation = errorLocation;
    
    let i;

    for(i=0;i<arr.length;i++){     //便利表单信息
        
        var errorMainLocation = "#"+ errorLocation;

        inputFocus(arr[arr.length-i-1],errorMainLocation);  //监听表单元素
       
    }
}


//监听表单焦点事件
function inputFocus(obj,errorMainLocation){
    let id = "#"+obj.id;
    $(id).focus(function(){ //聚焦事件

        $(this).blur(function(){    //失去焦点事件

         testText(obj,errorMainLocation);   //验证数据格式
        })
    })
}

//检测所有表单数据格式是否正确
function testAll(){

    for(i=0;i<formAreaDataArr.length;i++){  //便利表单信息
     
        var errorMainLocation = "#"+ formAreaDataErrorLocation;

        testText(formAreaDataArr[formAreaDataArr.length-i-1],errorMainLocation);    //验证表达式
       
    }
}

//检测字符串格式是否正确
function testText(obj,errorMainLocation){
    let id = "#"+obj.id;

    let data = $(id).val();     //获取表单元素中的数据

    let reg = obj.regular;

    if(!reg.test(data)){ //通过正则表达式验证数据正确性

        if(obj.errorPath!=undefined){   //判断参数中是否携带提示文字展示位置
            //不正确
            $(obj.errorPath).text(obj.error);

        }else if(errorMainLocation!="#false"){ //判断是否存在通用位置 有使用通用位置展示提示 否则不提示
            
            $(errorMainLocation).text(obj.error);

        }else{//没有单项的 提示信息位置id和公共的提示信息位置参数是使用小弹窗提示信息

            showWarn(obj.error,obj.id);

        }  
    }else{//内容格式正确时
        showWarn(obj.error,obj.id,false);  
    } 
}

//展示警告信息
//参数
// text    String  警告信息
// location    String  选框id   带#的
function showWarn(text,id,static=true){

    let location = "#"+id;  //文本框id

    if(static){     //增加提示框
        var width = $(location).parent().outerWidth(); //获取文本框父元素宽度
        //提示框html代码   
        var html = "<span id='"+id+"addtoend' style='left:"+width+"px;z-index:999; position: absolute;padding:0.5rem 1rem;border-radius:0.5rem;border:0.2rem solid red;background: #fff;top:0;white-space:nowrap'>"+text+"</span>"

        $(location).parent().append(html); //增加选框
    }else{          //删除提示框
        $(location+"addtoend").remove();
    }

}




$(document).ready(function(){
//点击提交按钮触发事件
    formArea([{
        id:"username",
        regular:/^\w{6,16}$/,
        error:"用户名格式错误",
        //errorPath:"this is errorpath"
    },{ 
        id:"phone",
        regular:/^1[345678]\d{9}$/,
        error:"手机号格式错误"
    },{ 
        id:"verificationcode",
        regular:/^[0-9]{6}$/,
        error:"验证码错误"
    },{ 
        id:"password",
        regular:/^\w[0-9]{6,16}$/,
        error:"密码格式错误"
    },{ 
        id:"passwordagain",
        regular:/^\w[0-9]{6,16}$/,
        error:"密码格式错误"
    },{ 
        id:"email",
        regular:/^\w[0-9]{6,32}$/,
        error:"邮箱格式错误"
    }]);
    $("#regbtn").click(function(){
        testAll();
    });
})
