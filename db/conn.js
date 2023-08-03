const {Sequelize} = require('sequelize')
const conn = new Sequelize('myverse','root','',{
dialect:'mysql',
host:'localhost'
})

try {
    
    conn.authenticate().then(() =>{
        console.log('conectado', 'modelos:',conn.models)
    })
} catch (error) {
    console.log('erro na conexão')
}

module.exports = conn