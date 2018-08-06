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

}, {
        timestamps: false
    });



async function addregiste(username,password) {
    var dog=await Pet.create({username, password});
    console.log('created: ' + JSON.stringify(dog));
    
}
async function jian(username) {
    var dog=await Pet.destroy({where:{username}})
    console.log('destroy: ' + JSON.stringify(dog));
    
}
async function cha(username) {
    var dog=await Pet.findAll({where:{username}})
    console.log(`find ${dog.length} dogs:`);
    for (let p of dog) {
        console.log(JSON.stringify(p));
    }
    return dog;
}
    

module.exports={addregiste,jian,cha};
