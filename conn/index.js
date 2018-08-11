module.exports = {
    'POST /signin': async (ctx, next) => {
        var
            username = ctx.request.body.username || '',
            password = ctx.request.body.password || '';

            var {cha}=require("../mysqlapp");
            var result= await cha(`${username}`);
            ctx.body=`${JSON.stringify(result)}`;

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
        var xx= await cha(`${username}`);
        if(JSON.stringify(xx)==="[]"){
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