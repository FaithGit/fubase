module.exports = {
    'GET /': async (ctx, next) => {
        if(!ctx.session.user){
            ctx.render('index.html', {
                title: 'Welcome To HCS'
            });
        }else{
            ctx.render('index.html', {
                title: `'Welcome To HCS`,
                name:`${ctx.session.user}`
                
            });
        }
       
    }
};