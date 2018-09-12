const Sequelize = require('sequelize');

const config = require('./config');

console.log('init sequelize...');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});
var Pet = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true
    },
    username: Sequelize.STRING(45),
    password: Sequelize.STRING(45),
    lv:Sequelize.INTEGER(11),

}, {
        timestamps: false
    });



async function addregiste(username,password,lv) {
    var dog=await Pet.create({username, password,lv});
    console.log('created: ' + JSON.stringify(dog));
    
}

async function jian(username) {
    var dog=await Pet.destroy({where:{username}})
    console.log('destroy: ' + JSON.stringify(dog));
    
}
async function cha(username) {
    var dog=await Pet.findAll({where:{username}})
    console.log(`find ${dog.length} dogs:`);
    return dog;
}
async function login(username,password) {
    var dog=await Pet.findAll({where:{username,password}})
    return dog;
}
    

module.exports={addregiste,jian,cha,login};
