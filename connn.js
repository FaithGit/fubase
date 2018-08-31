const fs=require("fs");

function addrouter(router,requireJs){
    for(var url in requireJs){
        if(url.startsWith('GET ')){
            var path=url.substring(4)
            router.get(path,requireJs[url])
            console.log(`[GET]注入路由${path}`)
        }
        else if(url.startsWith("POST ")){
            var path=url.substring(5)
            router.post(path,requireJs[url])
            console.log(`[POST]注入路由${path}`)
        }
        else if(url.startsWith("put ")){
            var path=url.substring(4)
            router.put(path,requireJs[url])
            console.log(`[PUT]注入路由${path}`)
        }
        else if(url.startsWith("del ")){
            var path=url.substring(4)
            router.del(path,requireJs[url])
            console.log(`[DEL]注入路由${path}`)
        }else{
            console.log(`未添加相应路由方式\n${url}注入失败`)
        }
    }
}


function find(router,filePath){
 fs.readdirSync(filePath).filter((f)=>{
     return f.endsWith(".js");
 }).forEach((f)=>{ 
     let requireJs=require(filePath+"/"+f);
     addrouter(router,requireJs)
 })

}

module.exports=function(dir){
    let fileDir= dir ||'conn';
    let filePath=__dirname+'/'+fileDir;
    const router=require('koa-router')();
    find(router,filePath);
    return router.routes();
}