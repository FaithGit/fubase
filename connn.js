const fs=require("fs");

function addrouter(router,requireJs){
    for(var url in requireJs){
        if(url.startsWith('GET ')){
            var path=url.substring(4)
            router.get(path,requireJs[url])
            console.log(`found url Get${path}`)
        }
        else if(url.startsWith("POST ")){
            var path=url.substring(5)
            router.post(path,requireJs[url])
            console.log(`found url POST${path}`)
        }
        else if(url.startsWith("put ")){
            var path=url.substring(4)
            router.put(path,requireJs[url])
            console.log(`found url put${path}`)
        }
        else if(url.startsWith("del ")){
            var path=url.substring(4)
            router.del(path,requireJs[url])
            console.log(`found url del${path}`)
        }else{
            console.log(`invalid url+${url}`)
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