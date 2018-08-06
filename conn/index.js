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
        var {addregiste}=require("../mysqlapp");
        addregiste(username,password);
        ctx.body="good jobs"
               
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