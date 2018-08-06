const Koa=require('koa');
const app=new Koa();
const body=require('koa-bodyparser');
const staticFiles=require("./static-files");
const path=require("path")
const connn=require('./connn')
const templating=require("./templating")
// Node.js在全局变量process中定义了一个环境变量env.NODE_ENV，为什么要使用该环境变量？因为我们在开发的时候，
//环境变量应该设置为'development'，而部署到服务器时，环境变量应该设置为'production'。在编写代码的时候，要根据当前环境作不同的判断。
// 注意：生产环境上必须配置环境变量NODE_ENV = 'production'，而开发环境不需要配置，实际上NODE_ENV可能是undefined，所以判断的时候，不要用NODE_ENV === 'development'。
const isProduction = process.env.NODE_ENV === 'production';


app.use(async(ctx,next)=>{
    console.log(`Url:${ctx.request.url} is request`);

    await next();
})
// 这是因为在生产环境下，静态文件是由部署在最前面的反向代理服务器（如Nginx）处理的，Node程序不需要处理静态文件。
//而在开发环境下，我们希望koa能顺带处理静态文件，否则，就必须手动配置一个反向代理服务器，这样会导致开发环境非常复杂。
if(!isProduction){
    app.use(staticFiles('/static/', __dirname + '/static'));
    console.log(`test:!!${__dirname}`)
}
 

app.use(body());

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

app.use(connn());

app.listen(3000,()=>{
    console.log("this server is opening")
})