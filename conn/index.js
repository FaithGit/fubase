module.exports = {
    'POST /signin': async (ctx, next) => {
        var
            username = ctx.request.body.username || '',
            password = ctx.request.body.password || '';

            var {login}=require("../mysqlapp");
            // 查询用户名和密码
            var result= await login(username,password);
            result=JSON.stringify(result);
            if(result==='[]'){
                // 没有的话返回一个什么页面
                ctx.render("signin-failed.html",{
                    title:"faild"
                })
            }
            else{
                // 有的话返回一个cookie
                ctx.session.user = username;
                console.log(`恭喜${ctx.session.user}登录`)
                ctx.redirect('/');
            }
            

           

    },
    'GET /registe':async (ctx,next)=>{
        ctx.render("regsite.html",{
            title:"注册"
        })
    },
    'POST /registe-add':async(ctx,next)=>{
        var
            username = ctx.request.body.username || '',
            password = ctx.request.body.password || '';
        var {cha,addregiste}=require("../mysqlapp");
        //  查询是否有重复的用户名
        var cha_username= await cha(`${username}`);
        //如果是空对象 就添加到mysql
        if(JSON.stringify(cha_username)==="[]"){
            addregiste(username,password);
            ctx.body="good jobs"
        }
        else{
            ctx.render("signin-failed.html",{
                title:"faild"
            })
        }
     
               
    },
    'GET /jian':async(ctx,next)=>{

        var {jian}=require("../mysqlapp");
        jian('123');
        ctx.body="jian over"
               
    },
    'GET /cha':async(ctx,next)=>{

        var {cha}=require("../mysqlapp");
        var xx= await cha('asd');
         ctx.body=`${JSON.stringify(xx)}`;
               
    }
    
};